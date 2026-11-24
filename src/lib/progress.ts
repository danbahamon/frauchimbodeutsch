import { CATEGORIES } from '../data/categories'
import { WORDS } from '../data/words'
import { shuffle } from './text'
import type { Source, StatMap, Word, WordStat } from './types'

export const MAX_LEVEL = 5
export const UNLOCK_AT = 50
export const CLEAN_NEED = 3

export function blankStat(): WordStat {
  return { level: 1, clean: 0, seen: 0, cleanHits: 0, misses: 0, mastered: false }
}

export function readStat(stats: StatMap, id: string) {
  return stats[id] ?? blankStat()
}

export interface ApplyInput {
  stat: WordStat
  gameLevel: number
  errors: number
  correct: boolean
}

export function applyStat(input: ApplyInput) {
  const prev = input.stat
  const clean = input.correct && input.errors === 0
  const counts = prev.level === input.gameLevel && !prev.mastered
  const next: WordStat = {
    ...prev,
    seen: prev.seen + 1,
    cleanHits: prev.cleanHits + (clean ? 1 : 0),
    misses: prev.misses + (clean ? 0 : 1),
  }
  let leveled = false
  let masteredNow = false
  if (counts && clean) {
    const streak = prev.clean + 1
    if (streak >= CLEAN_NEED) {
      if (prev.level < MAX_LEVEL) {
        next.level = prev.level + 1
        next.clean = 0
        leveled = true
      } else {
        next.level = MAX_LEVEL
        next.clean = CLEAN_NEED
        next.mastered = true
        masteredNow = true
      }
    } else next.clean = streak
  } else if (counts) next.clean = 0
  return { stat: next, leveled, masteredNow }
}

export function countReached(stats: StatMap, level: number) {
  if (level <= 1) return WORDS.length
  let total = 0
  for (const word of WORDS) if (readStat(stats, word.id).level >= level) total += 1
  return total
}

export function countSitting(stats: StatMap, level: number) {
  let total = 0
  for (const word of WORDS) {
    const stat = readStat(stats, word.id)
    if (stat.level === level && !stat.mastered) total += 1
  }
  return total
}

export function isUnlocked(stats: StatMap, level: number) {
  return level <= 1 || countReached(stats, level) >= UNLOCK_AT
}

export function openLevels(stats: StatMap) {
  return [1, 2, 3, 4, 5].filter((level) => isUnlocked(stats, level))
}

export function daySeed(date = new Date()) {
  const start = Date.UTC(date.getFullYear(), 0, 0)
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000)
  return date.getFullYear() * 1000 + day
}

function hashUnit(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function pickWeighted(options: { level: number; weight: number }[], seed: number) {
  const total = options.reduce((sum, option) => sum + option.weight, 0)
  let roll = hashUnit(seed) * total
  for (const option of options) {
    roll -= option.weight
    if (roll <= 0) return option.level
  }
  return options[options.length - 1]?.level ?? 1
}

export function assignLevel(stats: StatMap, seed = daySeed()) {
  const options: { level: number; weight: number }[] = []
  for (const level of [1, 2, 3, 4, 5]) {
    if (!isUnlocked(stats, level)) continue
    const sitting = countSitting(stats, level)
    if (sitting < 4 && countReached(stats, level) < 4) continue
    options.push({ level, weight: Math.max(sitting, 1) * level * level })
  }
  if (!options.length) return 1
  return pickWeighted(options, seed)
}

export function assignCategory(stats: StatMap, cat: string, seed = daySeed()) {
  const options: { level: number; weight: number }[] = []
  for (const level of [1, 2, 3, 4, 5]) {
    if (!isUnlocked(stats, level)) continue
    const pool = collect(stats, level, { cat })
    if (pool.length < 4) continue
    const sitting = pool.filter((word) => {
      const stat = readStat(stats, word.id)
      return stat.level === level && !stat.mastered
    }).length
    options.push({ level, weight: Math.max(sitting, 1) * level * level })
  }
  if (!options.length) return null
  return pickWeighted(options, seed + cat.length * 17)
}

export function collect(stats: StatMap, level: number, opts?: { cat?: string; ids?: string[] }) {
  const idSet = opts?.ids ? new Set(opts.ids) : null
  return WORDS.filter((word) => {
    if (idSet && !idSet.has(word.id)) return false
    if (opts?.cat && word.cat !== opts.cat) return false
    if (idSet && level === 1) return true
    return readStat(stats, word.id).level >= level
  })
}

export function orderPool(pool: readonly Word[], stats: StatMap, level: number, remix: boolean) {
  if (remix) return shuffle(pool)
  const prefer: Word[] = []
  const rest: Word[] = []
  for (const word of pool) {
    const stat = readStat(stats, word.id)
    if (stat.level === level && !stat.mastered) prefer.push(word)
    else rest.push(word)
  }
  return [...shuffle(prefer), ...shuffle(rest)]
}

export function planHands(words: readonly Word[], level: number) {
  if (!words.length) return []
  const max = level === 2 ? 8 : 6
  if (words.length <= max) return [words.slice()]
  const handsCount = Math.ceil(words.length / max)
  const size = Math.ceil(words.length / handsCount)
  const hands: Word[][] = []
  for (let i = 0; i < words.length; i += size) hands.push(words.slice(i, i + size))
  return hands
}

export function buildQueue(stats: StatMap, level: number, source: Source, opts?: { cat?: string; ids?: string[] }) {
  const pool = collect(stats, level, opts)
  const min = level === 1 ? 2 : 1
  if (pool.length < min) return { pool, hands: [] as Word[][] }
  const ordered = orderPool(pool, stats, level, source === 'class')
  const cap = source === 'class' ? ordered.length : source === 'category' ? Math.min(ordered.length, 24) : Math.min(ordered.length, 18)
  return { pool, hands: planHands(ordered.slice(0, cap), level) }
}

export function nextLocked(stats: StatMap) {
  for (const level of [2, 3, 4, 5]) if (!isUnlocked(stats, level)) return level
  return null
}

export function almostWords(stats: StatMap) {
  const groups = new Map<number, string[]>()
  for (const word of WORDS) {
    const stat = stats[word.id]
    if (!stat || stat.mastered || stat.clean !== CLEAN_NEED - 1) continue
    const list = groups.get(stat.level) ?? []
    list.push(word.id)
    groups.set(stat.level, list)
  }
  let best: { level: number; ids: string[] } | null = null
  for (const [level, ids] of groups) {
    if (!best || ids.length > best.ids.length) best = { level, ids }
  }
  return best
}

export function wordOfDay(seed = daySeed()) {
  return WORDS[seed % WORDS.length]
}

export function dayKey(ts: number) {
  const date = new Date(ts)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export function streakOf(stamps: number[]) {
  const days = new Set(stamps.map(dayKey))
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  if (!days.has(dayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1)
  let count = 0
  while (days.has(dayKey(cursor.getTime()))) {
    count += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
}

export function totals(stats: StatMap) {
  const levels = [0, 0, 0, 0, 0, 0]
  let seen = 0
  let cleanHits = 0
  let misses = 0
  let mastered = 0
  for (const word of WORDS) {
    const stat = readStat(stats, word.id)
    levels[stat.level] += 1
    if (stat.mastered) mastered += 1
    seen += stat.seen
    cleanHits += stat.cleanHits
    misses += stat.misses
  }
  return { levels, seen, cleanHits, misses, mastered }
}

export function categoryStats(stats: StatMap) {
  return CATEGORIES.map((cat) => {
    const words = WORDS.filter((word) => word.cat === cat.id)
    let sum = 0
    let mastered = 0
    for (const word of words) {
      const stat = readStat(stats, word.id)
      sum += stat.level
      if (stat.mastered) mastered += 1
    }
    return { cat, total: words.length, avg: words.length ? sum / words.length : 1, mastered }
  })
}

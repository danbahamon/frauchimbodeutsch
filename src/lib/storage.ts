import { getCategory } from '../data/categories'
import { WORD_BY_ID } from '../data/words'
import { MAX_LEVEL, SHELF, migrateShelf } from './progress'
import type { ClassSet, Locale, Profile, Route, SessionRec, StatMap, TargetWord, WordStat } from './types'

const KEY = 'frauchimbo.deutsch.v1'

export interface Persisted {
  v: 3
  profile: Profile | null
  words: StatMap
  sessions: SessionRec[]
  sets: ClassSet[]
  route: Route
}

export function emptyState(): Persisted {
  return { v: 3, profile: null, words: {}, sessions: [], sets: [], route: { name: 'home' } }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function cleanStat(raw: unknown, version: 1 | 2 | 3): WordStat | null {
  if (!raw || typeof raw !== 'object') return null
  const stat = raw as Partial<WordStat>
  const level = migrateShelf(Number(stat.level) || 1, version)
  const cleanHits = Math.max(0, Number(stat.cleanHits) || 0)
  const lastMissedAt = typeof stat.lastMissedAt === 'number' && Number.isFinite(stat.lastMissedAt) ? stat.lastMissedAt : undefined
  return {
    level,
    clean: clamp(Number(stat.clean) || 0, 0, 3),
    seen: Math.max(0, Number(stat.seen) || 0),
    correct: Math.max(0, Number(stat.correct) || cleanHits),
    cleanHits,
    misses: Math.max(0, Number(stat.misses) || 0),
    shelfMisses: clamp(Number(stat.shelfMisses) || 0, 0, 3),
    ...(lastMissedAt ? { lastMissedAt } : {}),
    mastered: Boolean(stat.mastered) && level === MAX_LEVEL,
  }
}

function cleanTargets(raw: unknown, version: 1 | 2 | 3, fallbackIds?: unknown): TargetWord[] {
  if (Array.isArray(raw)) {
    const words = raw.flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const row = item as { id?: unknown; target?: unknown }
      if (typeof row.id !== 'string' || !WORD_BY_ID.has(row.id)) return []
      return [{ id: row.id, target: migrateShelf(Number(row.target) || SHELF.sentence, version) }]
    })
    if (words.length) return words
  }
  if (!Array.isArray(fallbackIds)) return []
  return fallbackIds.flatMap((id) => (typeof id === 'string' && WORD_BY_ID.has(id) ? [{ id, target: SHELF.sentence }] : []))
}

function cleanProfile(raw: unknown): Profile | null {
  if (!raw || typeof raw !== 'object') return null
  const profile = raw as Partial<Profile>
  if (typeof profile.name !== 'string' || !profile.name.trim()) return null
  const locale: Locale = profile.locale === 'es' || profile.locale === 'de' ? profile.locale : 'en'
  return {
    name: profile.name.trim().slice(0, 40),
    locale,
    bridge: profile.bridge === 'es' ? 'es' : 'en',
    sound: profile.sound !== false,
    voice: profile.voice !== false,
    motion: profile.motion !== false,
    theme: profile.theme === 'dusk' ? 'dusk' : 'day',
    createdAt: typeof profile.createdAt === 'number' ? profile.createdAt : Date.now(),
  }
}

function cleanRoute(raw: unknown, version: 1 | 2 | 3): Route {
  if (!raw || typeof raw !== 'object' || !('name' in raw)) return { name: 'home' }
  const route = raw as Route
  if (route.name === 'round') return { name: 'play' }
  if (route.name === 'category') return getCategory(route.cat) ? route : { name: 'words' }
  if (route.name === 'shared') {
    const legacy = route as { wordIds?: unknown }
    const words = cleanTargets(route.words, version, legacy.wordIds)
    if (words.length < 2) return { name: 'class' }
    return { name: 'shared', title: route.title?.slice(0, 80) || 'Praxis', words }
  }
  if (route.name === 'home' || route.name === 'play' || route.name === 'words' || route.name === 'class' || route.name === 'stats') {
    return { name: route.name }
  }
  return { name: 'home' }
}

function cleanSession(raw: unknown, version: 1 | 2 | 3): SessionRec | null {
  if (!raw || typeof raw !== 'object') return null
  const session = raw as Partial<SessionRec>
  if (typeof session.id !== 'string' || typeof session.at !== 'number') return null
  const level = migrateShelf(Number(session.level) || 1, version)
  const source = session.source === 'shelf' || session.source === 'category' || session.source === 'class' ? session.source : 'spiral'
  return {
    id: session.id,
    at: session.at,
    level,
    source,
    title: session.title?.slice(0, 80),
    cat: session.cat,
    played: Math.max(0, Number(session.played) || 0),
    clean: Math.max(0, Number(session.clean) || 0),
    helped: Math.max(0, Number(session.helped) || 0),
    missed: Math.max(0, Number(session.missed) || 0),
    leveled: Math.max(0, Number(session.leveled) || 0),
  }
}

function cleanSet(raw: unknown, version: 1 | 2 | 3): ClassSet | null {
  if (!raw || typeof raw !== 'object') return null
  const set = raw as Partial<ClassSet> & { wordIds?: unknown }
  if (typeof set.id !== 'string' || typeof set.title !== 'string') return null
  const words = cleanTargets(set.words, version, set.wordIds)
  if (words.length < 2) return null
  return { id: set.id, title: set.title.slice(0, 80), words, createdAt: typeof set.createdAt === 'number' ? set.createdAt : Date.now() }
}

export function normalize(raw: unknown): Persisted | null {
  if (!raw || typeof raw !== 'object') return null
  const data = raw as Omit<Partial<Persisted>, 'v' | 'words' | 'sessions' | 'sets'> & {
    v?: number
    words?: unknown
    sessions?: unknown
    sets?: unknown
  }
  if (data.v !== 1 && data.v !== 2 && data.v !== 3) return null
  const version = data.v as 1 | 2 | 3
  const words: StatMap = {}
  if (data.words && typeof data.words === 'object') {
    for (const [id, stat] of Object.entries(data.words)) {
      if (!WORD_BY_ID.has(id)) continue
      const clean = cleanStat(stat, version)
      if (clean) words[id] = clean
    }
  }
  return {
    v: 3,
    profile: cleanProfile(data.profile),
    words,
    sessions: Array.isArray(data.sessions) ? data.sessions.map((item) => cleanSession(item, version)).filter((item): item is SessionRec => !!item).slice(-300) : [],
    sets: Array.isArray(data.sets) ? data.sets.map((item) => cleanSet(item, version)).filter((item): item is ClassSet => !!item).slice(-40) : [],
    route: cleanRoute(data.route, version),
  }
}

export function loadState(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyState()
    return normalize(JSON.parse(raw)) ?? emptyState()
  } catch {
    return emptyState()
  }
}

export function saveState(state: Persisted) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* private mode or a full disk */
  }
}

export function downloadBackup(state: Persisted) {
  const blob = new Blob([JSON.stringify({ ...state, exportedAt: Date.now() }, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'frauchimbo-deutsch.json'
  link.click()
  URL.revokeObjectURL(url)
}

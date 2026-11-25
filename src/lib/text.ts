import { WORDS } from '../data/words'
import type { Art, Bridge, Word } from './types'

export type Direction = 'to-de' | 'to-bridge'

export interface Piece {
  id: string
  text: string
}

export interface Slot {
  text: string
  fixed: boolean
}

export interface Puzzle {
  mode: 'letters' | 'words'
  slots: Slot[]
  pieces: Piece[]
  solution: string[]
}

export interface MemoryCard {
  key: string
  wordId: string
  side: 'de' | 'bridge'
  text: string
  art?: Art
  speak: string
}

export interface Task {
  word: Word
  direction: Direction
  options: Word[]
  puzzle: Puzzle
}

export function shuffle<T>(list: readonly T[]): T[] {
  const next = [...list]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = next[i]
    next[i] = next[j]
    next[j] = swap
  }
  return next
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`
}

export function fold(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function deLabel(word: Word) {
  return word.art ? `${word.art} ${word.de}` : word.de
}

export function gloss(word: Word, bridge: Bridge) {
  return bridge === 'es' ? word.es : word.en
}

export function glossForms(text: string) {
  const stripped = text.replace(/\([^)]*\)/g, ' ')
  const parts = stripped.split(/[/,]/).map((part) => part.trim()).filter(Boolean)
  const forms = new Set<string>()
  for (const chunk of [text, stripped, ...parts]) {
    for (const variant of [chunk, chunk.replace(/['’]/g, '')]) {
      const folded = fold(variant)
      if (folded) forms.add(folded)
      const bare = folded.replace(/^(the|el|la|los|las) /, '')
      if (bare) forms.add(bare)
    }
  }
  return [...forms]
}

export function matchesGloss(word: Word, bridge: Bridge, typed: string) {
  const got = fold(typed)
  return got.length > 0 && glossForms(gloss(word, bridge)).includes(got)
}

export function matchesDe(word: Word, typed: string, article: Art | null, mode: 'required' | 'optional' | 'none') {
  const got = fold(typed)
  if (!got) return false
  const lemma = fold(word.de)
  const full = fold(deLabel(word))
  if (got !== lemma && got !== full) return false
  if (!word.art || mode !== 'required') return true
  if (got === full) return true
  return article === word.art
}

export function matchesQuery(word: Word, query: string) {
  const folded = fold(query)
  if (!folded) return true
  const fields = [word.de, word.en, word.es, word.pl ?? '', deLabel(word)]
  return fields.some((field) => fold(field).includes(folded))
}

function sideLabel(word: Word, bridge: Bridge, direction: Direction) {
  return fold(direction === 'to-de' ? deLabel(word) : gloss(word, bridge))
}

export function choiceOptions(word: Word, bridge: Bridge, direction: Direction) {
  const correct = sideLabel(word, bridge, direction)
  const same = shuffle(WORDS.filter((item) => item.cat === word.cat && item.id !== word.id))
  const rest = shuffle(WORDS.filter((item) => item.cat !== word.cat && item.id !== word.id))
  const picked: Word[] = []
  const seen = new Set([correct])
  for (const item of [...same, ...rest]) {
    const key = sideLabel(item, bridge, direction)
    if (!key || seen.has(key)) continue
    seen.add(key)
    picked.push(item)
    if (picked.length === 3) break
  }
  return shuffle([word, ...picked])
}

export function makePuzzle(de: string): Puzzle {
  const chars = [...de]
  const letters = chars.filter((ch) => /\p{L}/u.test(ch))
  if (letters.length > 20) {
    const tokens = de.split(/\s+/).filter(Boolean)
    const pieces = tokens.map((text, index) => ({ id: `w${index}`, text }))
    return {
      mode: 'words',
      slots: tokens.map((text) => ({ text, fixed: false })),
      pieces,
      solution: pieces.map((piece) => piece.id),
    }
  }
  const slots = chars.map((text) => ({ text, fixed: !/\p{L}/u.test(text) }))
  const pieces = slots.flatMap((slot, index) => (slot.fixed ? [] : [{ id: `l${index}`, text: slot.text }]))
  return { mode: 'letters', slots, pieces, solution: pieces.map((piece) => piece.id) }
}

export function puzzleAnswer(puzzle: Puzzle, filled: string[]) {
  if (puzzle.mode === 'words') {
    return filled.map((id) => puzzle.pieces.find((piece) => piece.id === id)?.text ?? '').join(' ')
  }
  let cursor = 0
  let out = ''
  for (const slot of puzzle.slots) {
    if (slot.fixed) out += slot.text
    else out += puzzle.pieces.find((piece) => piece.id === filled[cursor++])?.text ?? ''
  }
  return out
}

export function puzzleGoal(puzzle: Puzzle, de: string) {
  return puzzle.mode === 'words' ? de.split(/\s+/).filter(Boolean).join(' ') : de
}

export function matchCards(words: readonly Word[], bridge: Bridge): MemoryCard[] {
  const cards = words.flatMap((word) => [
    {
      key: `${word.id}-de`,
      wordId: word.id,
      side: 'de' as const,
      text: deLabel(word),
      art: word.art,
      speak: deLabel(word),
    },
    {
      key: `${word.id}-br`,
      wordId: word.id,
      side: 'bridge' as const,
      text: gloss(word, bridge),
      speak: deLabel(word),
    },
  ])
  return shuffle(cards)
}

export function makeTask(word: Word, level: number, bridge: Bridge): Task {
  void bridge
  const direction: Direction = level === 9 ? (Math.random() < 0.5 ? 'to-de' : 'to-bridge') : 'to-de'
  return {
    word,
    direction,
    options: [],
    puzzle: makePuzzle(word.de),
  }
}

export interface ChoiceChip {
  id: string
  label: string
}

export function gapLabel(word: Word) {
  return word.kind === 'noun' && word.art ? `${word.art} ${word.de}` : word.de
}

const NON_MOECHTE_VERBS = new Set([
  'sein', 'haben', 'werden', 'können', 'müssen', 'dürfen', 'sollen', 'wollen', 'mögen',
  'wissen', 'bleiben', 'heißen', 'passieren', 'regnen', 'schneien', 'kosten', 'gehören',
  'fehlen', 'stimmen', 'brauchen', 'kennen', 'bedeuten', 'scheinen', 'gelingen',
])

const OPEN_PHRASES = new Set(['ich heiße', 'ich möchte'])

export function gapParts(word: Word) {
  const punct = /[.!?]$/.test(word.de)
  const lower = word.de.trim().toLowerCase()
  if (word.kind === 'verb') {
    if (NON_MOECHTE_VERBS.has(lower) || lower.includes(' ')) {
      return { before: 'Auf Deutsch heißt es:', after: '.' }
    }
    return { before: 'Ich möchte', after: '.' }
  }
  if (word.kind === 'adj') {
    if (word.cat === 'feelings') return { before: 'Ich bin', after: '.' }
    if (word.cat === 'colors') return { before: 'Die Farbe ist', after: '.' }
    return { before: 'Es ist', after: '.' }
  }
  if (word.kind === 'num') return { before: 'Die Zahl ist', after: '.' }
  if (word.kind === 'phrase') {
    if (OPEN_PHRASES.has(lower)) return { before: 'Man sagt:', after: ' …' }
    return { before: 'Man sagt:', after: punct ? '' : '.' }
  }
  return { before: 'Das ist', after: punct ? '' : '.' }
}

function takeChips(word: Word, labelOf: (item: Word) => string, pool: Word[]) {
  const correct = labelOf(word)
  const seen = new Set([fold(correct)])
  const chips: ChoiceChip[] = [{ id: word.id, label: correct }]
  for (const item of pool) {
    const label = labelOf(item)
    const key = fold(label)
    if (!key || seen.has(key)) continue
    seen.add(key)
    chips.push({ id: item.id, label })
    if (chips.length === 4) break
  }
  return shuffle(chips)
}

export function gapChips(word: Word) {
  const sameKind = shuffle(WORDS.filter((item) => item.id !== word.id && item.cat === word.cat && item.kind === word.kind))
  const sameCat = shuffle(WORDS.filter((item) => item.id !== word.id && item.cat === word.cat))
  const rest = shuffle(WORDS.filter((item) => item.id !== word.id))
  return takeChips(word, gapLabel, [...sameKind, ...sameCat, ...rest])
}

export function pluralChips(word: Word) {
  if (word.kind !== 'noun') {
    const same = shuffle(WORDS.filter((item) => item.id !== word.id && item.kind === word.kind))
    const rest = shuffle(WORDS.filter((item) => item.id !== word.id))
    return takeChips(word, (item) => item.de, [...same, ...rest])
  }
  const labelOf = (item: Word) => (item.pl ? `die ${item.pl}` : '')
  const same = shuffle(WORDS.filter((item) => item.kind === 'noun' && item.id !== word.id && item.cat === word.cat && item.pl))
  const rest = shuffle(WORDS.filter((item) => item.kind === 'noun' && item.id !== word.id && item.pl))
  return takeChips(word, labelOf, [...same, ...rest])
}

export function matchesPlural(word: Word, typed: string) {
  if (word.kind !== 'noun' || !word.pl) return matchesDe(word, typed, null, 'optional')
  const got = fold(typed)
  return got === fold(word.pl) || got === fold(`die ${word.pl}`)
}

export function firstLetter(de: string) {
  return [...de].find((ch) => /\p{L}/u.test(ch)) ?? de.slice(0, 1)
}

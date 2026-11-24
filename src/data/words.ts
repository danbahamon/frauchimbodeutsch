import type { Word } from '../lib/types'
import { PART_A } from './partA'
import { PART_B } from './partB'
import { PART_C } from './partC'
import { PART_D } from './partD'

const drafts = [...PART_A, ...PART_B, ...PART_C, ...PART_D]

// Ids follow this list. Add words at the end so shared class codes keep pointing at the same cards.
export const WORDS: Word[] = drafts.map((draft, index) => ({
  ...draft,
  n: index + 1,
  id: `w${index + 1}`,
}))

export const WORD_BY_ID = new Map(WORDS.map((word) => [word.id, word]))
export const WORD_BY_N = new Map(WORDS.map((word) => [word.n, word]))

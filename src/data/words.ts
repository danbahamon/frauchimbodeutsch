import type { Cefr, Word } from '../lib/types'
import { withCefr } from './draft'
import { PART_A } from './partA'
import { PART_B } from './partB'
import { PART_C } from './partC'
import { PART_D } from './partD'
import { PART_E } from './partE'
import { PART_F } from './partF'
import { PART_G } from './partG'

// Existing packs keep stable ids; CEFR is layered by pack so older cards stay A1→B1.
const drafts = [
  ...withCefr(PART_A, 'a1'),
  ...withCefr(PART_B, 'a2'),
  ...withCefr(PART_C, 'b1'),
  ...withCefr(PART_D, 'a2'),
  ...PART_E,
  ...PART_F,
  ...PART_G,
]

// Ids follow this list. Add words at the end so shared class codes keep pointing at the same cards.
export const WORDS: Word[] = drafts.map((draft, index) => ({
  ...draft,
  cefr: (draft.cefr ?? 'a2') as Cefr,
  n: index + 1,
  id: `w${index + 1}`,
}))

export const WORD_BY_ID = new Map(WORDS.map((word) => [word.id, word]))
export const WORD_BY_N = new Map(WORDS.map((word) => [word.n, word]))

import type { Art, Cefr, Kind } from '../lib/types'

export interface Draft {
  cat: string
  kind: Kind
  de: string
  en: string
  es: string
  cefr?: Cefr
  art?: Art
  pl?: string
}

type Noun = readonly [string, string, string, Art, string]
type Line = readonly [string, string, string]

export function noun(cat: string, rows: readonly Noun[], cefr?: Cefr): Draft[] {
  return rows.map(([de, en, es, art, pl]) => ({
    cat,
    kind: 'noun' as const,
    de,
    en,
    es,
    art,
    pl: pl || undefined,
    ...(cefr ? { cefr } : {}),
  }))
}

export function line(cat: string, kind: Kind, rows: readonly Line[], cefr?: Cefr): Draft[] {
  return rows.map(([de, en, es]) => ({ cat, kind, de, en, es, ...(cefr ? { cefr } : {}) }))
}

export function withCefr(drafts: readonly Draft[], cefr: Cefr): Draft[] {
  return drafts.map((draft) => (draft.cefr ? draft : { ...draft, cefr }))
}

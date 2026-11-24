import type { Art, Kind } from '../lib/types'

export interface Draft {
  cat: string
  kind: Kind
  de: string
  en: string
  es: string
  art?: Art
  pl?: string
}

type Noun = readonly [string, string, string, Art, string]
type Line = readonly [string, string, string]

export function noun(cat: string, rows: readonly Noun[]): Draft[] {
  return rows.map(([de, en, es, art, pl]) => ({
    cat,
    kind: 'noun',
    de,
    en,
    es,
    art,
    pl: pl || undefined,
  }))
}

export function line(cat: string, kind: Kind, rows: readonly Line[]): Draft[] {
  return rows.map(([de, en, es]) => ({ cat, kind, de, en, es }))
}

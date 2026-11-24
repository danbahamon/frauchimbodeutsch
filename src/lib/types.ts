export type Locale = 'en' | 'es' | 'de'
export type Bridge = 'en' | 'es'
export type Art = 'der' | 'die' | 'das'
export type Kind = 'noun' | 'verb' | 'adj' | 'phrase' | 'num' | 'other'
export type Theme = 'day' | 'dusk'
export type Source = 'spiral' | 'shelf' | 'category' | 'class'

export interface Word {
  id: string
  n: number
  cat: string
  kind: Kind
  de: string
  en: string
  es: string
  art?: Art
  pl?: string
}

export interface WordStat {
  level: number
  clean: number
  seen: number
  cleanHits: number
  misses: number
  mastered: boolean
}

export interface Profile {
  name: string
  locale: Locale
  bridge: Bridge
  sound: boolean
  voice: boolean
  motion: boolean
  theme: Theme
  createdAt: number
}

export interface SessionRec {
  id: string
  at: number
  level: number
  source: Source
  title?: string
  cat?: string
  played: number
  clean: number
  helped: number
  missed: number
  leveled: number
}

export interface TargetWord {
  id: string
  target: number
}

export interface ClassSet {
  id: string
  title: string
  words: TargetWord[]
  createdAt: number
}

export type Route =
  | { name: 'home' }
  | { name: 'play' }
  | { name: 'words' }
  | { name: 'category'; cat: string }
  | { name: 'class' }
  | { name: 'stats' }
  | { name: 'shared'; title: string; words: TargetWord[] }
  | {
      name: 'round'
      nonce: number
      level: number
      source: Source
      title?: string
      cat?: string
      wordIds?: string[]
      targets?: TargetWord[]
      exam?: boolean
    }

export type StatMap = Record<string, WordStat>

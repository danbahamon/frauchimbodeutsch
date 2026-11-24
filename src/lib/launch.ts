import { buildQueue } from './progress'
import type { Route, Source, StatMap, TargetWord } from './types'

export function roundRoute(
  stats: StatMap,
  level: number,
  source: Source,
  extra?: { title?: string; cat?: string; ids?: string[] },
): Extract<Route, { name: 'round' }> | null {
  const queue = buildQueue(stats, level, source, { cat: extra?.cat, ids: extra?.ids })
  if (!queue.hands.length) return null
  return {
    name: 'round',
    nonce: Date.now(),
    level,
    source,
    title: extra?.title,
    cat: extra?.cat,
    wordIds: extra?.ids,
  }
}

export function testRoute(title: string, words: TargetWord[], exam: boolean): Extract<Route, { name: 'round' }> {
  return {
    name: 'round',
    nonce: Date.now(),
    level: 1,
    source: 'class',
    title,
    targets: words,
    exam,
  }
}

import { buildQueue } from './progress'
import type { Route, Source, StatMap } from './types'

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

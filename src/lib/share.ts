import { WORD_BY_ID, WORD_BY_N } from '../data/words'
import { MAX_LEVEL, SHELF, migrateShelf } from './progress'
import type { TargetWord } from './types'

function bytesToB64(bytes: Uint8Array) {
  let bin = ''
  bytes.forEach((byte) => {
    bin += String.fromCharCode(byte)
  })
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function b64ToBytes(text: string) {
  const pad = text.replace(/-/g, '+').replace(/_/g, '/')
  const padded = pad + '='.repeat((4 - (pad.length % 4)) % 4)
  const bin = atob(padded)
  return Uint8Array.from(bin, (ch) => ch.charCodeAt(0))
}

export function encodeSet(title: string, ids: string[]) {
  const nums = ids.map((id) => WORD_BY_ID.get(id)?.n).filter((n): n is number => typeof n === 'number')
  const max = nums.length ? Math.max(...nums) : 0
  const bytes = new Uint8Array(Math.ceil((max + 1) / 8))
  for (const n of nums) bytes[n >> 3] |= 1 << (n & 7)
  const clean = title.trim().slice(0, 80) || 'Praxis'
  return `${bytesToB64(bytes)}.${bytesToB64(new TextEncoder().encode(clean))}`
}

function clampTarget(value: number) {
  if (!Number.isFinite(value)) return 3
  return Math.min(MAX_LEVEL, Math.max(1, Math.round(value)))
}

export function encodeTest(title: string, words: TargetWord[]) {
  const clean = title.trim().slice(0, 80) || 'Praxis'
  const titleBytes = new TextEncoder().encode(clean)
  const rows = words.flatMap((item) => {
    const n = WORD_BY_ID.get(item.id)?.n
    if (!n) return []
    return [{ n, target: clampTarget(item.target) }]
  })
  const bytes = new Uint8Array(2 + titleBytes.length + rows.length * 3)
  bytes[0] = titleBytes.length >> 8
  bytes[1] = titleBytes.length & 255
  bytes.set(titleBytes, 2)
  rows.forEach((row, index) => {
    const offset = 2 + titleBytes.length + index * 3
    bytes[offset] = row.n >> 8
    bytes[offset + 1] = row.n & 255
    bytes[offset + 2] = row.target
  })
  return `v3.${bytesToB64(bytes)}`
}

export function decodeSet(payload: string): { title: string; words: TargetWord[] } | null {
  if (payload.startsWith('v3.') || payload.startsWith('v2.')) {
    try {
      const version = payload.startsWith('v3.') ? 3 : 2
      const bytes = b64ToBytes(payload.slice(3))
      const titleLen = ((bytes[0] ?? 0) << 8) | (bytes[1] ?? 0)
      if (titleLen < 1 || 2 + titleLen > bytes.length) return null
      const title = new TextDecoder().decode(bytes.slice(2, 2 + titleLen)).trim() || 'Praxis'
      const words: TargetWord[] = []
      for (let index = 2 + titleLen; index + 2 < bytes.length; index += 3) {
        const n = ((bytes[index] ?? 0) << 8) | (bytes[index + 1] ?? 0)
        const word = WORD_BY_N.get(n)
        if (!word) continue
        const stored = bytes[index + 2] ?? SHELF.sentence
        words.push({ id: word.id, target: version === 2 ? migrateShelf(stored, 2) : clampTarget(stored) })
      }
      if (!words.length) return null
      return { title, words }
    } catch {
      return null
    }
  }
  const dot = payload.indexOf('.')
  if (dot <= 0) return null
  const bits = payload.slice(0, dot)
  const titleBits = payload.slice(dot + 1)
  if (!titleBits) return null
  try {
    const bytes = b64ToBytes(bits)
    const words: TargetWord[] = []
    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i] ?? 0
      for (let bit = 0; bit < 8; bit++) {
        if ((byte & (1 << bit)) === 0) continue
        const word = WORD_BY_N.get(i * 8 + bit)
        if (word) words.push({ id: word.id, target: SHELF.sentence })
      }
    }
    if (!words.length) return null
    const title = new TextDecoder().decode(b64ToBytes(titleBits)).trim() || 'Praxis'
    return { title, words }
  } catch {
    return null
  }
}

export function shareLink(title: string, words: TargetWord[]) {
  const url = new URL(location.href)
  url.hash = `c=${encodeTest(title, words)}`
  return url.toString()
}

import { WORD_BY_ID, WORD_BY_N } from '../data/words'

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

export function decodeSet(payload: string) {
  const dot = payload.indexOf('.')
  if (dot <= 0) return null
  const bits = payload.slice(0, dot)
  const titleBits = payload.slice(dot + 1)
  if (!titleBits) return null
  try {
    const bytes = b64ToBytes(bits)
    const ids: string[] = []
    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i] ?? 0
      for (let bit = 0; bit < 8; bit++) {
        if ((byte & (1 << bit)) === 0) continue
        const word = WORD_BY_N.get(i * 8 + bit)
        if (word) ids.push(word.id)
      }
    }
    if (!ids.length) return null
    const title = new TextDecoder().decode(b64ToBytes(titleBits)).trim() || 'Praxis'
    return { title, wordIds: ids }
  } catch {
    return null
  }
}

export function shareLink(title: string, ids: string[]) {
  const url = new URL(location.href)
  url.hash = `c=${encodeSet(title, ids)}`
  return url.toString()
}

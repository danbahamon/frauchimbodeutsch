export interface CardRow {
  de: string
  gloss: string
  level: number
  target: number
  sitting?: 'clean' | 'helped' | 'missed'
  note?: string
}

export interface CardInput {
  title: string
  name: string
  when: string
  brand: string
  reached: string
  sittingLine?: string
  shelfWord: string
  goalWord: string
  rows: CardRow[]
}

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number) {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width > max && line) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

export async function saveResultCard(input: CardInput) {
  await document.fonts.ready
  const width = 840
  const noted = input.rows.some((row) => row.note)
  const rowH = input.rows.length > 36 ? 46 : noted ? 72 : 54
  const height = 228 + input.rows.length * rowH + (input.sittingLine ? 36 : 0) + 56
  const canvas = document.createElement('canvas')
  const scale = 2
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return false
  ctx.scale(scale, scale)
  ctx.fillStyle = '#f6efe6'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#1f7a72'
  ctx.fillRect(0, 0, width, 12)
  ctx.fillStyle = '#1c1712'
  ctx.font = '600 18px Outfit, sans-serif'
  ctx.fillText(input.brand, 48, 52)
  ctx.font = '650 40px Fraunces, serif'
  const titleLines = wrap(ctx, input.title, width - 96).slice(0, 2)
  titleLines.forEach((line, index) => ctx.fillText(line, 48, 102 + index * 44))
  let y = 102 + titleLines.length * 44
  ctx.font = '500 18px Outfit, sans-serif'
  ctx.fillStyle = '#5c5148'
  ctx.fillText(`${input.name} · ${input.when}`, 48, y)
  y += 36
  ctx.fillStyle = '#1c1712'
  ctx.font = '650 22px Outfit, sans-serif'
  ctx.fillText(input.reached, 48, y)
  y += 8
  if (input.sittingLine) {
    y += 28
    ctx.font = '500 18px Outfit, sans-serif'
    ctx.fillStyle = '#5c5148'
    ctx.fillText(input.sittingLine, 48, y)
  }
  y += 28
  input.rows.forEach((row) => {
    const done = row.level >= row.target
    ctx.fillStyle = done ? '#e5f4f1' : '#fffaf3'
    ctx.strokeStyle = done ? '#1f7a72' : '#e4d8c8'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(40, y, width - 80, rowH - 8, 14)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#1c1712'
    ctx.font = '650 20px Fraunces, serif'
    ctx.fillText(row.de, 58, y + 28, 360)
    ctx.font = '500 15px Outfit, sans-serif'
    ctx.fillStyle = '#5c5148'
    ctx.fillText(row.gloss, 58, y + 46, 360)
    if (row.note) {
      ctx.font = '500 13px Outfit, sans-serif'
      ctx.fillText(row.note, 58, y + 60, width - 140)
    }
    ctx.textAlign = 'right'
    ctx.fillStyle = '#1c1712'
    ctx.font = '600 16px Outfit, sans-serif'
    const mark = row.sitting === 'clean' ? '✓' : row.sitting === 'helped' ? '·' : row.sitting === 'missed' ? '×' : ''
    ctx.fillText(`${input.shelfWord} ${row.level}  →  ${input.goalWord} ${row.target}  ${done ? '✓' : mark}`, width - 58, y + 30)
    ctx.textAlign = 'left'
    y += rowH
  })
  ctx.fillStyle = '#8a7b6d'
  ctx.font = '500 14px Outfit, sans-serif'
  ctx.fillText(input.brand, 48, height - 28)

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
  if (!blob) return false
  const file = new File([blob], 'frauchimbo-deutsch.png', { type: 'image/png' })
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean }
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: input.title })
      return true
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return false
    }
  }
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'frauchimbo-deutsch.png'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 2000)
  return true
}

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PART_A } from '../src/data/partA'
import { PART_B } from '../src/data/partB'
import { PART_C } from '../src/data/partC'
import { PART_D } from '../src/data/partD'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = path.join(root, 'scripts', 'vocab')

const cats = new Set([
  'hello', 'numbers', 'colors', 'family', 'body', 'clothes', 'food', 'fruit', 'veg', 'drinks', 'animals',
  'house', 'furniture', 'kitchen', 'city', 'transport', 'school', 'jobs', 'nature', 'weather', 'time',
  'feelings', 'verbs', 'adjectives', 'travel', 'shop', 'hobbies', 'tech', 'lands', 'bath', 'office',
  'music', 'sport', 'health', 'tools', 'garden', 'money', 'materials', 'shapes',
])
const kinds = new Set(['noun', 'verb', 'adj', 'phrase', 'num', 'other'])

function parseLine(line: string) {
  const parts = line.split('|')
  if (parts.length < 6) return null
  const [cefr, cat, kind, de, en, es, art = '', pl = ''] = parts
  const row: Record<string, string> = { cefr, cat, kind, de, en, es }
  if (kind === 'noun') {
    row.art = art
    row.pl = pl
  }
  return row
}

function loadRows() {
  const rows: Record<string, string>[] = []
  for (const file of fs.readdirSync(dataDir).sort()) {
    const full = path.join(dataDir, file)
    if (!file.startsWith('pipe-') || !file.endsWith('.txt')) continue
    for (const line of fs.readFileSync(full, 'utf8').split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const row = parseLine(trimmed)
      if (row) rows.push(row)
    }
  }
  return rows
}

function esc(value: string) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function emit(partName: string, entries: Record<string, string>[]) {
  const groups = new Map<string, Record<string, string>[]>()
  for (const row of entries) {
    const key = `${row.cat}\0${row.kind}\0${row.cefr}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(row)
  }
  const consts: string[] = []
  const names: string[] = []
  let i = 0
  for (const [key, list] of groups) {
    const [cat, kind, cefr] = key.split('\0')
    const name = `g${i++}`
    names.push(name)
    if (kind === 'noun') {
      const body = list
        .map((row) => `  ['${esc(row.de)}', '${esc(row.en)}', '${esc(row.es)}', '${row.art}', '${esc(row.pl || '')}'],`)
        .join('\n')
      consts.push(`const ${name} = noun('${cat}', [\n${body}\n], '${cefr}')`)
    } else {
      const body = list.map((row) => `  ['${esc(row.de)}', '${esc(row.en)}', '${esc(row.es)}'],`).join('\n')
      consts.push(`const ${name} = line('${cat}', '${kind}', [\n${body}\n], '${cefr}')`)
    }
  }
  return `import { line, noun, type Draft } from './draft'\n\n${consts.join('\n\n')}\n\nexport const ${partName}: Draft[] = [\n${names.map((n) => `  ...${n},`).join('\n')}\n]\n`
}

const de = new Set<string>()
const en = new Set<string>()
const es = new Set<string>()
for (const draft of [...PART_A, ...PART_B, ...PART_C, ...PART_D]) {
  de.add(`${draft.art || ''}:${String(draft.de).toLowerCase()}`)
  en.add(String(draft.en).toLowerCase())
  es.add(String(draft.es).toLowerCase())
}

const kept: Record<string, string>[] = []
let dropped = 0
for (const row of loadRows()) {
  if (!cats.has(row.cat) || !kinds.has(row.kind)) {
    dropped++
    continue
  }
  const deKey = `${row.art || ''}:${String(row.de).toLowerCase()}`
  const enKey = String(row.en).toLowerCase()
  const esKey = String(row.es).toLowerCase()
  if (de.has(deKey) || en.has(enKey) || es.has(esKey)) {
    dropped++
    continue
  }
  if (row.kind === 'noun' && !row.art) {
    dropped++
    continue
  }
  de.add(deKey)
  en.add(enKey)
  es.add(esKey)
  kept.push(row)
}

const partE = kept.filter((row) => row.cefr === 'a1' || row.cefr === 'a2')
const partF = kept.filter((row) => row.cefr === 'b1' || row.cefr === 'b2')
const partG = kept.filter((row) => row.cefr === 'c1' || row.cefr === 'c2')

fs.writeFileSync(path.join(root, 'src', 'data', 'partE.ts'), emit('PART_E', partE))
fs.writeFileSync(path.join(root, 'src', 'data', 'partF.ts'), emit('PART_F', partF))
fs.writeFileSync(path.join(root, 'src', 'data', 'partG.ts'), emit('PART_G', partG))

const byCefr = Object.fromEntries(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].map((level) => [level, kept.filter((row) => row.cefr === level).length]))
console.log(JSON.stringify({ total: kept.length, dropped, byCefr, partE: partE.length, partF: partF.length, partG: partG.length }, null, 2))

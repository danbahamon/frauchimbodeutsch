import { CATEGORIES } from '../src/data/categories'
import { WORDS } from '../src/data/words'
import { DROP_AT, SHELF, applyStat, blankStat, buildQueue, isUnlocked, migrateShelf, nextPendingHand, orderPool, planHands, recentMissed, simTestHands } from '../src/lib/progress'
import { CEFR_LEVELS } from '../src/lib/types'
import { decodeSet, encodeSet, encodeTest } from '../src/lib/share'
import { fold, glossForms, matchesDe, matchesGloss } from '../src/lib/text'

const problems: string[] = []
const en = new Map<string, string>()
const es = new Map<string, string>()
const de = new Map<string, string>()

if (WORDS.length < 3500) problems.push(`only ${WORDS.length} words`)

for (const cat of CATEGORIES) {
  const count = WORDS.filter((word) => word.cat === cat.id).length
  if (count < 8) problems.push(`${cat.id} has ${count}`)
}

const seenCat = new Set(WORDS.map((word) => word.cat))
for (const cat of seenCat) {
  if (!CATEGORIES.some((item) => item.id === cat)) problems.push(`unknown category ${cat}`)
}

const cefrOk = new Set(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'])
for (const word of WORDS) {
  if (!word.de || !word.en || !word.es) problems.push(`empty field ${word.id}`)
  if (!cefrOk.has(word.cefr)) problems.push(`bad cefr ${word.id} ${word.cefr}`)
  if (word.kind === 'noun' && !word.art) problems.push(`noun missing article ${word.de}`)
  const deKey = `${word.art ?? ''}:${word.de.toLowerCase()}`
  const prevDe = de.get(deKey)
  if (prevDe) problems.push(`duplicate de ${deKey} (${prevDe}, ${word.id})`)
  de.set(deKey, word.id)
  const enKey = fold(word.en)
  const prevEn = en.get(enKey)
  if (prevEn) problems.push(`duplicate en "${word.en}" (${prevEn}, ${word.id} ${word.de})`)
  en.set(enKey, `${word.id} ${word.de}`)
  const esKey = fold(word.es)
  const prevEs = es.get(esKey)
  if (prevEs) problems.push(`duplicate es "${word.es}" (${prevEs}, ${word.id} ${word.de})`)
  es.set(esKey, `${word.id} ${word.de}`)
}

const sample = WORDS.slice(0, 12).map((word) => word.id)
const coded = encodeSet('Frühstück & Markt', sample)
const decoded = decodeSet(coded)
if (!decoded || decoded.title !== 'Frühstück & Markt' || decoded.words.map((item) => item.id).join() !== sample.join()) {
  problems.push(`share roundtrip failed: ${JSON.stringify(decoded)}`)
}
if (!decoded?.words.every((item) => item.target === SHELF.sentence)) problems.push('legacy share lost the sentence goal')
const oldSentence = encodeTest('Alt', [{ id: sample[0] ?? '', target: 3 }]).replace(/^v3\./, 'v2.')
const moved = decodeSet(oldSentence)
if (!moved || moved.words[0]?.target !== SHELF.sentence) problems.push(`old sentence goal stayed on shelf ${moved?.words[0]?.target}`)
if (migrateShelf(6, 2) !== SHELF.fill || migrateShelf(8, 2) !== SHELF.recall) problems.push('shelf migration drifted')
const aimed = sample.map((id, index) => ({ id, target: (index % 8) + 1 }))
const again = decodeSet(encodeTest('Frühstück & Markt', aimed))
if (!again || again.title !== 'Frühstück & Markt' || again.words.map((item) => `${item.id}:${item.target}`).join() !== aimed.map((item) => `${item.id}:${item.target}`).join()) {
  problems.push(`test share failed: ${JSON.stringify(again)}`)
}
if (decodeSet('%%%')) problems.push('bad share accepted')

let stat = blankStat()
stat = applyStat({ stat, gameLevel: 1, errors: 0, correct: true }).stat
stat = applyStat({ stat, gameLevel: 1, errors: 1, correct: true }).stat
if (stat.clean !== 0 || stat.level !== 1) problems.push('error did not reset streak')
stat = applyStat({ stat, gameLevel: 1, errors: 0, correct: true }).stat
stat = applyStat({ stat, gameLevel: 1, errors: 0, correct: true }).stat
const up = applyStat({ stat, gameLevel: 1, errors: 0, correct: true })
if (!up.leveled || up.stat.level !== 2) problems.push('three cleans did not level')
const ignored = applyStat({ stat: up.stat, gameLevel: 1, errors: 0, correct: true })
if (ignored.stat.level !== 2 || ignored.leveled) problems.push('easier game changed a higher word')
if (ignored.stat.seen !== up.stat.seen + 1 || ignored.stat.correct !== up.stat.correct + 1) problems.push('practice was not counted')
let memory = { ...blankStat(), level: SHELF.memory }
memory = applyStat({ stat: memory, gameLevel: SHELF.memory, errors: 2, correct: true }).stat
if (memory.clean !== 1 || memory.correct !== 1 || memory.misses !== 2) problems.push('studied match did not count')
let face = blankStat()
face = applyStat({ stat: face, gameLevel: SHELF.open, errors: 1, correct: true }).stat
if (face.clean !== 0 || face.correct !== 1 || face.misses !== 1) problems.push('open board ignored the first try')

let sitting = { ...blankStat(), level: 3 }
for (let i = 0; i < DROP_AT - 1; i++) {
  sitting = applyStat({ stat: sitting, gameLevel: 3, errors: 1, correct: false }).stat
}
if (sitting.level !== 3 || sitting.shelfMisses !== DROP_AT - 1) problems.push('shelf misses did not stack')
const dropped = applyStat({ stat: sitting, gameLevel: 3, errors: 1, correct: false })
if (!dropped.demoted || dropped.stat.level !== 2 || dropped.stat.shelfMisses !== 0) problems.push('three misses did not demote')
const helped = applyStat({
  stat: { ...blankStat(), level: 2, shelfMisses: DROP_AT - 1 },
  gameLevel: 2,
  errors: 1,
  correct: true,
})
if (helped.demoted || helped.stat.level !== 2) problems.push('helped answer should not demote')

const sheet = [
  { id: WORDS[0]?.id ?? '', target: 4 },
  { id: WORDS[1]?.id ?? '', target: 2 },
  { id: WORDS[2]?.id ?? '', target: 1 },
]
const sheetStats = {
  [sheet[0].id]: { ...blankStat(), level: 1 },
  [sheet[1].id]: { ...blankStat(), level: 2 },
  [sheet[2].id]: { ...blankStat(), level: 1 },
}
const pendingHand = nextPendingHand(sheetStats, sheet)
const gradedIds = pendingHand?.gradeIds ?? pendingHand?.words.map((word) => word.id) ?? []
if (!pendingHand || pendingHand.level !== 1 || !gradedIds.includes(sheet[0].id)) {
  problems.push('practice did not start on the lowest pending shelf')
}
if (gradedIds.includes(sheet[1].id) || gradedIds.includes(sheet[2].id)) problems.push('target-met word entered practice')
const exam = simTestHands(sheet)
if (exam.length < 2 || !exam.every((hand) => hand.words.every((word) => {
  const goal = sheet.find((item) => item.id === word.id)?.target
  return !goal || hand.level === goal || Boolean(hand.gradeIds && !hand.gradeIds.includes(word.id))
}))) problems.push('sim test did not mix target shelves')
const missMap = {
  [WORDS[10]?.id ?? '']: { ...blankStat(), level: 2, lastMissedAt: 100, misses: 1 },
  [WORDS[11]?.id ?? '']: { ...blankStat(), level: 2, lastMissedAt: 200, misses: 1 },
}
const missed = recentMissed(missMap)
if (!missed || missed.level !== 2 || missed.count < 2) problems.push('recent misses missing from home')

const hands = planHands(WORDS.slice(0, 7), 1)
if (hands.length !== 2 || hands[0].length + hands[1].length !== 7) problems.push(`planHands ${hands.map((hand) => hand.length).join('+')}`)
const one = planHands(WORDS.slice(0, 4), 1)
if (one.length !== 1 || one[0].length !== 4) problems.push('planHands short')

const queue = buildQueue({}, 1, 'spiral')
if (!queue.hands.length) problems.push('level 1 queue empty')
const ranked = orderPool(WORDS.slice(0, 40), {}, 1, false)
for (let i = 1; i < ranked.length; i++) {
  if (CEFR_LEVELS.indexOf(ranked[i].cefr) < CEFR_LEVELS.indexOf(ranked[i - 1].cefr)) {
    problems.push(`cefr order broke at ${ranked[i - 1].de} → ${ranked[i].de}`)
    break
  }
}
if (isUnlocked({}, 2)) problems.push('level 2 unlocked too early')
const bumped: Record<string, ReturnType<typeof blankStat>> = {}
for (const word of WORDS.slice(0, 50)) bumped[word.id] = { ...blankStat(), level: 2 }
if (!isUnlocked(bumped, 2)) problems.push('50 words did not unlock level 2')

const apfel = WORDS.find((word) => word.de === 'Apfel')
if (!apfel || !matchesDe(apfel, 'apfel', 'der', 'required') || !matchesDe(apfel, 'der Apfel', null, 'required')) problems.push('apple match')
if (!apfel || matchesDe(apfel, 'apfel', 'die', 'required')) problems.push('wrong article accepted')
const sein = WORDS.find((word) => word.de === 'sein')
if (!sein || !matchesGloss(sein, 'es', 'estar') || !matchesGloss(sein, 'en', 'to be')) problems.push('sein gloss')
if (fold('Straße') !== 'strasse' || fold('niña') !== 'nina') problems.push(`fold ${fold('Straße')} ${fold('niña')}`)
if (!glossForms('la mañana').includes('manana')) problems.push('article strip')

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log(`ok ${WORDS.length} words · ${CATEGORIES.length} shelves`)

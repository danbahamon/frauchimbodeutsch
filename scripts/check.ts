import { CATEGORIES } from '../src/data/categories'
import { WORDS } from '../src/data/words'
import { applyStat, blankStat, buildQueue, isUnlocked, planHands } from '../src/lib/progress'
import { decodeSet, encodeSet, encodeTest } from '../src/lib/share'
import { fold, glossForms, matchesDe, matchesGloss } from '../src/lib/text'

const problems: string[] = []
const en = new Map<string, string>()
const es = new Map<string, string>()
const de = new Map<string, string>()

if (WORDS.length < 1700) problems.push(`only ${WORDS.length} words`)

for (const cat of CATEGORIES) {
  const count = WORDS.filter((word) => word.cat === cat.id).length
  if (count < 8) problems.push(`${cat.id} has ${count}`)
}

const seenCat = new Set(WORDS.map((word) => word.cat))
for (const cat of seenCat) {
  if (!CATEGORIES.some((item) => item.id === cat)) problems.push(`unknown category ${cat}`)
}

for (const word of WORDS) {
  if (!word.de || !word.en || !word.es) problems.push(`empty field ${word.id}`)
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
if (!decoded?.words.every((item) => item.target === 3)) problems.push('legacy share lost the sentence goal')
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

const hands = planHands(WORDS.slice(0, 7), 1)
if (hands.length !== 2 || hands[0].length + hands[1].length !== 7) problems.push(`planHands ${hands.map((hand) => hand.length).join('+')}`)
const one = planHands(WORDS.slice(0, 4), 1)
if (one.length !== 1 || one[0].length !== 4) problems.push('planHands short')

const queue = buildQueue({}, 1, 'spiral')
if (!queue.hands.length) problems.push('level 1 queue empty')
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

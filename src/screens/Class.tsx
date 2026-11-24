import { useMemo, useState } from 'react'
import { CATEGORIES, catLabel } from '../data/categories'
import { WORD_BY_ID, WORDS } from '../data/words'
import { GenderKey, Lemma, Pips, SpeakButton } from '../components/Bits'
import { Icon } from '../components/Icon'
import { saveResultCard } from '../lib/card'
import { t } from '../lib/i18n'
import { testRoute } from '../lib/launch'
import { LEVELS, SHELF, readStat } from '../lib/progress'
import { deLabel, gloss, matchesQuery, uid } from '../lib/text'
import type { TargetWord, Word } from '../lib/types'
import { useStore } from '../state'

function GoalSelect({ value, onChange, label }: { value: number; onChange: (level: number) => void; label: string }) {
  const { locale } = useStore()
  return (
    <select className="goal" aria-label={label} value={value} onChange={(event) => onChange(Number(event.target.value))}>
      {LEVELS.map((level) => (
        <option key={level} value={level}>{level} · {t(locale, `level.${level}.name`)}</option>
      ))}
    </select>
  )
}

function Shared({ title, words }: { title: string; words: TargetWord[] }) {
  const { locale, bridge, data, setRoute, flash } = useStore()
  const rows = words
    .map((item) => ({ ...item, word: WORD_BY_ID.get(item.id) }))
    .filter((item): item is TargetWord & { word: Word } => !!item.word)
    .slice()
    .sort((a, b) => a.word.de.localeCompare(b.word.de, 'de'))
  const missing = rows.filter((item) => readStat(data.words, item.id).level < item.target)
  const save = async () => {
    const tag = locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : 'en-US'
    const cardRows = rows.map((item) => ({
      de: deLabel(item.word),
      gloss: gloss(item.word, bridge),
      level: readStat(data.words, item.id).level,
      target: item.target,
      note: t(locale, 'stats.record', {
        seen: readStat(data.words, item.id).seen,
        correct: readStat(data.words, item.id).correct,
        misses: readStat(data.words, item.id).misses,
      }),
    }))
    const reached = cardRows.filter((row) => row.level >= row.target).length
    const saved = await saveResultCard({
      title,
      name: data.profile?.name || '',
      when: new Date().toLocaleDateString(tag, { dateStyle: 'medium' }),
      brand: 'Frau Chimbo Deutsch',
      reached: t(locale, 'play.card.reached', { n: reached, total: cardRows.length }),
      shelfWord: t(locale, 'play.card.shelf'),
      goalWord: t(locale, 'play.card.goal'),
      rows: cardRows,
    })
    if (saved) flash(t(locale, 'shared.saved'))
  }
  return (
    <div className="print-sheet">
      <p className="kicker">{t(locale, 'shared.kicker')}</p>
      <h1>{title}</h1>
      <p className="muted">{t(locale, 'shared.done', { n: rows.length - missing.length, total: rows.length })}</p>
      <p>{t(locale, 'shared.note')}</p>
      <div className="row no-print">
        <button type="button" className="primary" disabled={!missing.length} onClick={() => setRoute(testRoute(title, words, false))}>
          {t(locale, 'shared.missing', { n: missing.length })}
        </button>
        <button type="button" className="ghost" disabled={rows.length < 1} onClick={() => setRoute(testRoute(title, words, true))}>
          {t(locale, 'shared.retest')}
        </button>
        <button type="button" className="ghost" onClick={() => void save()}>{t(locale, 'shared.save')}</button>
        <button type="button" className="ghost" onClick={() => window.print()}>{t(locale, 'shared.print')}</button>
      </div>
      <div className="stack" style={{ marginTop: 16 }}>
        {rows.map((item) => {
          const stat = readStat(data.words, item.id)
          const done = stat.level >= item.target
          return (
            <article key={item.id} className="word-row">
              <div>
                <Lemma word={item.word} />
                <p>{item.word.en} · {item.word.es}</p>
                <p className="fine">
                  {t(locale, 'shared.now', { level: stat.level, name: t(locale, `level.${stat.level}.name`) })}
                  {' · '}
                  {t(locale, 'shared.goal', { level: item.target, name: t(locale, `level.${item.target}.name`) })}
                  {done ? ` · ${t(locale, 'shared.complete')}` : ''}
                </p>
                <p className="fine">{t(locale, 'stats.record', { seen: stat.seen, correct: stat.correct, misses: stat.misses })}</p>
              </div>
              <Pips stat={stat} />
              <SpeakButton text={deLabel(item.word)} label={t(locale, 'play.listen')} />
            </article>
          )
        })}
      </div>
      <GenderKey label={t(locale, 'gender.key')} />
    </div>
  )
}

function Builder() {
  const { locale, data, setRoute, saveSet, deleteSet, openShare } = useStore()
  const [title, setTitle] = useState('')
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string | null>(null)
  const [goal, setGoal] = useState<number>(SHELF.sentence)
  const [picked, setPicked] = useState<TargetWord[]>([])
  const [armed, setArmed] = useState<string | null>(null)
  const filtered = useMemo(() => WORDS.filter((word) => {
    if (cat && word.cat !== cat) return false
    if (query.trim() && !matchesQuery(word, query)) return false
    return true
  }), [cat, query])
  const shown = filtered.slice(0, 60)
  const canAddShelf = Boolean((cat || query.trim()) && filtered.length >= 1 && filtered.length <= 120)
  const chosen = picked.flatMap((item) => {
    const word = WORD_BY_ID.get(item.id)
    return word ? [{ ...item, word }] : []
  })

  const toggle = (id: string) => {
    setPicked((current) => current.some((item) => item.id === id) ? current.filter((item) => item.id !== id) : [...current, { id, target: goal }])
  }

  const make = () => {
    if (picked.length < 4) return
    const name = title.trim() || t(locale, 'class.name.ph')
    const set = { id: uid('set'), title: name, words: picked, createdAt: Date.now() }
    saveSet(set)
    openShare(name, picked)
  }

  return (
    <div>
      <p className="kicker">{t(locale, 'class.title')}</p>
      <h1>{t(locale, 'class.title')}</h1>
      <p className="muted">{t(locale, 'class.lead')}</p>
      <label className="field">
        <span>{t(locale, 'class.name')}</span>
        <input value={title} maxLength={80} placeholder={t(locale, 'class.name.ph')} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label className="field">
        <span>{t(locale, 'class.goal')}</span>
        <GoalSelect value={goal} label={t(locale, 'class.goal')} onChange={setGoal} />
      </label>
      <p className="fine">{t(locale, 'class.goal.note')}</p>
      <label className="search">
        <Icon name="search" />
        <input value={query} placeholder={t(locale, 'class.search')} aria-label={t(locale, 'class.search')} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <div className="chips">
        {CATEGORIES.map((item) => (
          <button key={item.id} type="button" className="chip" data-on={cat === item.id} onClick={() => setCat((current) => current === item.id ? null : item.id)}>
            {item.emoji} {catLabel(locale, item.id)}
          </button>
        ))}
      </div>
      <div className="row">
        {canAddShelf ? (
          <button
            type="button"
            className="ghost"
            onClick={() => setPicked((current) => {
              const ids = new Set(current.map((item) => item.id))
              const added = filtered.filter((word) => !ids.has(word.id)).map((word) => ({ id: word.id, target: goal }))
              return [...current, ...added]
            })}
          >
            {t(locale, 'class.add')}
          </button>
        ) : null}
        {picked.length ? (
          <button type="button" className="text-btn" onClick={() => setPicked((current) => current.map((item) => ({ ...item, target: goal })))}>
            {t(locale, 'class.goal.all')}
          </button>
        ) : null}
        {picked.length ? (
          <button type="button" className="text-btn" onClick={() => setPicked([])}>{t(locale, 'class.clear')}</button>
        ) : null}
      </div>
      <p className="fine">{t(locale, 'class.min', { n: picked.length })}</p>
      {chosen.length ? (
        <div className="stack">
          {chosen.map((item) => (
            <div key={item.id} className="goal-row">
              <div>
                <Lemma word={item.word} />
                <p className="fine">{item.word.en}</p>
              </div>
              <GoalSelect
                value={item.target}
                label={deLabel(item.word)}
                onChange={(level) => setPicked((current) => current.map((row) => row.id === item.id ? { ...row, target: level } : row))}
              />
              <button type="button" className="text-btn" aria-label={t(locale, 'class.remove')} onClick={() => toggle(item.id)}>×</button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="stack">
        {shown.map((word) => {
          const on = picked.some((item) => item.id === word.id)
          return (
            <button key={word.id} type="button" className="pick" aria-pressed={on} onClick={() => toggle(word.id)}>
              <span>
                <Lemma word={word} />
                <small>{word.en} · {word.es}</small>
              </span>
              {on ? <Icon name="check" /> : null}
            </button>
          )
        })}
      </div>
      <button type="button" className="primary wide" disabled={picked.length < 4} onClick={make}>{t(locale, 'class.make')}</button>
      <h2 style={{ marginTop: 28 }}>{t(locale, 'class.saved')}</h2>
      {data.sets.length ? (
        <div className="stack">
          {[...data.sets].reverse().map((set) => (
            <article key={set.id} className="saved-set">
              <div>
                <b>{set.title}</b>
                <p className="fine">{t(locale, 'shared.count', { n: set.words.length })}</p>
              </div>
              <div className="row">
                {armed === set.id ? (
                  <>
                    <button type="button" className="ghost danger" onClick={() => { deleteSet(set.id); setArmed(null) }}>{t(locale, 'class.delete')}</button>
                    <button type="button" className="text-btn" onClick={() => setArmed(null)}>{t(locale, 'cancel')}</button>
                  </>
                ) : (
                  <>
                    <button type="button" className="ghost" onClick={() => setRoute({ name: 'shared', title: set.title, words: set.words })}>{t(locale, 'class.open')}</button>
                    <button type="button" className="ghost" onClick={() => openShare(set.title, set.words)}>{t(locale, 'class.share')}</button>
                    <button type="button" className="text-btn" onClick={() => setArmed(set.id)}>{t(locale, 'class.delete')}</button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : <p>{t(locale, 'class.empty')}</p>}
    </div>
  )
}

export function Class() {
  const route = useStore().data.route
  if (route.name === 'shared') return <Shared title={route.title} words={route.words} />
  return <Builder />
}

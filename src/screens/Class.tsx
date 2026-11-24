import { useMemo, useState } from 'react'
import { CATEGORIES, catLabel } from '../data/categories'
import { WORD_BY_ID, WORDS } from '../data/words'
import { GenderKey, Lemma, Pips, SpeakButton } from '../components/Bits'
import { Icon } from '../components/Icon'
import { t } from '../lib/i18n'
import { roundRoute } from '../lib/launch'
import { collect, readStat } from '../lib/progress'
import { deLabel, matchesQuery, uid } from '../lib/text'
import type { Word } from '../lib/types'
import { useStore } from '../state'

function Shared({ title, wordIds }: { title: string; wordIds: string[] }) {
  const { locale, data, setRoute, flash } = useStore()
  const words = wordIds
    .map((id) => WORD_BY_ID.get(id))
    .filter((word): word is Word => !!word)
    .slice()
    .sort((a, b) => a.de.localeCompare(b.de, 'de'))
  const playable = collect(data.words, 1, { ids: wordIds }).length >= 2
  const play = () => {
    const next = roundRoute(data.words, 1, 'class', { ids: wordIds, title })
    if (!next) flash(t(locale, 'play.empty'))
    else setRoute(next)
  }
  return (
    <div className="print-sheet">
      <p className="kicker">{t(locale, 'shared.kicker')}</p>
      <h1>{title}</h1>
      <p className="muted">{t(locale, 'shared.count', { n: words.length })}</p>
      <p>{t(locale, 'shared.note')}</p>
      <div className="row no-print">
        <button type="button" className="primary" disabled={!playable} onClick={play}>{t(locale, 'shared.play')}</button>
        <button type="button" className="ghost" onClick={() => window.print()}>{t(locale, 'shared.print')}</button>
      </div>
      <div className="stack" style={{ marginTop: 16 }}>
        {words.map((word) => (
          <article key={word.id} className="word-row">
            <div>
              <Lemma word={word} />
              <p>{word.en} · {word.es}</p>
              {word.pl ? <p className="fine">{t(locale, 'common.plural')}: die {word.pl}</p> : null}
            </div>
            <Pips stat={readStat(data.words, word.id)} />
            <SpeakButton text={deLabel(word)} label={t(locale, 'play.listen')} />
          </article>
        ))}
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
  const [picked, setPicked] = useState<string[]>([])
  const [armed, setArmed] = useState<string | null>(null)
  const filtered = useMemo(() => WORDS.filter((word) => {
    if (cat && word.cat !== cat) return false
    if (query.trim() && !matchesQuery(word, query)) return false
    return true
  }), [cat, query])
  const shown = filtered.slice(0, 60)
  const canAddShelf = Boolean((cat || query.trim()) && filtered.length >= 1 && filtered.length <= 120)
  const chosen = picked.map((id) => WORD_BY_ID.get(id)).filter((word): word is Word => !!word)

  const toggle = (id: string) => {
    setPicked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const make = () => {
    if (picked.length < 4) return
    const name = title.trim() || t(locale, 'class.name.ph')
    const set = { id: uid('set'), title: name, wordIds: picked, createdAt: Date.now() }
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
            onClick={() => setPicked((current) => [...new Set([...current, ...filtered.map((word) => word.id)])])}
          >
            {t(locale, 'class.add')}
          </button>
        ) : null}
        {picked.length ? (
          <button type="button" className="text-btn" onClick={() => setPicked([])}>{t(locale, 'class.clear')}</button>
        ) : null}
      </div>
      <p className="fine">{t(locale, 'class.min', { n: picked.length })}</p>
      {chosen.length ? (
        <div className="chips">
          {chosen.map((word) => (
            <button key={word.id} type="button" className="chip" data-on="true" aria-label={t(locale, 'class.remove')} onClick={() => toggle(word.id)}>
              {deLabel(word)} ×
            </button>
          ))}
        </div>
      ) : null}
      <div className="stack">
        {shown.map((word) => {
          const on = picked.includes(word.id)
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
                <p className="fine">{t(locale, 'shared.count', { n: set.wordIds.length })}</p>
              </div>
              <div className="row">
                {armed === set.id ? (
                  <>
                    <button type="button" className="ghost danger" onClick={() => { deleteSet(set.id); setArmed(null) }}>{t(locale, 'class.delete')}</button>
                    <button type="button" className="text-btn" onClick={() => setArmed(null)}>{t(locale, 'cancel')}</button>
                  </>
                ) : (
                  <>
                    <button type="button" className="ghost" onClick={() => setRoute({ name: 'shared', title: set.title, wordIds: set.wordIds })}>{t(locale, 'class.open')}</button>
                    <button type="button" className="ghost" onClick={() => openShare(set.title, set.wordIds)}>{t(locale, 'class.share')}</button>
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
  if (route.name === 'shared') return <Shared title={route.title} wordIds={route.wordIds} />
  return <Builder />
}

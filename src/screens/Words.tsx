import { useMemo, useState } from 'react'
import { CATEGORIES, catLabel, getCategory } from '../data/categories'
import { WORDS } from '../data/words'
import { GenderKey, Lemma, Pips, SpeakButton } from '../components/Bits'
import { Icon } from '../components/Icon'
import { t } from '../lib/i18n'
import { roundRoute } from '../lib/launch'
import { assignCategory, categoryStats, readStat } from '../lib/progress'
import { deLabel, gloss, matchesQuery } from '../lib/text'
import { useStore } from '../state'

function WordLine({ id }: { id: string }) {
  const { locale, data } = useStore()
  const word = WORDS.find((item) => item.id === id)
  if (!word) return null
  return (
    <article className="word-row">
      <div>
        <Lemma word={word} />
        <p>{gloss(word, 'en')} · {gloss(word, 'es')}</p>
        {word.pl ? <p className="fine">{t(locale, 'common.plural')}: die {word.pl}</p> : null}
      </div>
      <Pips stat={readStat(data.words, word.id)} />
      <SpeakButton text={deLabel(word)} label={t(locale, 'play.listen')} />
    </article>
  )
}

function Dictionary() {
  const { locale, data, setRoute } = useStore()
  const [query, setQuery] = useState('')
  const shelves = useMemo(() => categoryStats(data.words), [data.words])
  const found = query.trim()
    ? WORDS.filter((word) => matchesQuery(word, query)).slice(0, 40)
    : []

  return (
    <div>
      <p className="kicker">{t(locale, 'app.tagline')}</p>
      <h1>{t(locale, 'words.title')}</h1>
      <p className="muted">{t(locale, 'words.lead')}</p>
      <label className="search">
        <Icon name="search" />
        <input
          value={query}
          placeholder={t(locale, 'words.search')}
          aria-label={t(locale, 'words.search')}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {query.trim() ? (
        <div className="stack" style={{ marginTop: 14 }}>
          {found.length ? found.map((word) => <WordLine key={word.id} id={word.id} />) : <p>{t(locale, 'words.empty')}</p>}
        </div>
      ) : (
        <div className="cat-grid">
          {CATEGORIES.map((cat) => {
            const stat = shelves.find((item) => item.cat.id === cat.id)
            return (
              <button key={cat.id} type="button" className="cat-card" onClick={() => setRoute({ name: 'category', cat: cat.id })}>
                <span className="cat-emoji" aria-hidden="true">{cat.emoji}</span>
                <b>{catLabel(locale, cat.id)}</b>
                <small>{t(locale, 'words.count', { n: stat?.total ?? 0 })} · {stat ? stat.avg.toFixed(1) : '1.0'}</small>
              </button>
            )
          })}
        </div>
      )}
      <GenderKey label={t(locale, 'gender.key')} />
    </div>
  )
}

function Shelf({ cat }: { cat: string }) {
  const { locale, data, setRoute, flash } = useStore()
  const info = getCategory(cat)
  const words = WORDS.filter((word) => word.cat === cat).slice().sort((a, b) => a.de.localeCompare(b.de, 'de'))
  const practice = () => {
    const level = assignCategory(data.words, cat)
    if (!level) {
      flash(t(locale, 'play.empty'))
      return
    }
    const next = roundRoute(data.words, level, 'category', { cat, title: catLabel(locale, cat) })
    if (!next) flash(t(locale, 'play.empty'))
    else setRoute(next)
  }
  return (
    <div>
      <button type="button" className="text-btn no-print" onClick={() => setRoute({ name: 'words' })}>
        <Icon name="back" /> {t(locale, 'words.back')}
      </button>
      <p className="kicker">{info?.emoji} {t(locale, 'words.count', { n: words.length })}</p>
      <h1>{info ? catLabel(locale, cat) : cat}</h1>
      <button type="button" className="primary" onClick={practice}>{t(locale, 'words.practice')}</button>
      <div className="stack" style={{ marginTop: 16 }}>
        {words.map((word) => <WordLine key={word.id} id={word.id} />)}
      </div>
      <GenderKey label={t(locale, 'gender.key')} />
    </div>
  )
}

export function Words() {
  const route = useStore().data.route
  if (route.name === 'category') return <Shelf cat={route.cat} />
  return <Dictionary />
}

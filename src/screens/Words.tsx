import { useMemo, useState } from 'react'
import { CATEGORIES, catLabel, getCategory } from '../data/categories'
import { WORDS } from '../data/words'
import { GenderKey, Lemma, Pips, SpeakButton } from '../components/Bits'
import { Icon } from '../components/Icon'
import { t } from '../lib/i18n'
import { roundRoute } from '../lib/launch'
import { assignCategory, categoryStats, cefrRank, readStat } from '../lib/progress'
import { deLabel, gloss, matchesQuery } from '../lib/text'
import { CEFR_LEVELS, type Cefr } from '../lib/types'
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
        <p className="fine">{t(locale, 'common.cefr', { level: word.cefr.toUpperCase() })}{word.pl ? ` · ${t(locale, 'common.plural')}: die ${word.pl}` : ''}</p>
      </div>
      <Pips stat={readStat(data.words, word.id)} />
      <SpeakButton text={deLabel(word)} label={t(locale, 'play.listen')} />
    </article>
  )
}

function Dictionary() {
  const { locale, data, setRoute } = useStore()
  const [query, setQuery] = useState('')
  const [band, setBand] = useState<Cefr | 'all'>('all')
  const shelves = useMemo(() => categoryStats(data.words), [data.words])
  const allFound = useMemo(() => {
    if (!query.trim() && band === 'all') return []
    return WORDS.filter((word) => {
      if (band !== 'all' && word.cefr !== band) return false
      if (query.trim() && !matchesQuery(word, query)) return false
      return true
    }).sort((a, b) => cefrRank(a.cefr) - cefrRank(b.cefr) || a.de.localeCompare(b.de, 'de'))
  }, [query, band])
  const found = allFound.slice(0, 40)

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
      <div className="chips">
        <button type="button" className="chip" data-on={band === 'all'} onClick={() => setBand('all')}>{t(locale, 'words.all')}</button>
        {CEFR_LEVELS.map((level) => (
          <button key={level} type="button" className="chip" data-on={band === level} onClick={() => setBand(level)}>
            {level.toUpperCase()}
          </button>
        ))}
      </div>
      {query.trim() || band !== 'all' ? (
        <div className="stack" style={{ marginTop: 14 }}>
          {found.length ? found.map((word) => <WordLine key={word.id} id={word.id} />) : <p>{t(locale, 'words.empty')}</p>}
          {allFound.length > found.length ? (
            <p className="fine">{t(locale, 'words.more', { shown: found.length, total: allFound.length })}</p>
          ) : null}
        </div>
      ) : (
        <div className="cat-grid">
          {CATEGORIES.map((cat) => {
            const stat = shelves.find((item) => item.cat.id === cat.id)
            return (
              <button key={cat.id} type="button" className="cat-card" onClick={() => setRoute({ name: 'category', cat: cat.id })}>
                <span className="cat-emoji" aria-hidden="true">{cat.emoji}</span>
                <b>{catLabel(locale, cat.id)}</b>
                <small>
                  {t(locale, 'words.count', { n: stat?.total ?? 0 })}
                  {stat && stat.avg > 1.01 ? ` · ${t(locale, 'words.avg', { n: stat.avg.toFixed(1) })}` : ''}
                </small>
              </button>
            )
          })}
        </div>
      )}
      <p className="fine" style={{ marginTop: 14 }}>{t(locale, 'words.dots.key')}</p>
      <GenderKey label={t(locale, 'gender.key')} />
    </div>
  )
}

function Shelf({ cat }: { cat: string }) {
  const { locale, data, setRoute, flash } = useStore()
  const [band, setBand] = useState<Cefr | 'all'>('all')
  const info = getCategory(cat)
  const allWords = useMemo(
    () => WORDS.filter((word) => word.cat === cat).slice().sort((a, b) => cefrRank(a.cefr) - cefrRank(b.cefr) || a.de.localeCompare(b.de, 'de')),
    [cat],
  )
  const words = band === 'all' ? allWords : allWords.filter((word) => word.cefr === band)
  const bandsPresent = useMemo(() => CEFR_LEVELS.filter((level) => allWords.some((word) => word.cefr === level)), [allWords])
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
      {bandsPresent.length > 1 ? (
        <div className="chips">
          <button type="button" className="chip" data-on={band === 'all'} onClick={() => setBand('all')}>{t(locale, 'words.all')}</button>
          {bandsPresent.map((level) => (
            <button key={level} type="button" className="chip" data-on={band === level} onClick={() => setBand(level)}>
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      ) : null}
      <div className="stack" style={{ marginTop: 16 }}>
        {words.map((word) => <WordLine key={word.id} id={word.id} />)}
      </div>
      <p className="fine" style={{ marginTop: 14 }}>{t(locale, 'words.dots.key')}</p>
      <GenderKey label={t(locale, 'gender.key')} />
    </div>
  )
}

export function Words() {
  const route = useStore().data.route
  if (route.name === 'category') return <Shelf cat={route.cat} />
  return <Dictionary />
}

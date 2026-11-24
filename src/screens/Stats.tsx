import { useState } from 'react'
import { catLabel } from '../data/categories'
import { WORDS } from '../data/words'
import { Icon } from '../components/Icon'
import { Lemma } from '../components/Bits'
import { Mascot } from '../components/Mascot'
import { t } from '../lib/i18n'
import { CLEAN_NEED, LEVELS, categoryStats, readStat, streakOf, totals } from '../lib/progress'
import { matchesQuery } from '../lib/text'
import { useStore } from '../state'

export function Stats() {
  const { locale, data, setRoute } = useStore()
  const [query, setQuery] = useState('')
  const picture = totals(data.words)
  const rate = picture.seen ? Math.round((picture.cleanHits / picture.seen) * 100) : 0
  const streak = streakOf(data.sessions.map((session) => session.at))
  const peak = Math.max(...picture.levels.slice(1), 1)
  const shelves = [...categoryStats(data.words)].sort((a, b) => a.avg - b.avg || a.cat.en.localeCompare(b.cat.en))
  const almost = WORDS.filter((word) => {
    const stat = data.words[word.id]
    return !!stat && !stat.mastered && stat.clean === CLEAN_NEED - 1
  }).slice(0, 12)
  const recent = [...data.sessions].reverse().slice(0, 8)
  const tag = locale === 'de' ? 'de' : locale === 'es' ? 'es' : 'en'
  const records = WORDS.flatMap((word) => {
    const stat = readStat(data.words, word.id)
    if (query.trim()) return matchesQuery(word, query) ? [{ word, stat }] : []
    return stat.seen > 0 ? [{ word, stat }] : []
  }).sort((a, b) => b.stat.seen - a.stat.seen || a.word.de.localeCompare(b.word.de, 'de'))

  return (
    <div>
      <div className="page-head">
        <Mascot mood={picture.mastered ? 'joy' : 'idle'} size={72} />
        <div>
          <p className="kicker">{t(locale, 'stats.lead')}</p>
          <h1>{t(locale, 'stats.title')}</h1>
        </div>
      </div>
      <div className="kpis">
        <div className="kpi"><small>{t(locale, 'stats.streak')}</small><b>{streak}</b></div>
        <div className="kpi"><small>{t(locale, 'stats.clean')}</small><b>{picture.seen ? `${rate}%` : '—'}</b></div>
        <div className="kpi"><small>{t(locale, 'stats.mastered')}</small><b>{picture.mastered}</b></div>
        <div className="kpi"><small>{t(locale, 'stats.seen')}</small><b>{picture.seen}</b></div>
      </div>
      <section className="panel">
        <h2>{t(locale, 'stats.words')}</h2>
        <label className="search">
          <Icon name="search" />
          <input
            value={query}
            placeholder={t(locale, 'words.search')}
            aria-label={t(locale, 'words.search')}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {records.length ? (
          <div className="stack" style={{ marginTop: 12 }}>
            {(query.trim() ? records.slice(0, 40) : records).map(({ word, stat }) => (
              <article key={word.id} className="sum-row">
                <Lemma word={word} />
                <p>{t(locale, 'stats.record', { seen: stat.seen, correct: stat.correct, misses: stat.misses })}</p>
                <small>{t(locale, 'common.level', { n: stat.level })} · {t(locale, `level.${stat.level}.name`)}</small>
              </article>
            ))}
          </div>
        ) : <p>{t(locale, 'stats.words.empty')}</p>}
      </section>
      <section className="panel">
        <h2>{t(locale, 'stats.shelves')}</h2>
        <div className="bars">
          {LEVELS.map((level) => (
            <div key={level} className="bar">
              <span>{t(locale, `level.${level}.name`)}</span>
              <i><b style={{ width: `${(picture.levels[level] / peak) * 100}%` }} /></i>
              <strong>{picture.levels[level]}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>{t(locale, 'stats.grow')}</h2>
        <div className="stack">
          {shelves.map((item) => (
            <button key={item.cat.id} type="button" className="grow" onClick={() => setRoute({ name: 'category', cat: item.cat.id })}>
              <span className="cat-emoji">{item.cat.emoji}</span>
              <span>
                <b>{catLabel(locale, item.cat.id)}</b>
                <small>{t(locale, 'words.count', { n: item.total })} · {item.avg.toFixed(1)} · ★ {item.mastered}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
      {almost.length ? (
        <section className="panel">
          <h2>{t(locale, 'stats.almost')}</h2>
          <div className="stack">
            {almost.map((word) => (
              <div key={word.id} className="sum-row">
                <Lemma word={word} />
                <span>{t(locale, 'common.level', { n: readStat(data.words, word.id).level })}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <section className="panel">
        <h2>{t(locale, 'stats.sessions')}</h2>
        {recent.length ? (
          <div className="stack">
            {recent.map((session) => (
              <article key={session.id} className="sum-row">
                <b>{session.title || (session.cat ? catLabel(locale, session.cat) : t(locale, `level.${session.level}.name`))}</b>
                <span>{new Date(session.at).toLocaleDateString(tag)}</span>
                <small>{t(locale, 'play.perfect')} {session.clean}/{session.played}{session.leveled ? ` · ${session.leveled}` : ''}</small>
              </article>
            ))}
          </div>
        ) : <p>{t(locale, 'stats.none')}</p>}
      </section>
    </div>
  )
}

import { catLabel } from '../data/categories'
import { WORDS } from '../data/words'
import { Lemma } from '../components/Bits'
import { Mascot } from '../components/Mascot'
import { t } from '../lib/i18n'
import { CLEAN_NEED, categoryStats, readStat, streakOf, totals } from '../lib/progress'
import { useStore } from '../state'

export function Stats() {
  const { locale, data, setRoute } = useStore()
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
        <h2>{t(locale, 'stats.shelves')}</h2>
        <div className="bars">
          {[1, 2, 3, 4, 5].map((level) => (
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

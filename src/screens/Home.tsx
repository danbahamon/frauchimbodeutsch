import { catLabel, getCategory } from '../data/categories'
import { GenderKey, Lemma, SpeakButton } from '../components/Bits'
import { Icon } from '../components/Icon'
import { Mascot } from '../components/Mascot'
import { t, greetKey } from '../lib/i18n'
import { roundRoute } from '../lib/launch'
import { assignLevel, collect, countReached, countSitting, isUnlocked, nextLocked, streakOf, almostWords, wordOfDay, UNLOCK_AT } from '../lib/progress'
import { deLabel, gloss } from '../lib/text'
import { useStore } from '../state'

export function Home() {
  const store = useStore()
  const { locale, data, setRoute, flash } = store
  const profile = data.profile
  if (!profile) return null
  const today = assignLevel(data.words)
  const streak = streakOf(data.sessions.map((session) => session.at))
  const almost = almostWords(data.words)
  const almostReady = !!almost && collect(data.words, almost.level, { ids: almost.ids }).length >= (almost.level === 1 ? 2 : 1)
  const word = wordOfDay()
  const cat = word ? getCategory(word.cat) : undefined
  const locked = nextLocked(data.words)
  const streakLine = streak > 1 ? t(locale, 'home.streak', { n: streak }) : streak === 1 ? t(locale, 'home.streak.one') : t(locale, 'home.streak.zero')

  const begin = (level: number, source: 'spiral' | 'shelf', extra?: { title?: string; ids?: string[] }) => {
    const next = roundRoute(data.words, level, source, extra)
    if (!next) flash(t(locale, 'play.empty'))
    else setRoute(next)
  }

  return (
    <div>
      <section className="hero-card">
        <Mascot mood={streak ? 'joy' : 'idle'} size={84} />
        <div>
          <p className="kicker">{t(locale, 'home.kicker')}</p>
          <h1>{t(locale, greetKey())}, {profile.name}.</h1>
          <p className="muted">{streakLine}</p>
        </div>
      </section>
      <div className="shelves" style={{ marginTop: 16 }}>
        {[1, 2, 3, 4, 5].map((level) => {
          const open = isUnlocked(data.words, level)
          return (
            <button
              key={level}
              type="button"
              className="shelf"
              data-open={open}
              data-today={level === today}
              onClick={() => {
                if (!open) {
                  flash(t(locale, 'home.next', { level, need: UNLOCK_AT, have: countReached(data.words, level) }))
                  return
                }
                begin(level, 'shelf', { title: t(locale, `level.${level}.name`) })
              }}
            >
              {level === today ? <small>{t(locale, 'shelf.today')}</small> : <small>{t(locale, 'common.level', { n: level })}</small>}
              <b>{t(locale, `level.${level}.name`)}</b>
              <span>{open ? t(locale, 'shelf.waiting', { n: countSitting(data.words, level) }) : `${countReached(data.words, level)}/${UNLOCK_AT}`}</span>
            </button>
          )
        })}
      </div>
      <p className="fine">
        {locked ? t(locale, 'home.next', { level: locked, need: UNLOCK_AT, have: countReached(data.words, locked) }) : t(locale, 'home.allopen')}
      </p>
      <button type="button" className="feature" onClick={() => begin(today, 'spiral', { title: t(locale, 'home.today') })}>
        <span className="well teal"><Icon name="play" size={22} /></span>
        <span>
          <small className="kicker">{t(locale, 'home.today')}</small>
          <b>{t(locale, `level.${today}.name`)}</b>
          <span>{t(locale, 'home.today.sub', { level: today, name: t(locale, `level.${today}.name`), n: countSitting(data.words, today) })}</span>
        </span>
      </button>
      {almost && almostReady ? (
        <button
          type="button"
          className="suggest"
          onClick={() => begin(almost.level, 'shelf', { ids: almost.ids, title: t(locale, 'home.almost', { n: almost.ids.length }) })}
        >
          <span>
            <small className="kicker">{t(locale, 'home.almost', { n: almost.ids.length })}</small>
            <b>{t(locale, `level.${almost.level}.name`)}</b>
            <span>{t(locale, 'home.almost.sub', { level: almost.level })}</span>
          </span>
        </button>
      ) : null}
      <div className="hero-actions">
        <button type="button" className="action" onClick={() => setRoute({ name: 'words' })}>
          <span className="well gold"><Icon name="words" size={22} /></span>
          <span><b>{t(locale, 'home.lex')}</b><span>{t(locale, 'home.lex.sub')}</span></span>
        </button>
        <button type="button" className="action" onClick={() => setRoute({ name: 'class' })}>
          <span className="well indigo"><Icon name="class" size={22} /></span>
          <span><b>{t(locale, 'home.class')}</b><span>{t(locale, 'home.class.sub')}</span></span>
        </button>
        <button type="button" className="action" onClick={() => setRoute({ name: 'stats' })}>
          <span className="well coral"><Icon name="stats" size={22} /></span>
          <span><b>{t(locale, 'home.stats')}</b><span>{t(locale, 'home.stats.sub')}</span></span>
        </button>
      </div>
      {word ? (
        <article className="day-word">
          <p className="kicker">{t(locale, 'home.word')}</p>
          <div className="day-row">
            <div>
              <Lemma word={word} />
              <p>{gloss(word, 'en')} · {gloss(word, 'es')}</p>
              {word.pl ? <p className="fine">{t(locale, 'common.plural')}: die {word.pl}</p> : null}
            </div>
            <SpeakButton text={deLabel(word)} label={t(locale, 'play.listen')} />
          </div>
          {cat ? (
            <button type="button" className="text-btn" onClick={() => setRoute({ name: 'category', cat: word.cat })}>
              {cat.emoji} {catLabel(locale, word.cat)}
            </button>
          ) : null}
        </article>
      ) : null}
      <GenderKey label={t(locale, 'gender.key')} />
    </div>
  )
}

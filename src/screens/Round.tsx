import { useEffect, useMemo, useRef, useState } from 'react'
import { catLabel } from '../data/categories'
import { WORD_BY_ID } from '../data/words'
import { Burst } from '../components/Bits'
import { Mascot, type MascotMood } from '../components/Mascot'
import { MatchGame } from '../games/MatchGame'
import { PromptGame } from '../games/PromptGame'
import { t } from '../lib/i18n'
import { buildQueue, openLevels } from '../lib/progress'
import { deLabel, gloss, makeTask, uid } from '../lib/text'
import type { Source, Word } from '../lib/types'
import { useStore } from '../state'

interface Outcome {
  wordId: string
  errors: number
  correct: boolean
  leveled: boolean
  mastered: boolean
  level: number
}

function stars(clean: number, total: number) {
  if (!total || clean <= 0) return 0
  if (clean === total) return 3
  if (clean / total >= 0.5) return 2
  return 1
}

export function Round() {
  const store = useStore()
  const { locale, bridge, data, setRoute, recordWord, logSession } = store
  const route = data.route
  const round = route.name === 'round' ? route : null
  const wordsRef = useRef(data.words)
  const plan = useMemo(() => {
    if (!round) return { hands: [] as Word[][] }
    return buildQueue(wordsRef.current, round.level, round.source, { cat: round.cat, ids: round.wordIds })
  }, [round])
  const [handIndex, setHandIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<'play' | 'done'>('play')
  const [live, setLive] = useState(0)
  const outcomes = useRef<Outcome[]>([])
  const logged = useRef(false)
  const logRef = useRef(logSession)
  logRef.current = logSession
  const meta = useRef({ level: round?.level ?? 1, source: (round?.source ?? 'spiral') as Source, title: round?.title, cat: round?.cat })
  if (round) meta.current = { level: round.level, source: round.source, title: round.title, cat: round.cat }
  const openedAtStart = useRef(openLevels(wordsRef.current))

  useEffect(() => () => {
    if (logged.current) return
    const list = outcomes.current
    if (!list.length) return
    logged.current = true
    const info = meta.current
    logRef.current({
      id: uid('s'),
      at: Date.now(),
      level: info.level,
      source: info.source,
      title: info.title,
      cat: info.cat,
      played: list.length,
      clean: list.filter((item) => item.correct && item.errors === 0).length,
      helped: list.filter((item) => item.correct && item.errors > 0).length,
      missed: list.filter((item) => !item.correct).length,
      leveled: list.filter((item) => item.leveled).length,
    })
  }, [])

  const hand = plan.hands[handIndex]
  const level = round?.level ?? 1
  const task = useMemo(() => {
    if (!hand || level === 1) return null
    const word = hand[step]
    return word ? makeTask(word, level, bridge) : null
  }, [hand, step, level, bridge])

  if (!round) return null
  if (!hand) {
    return (
      <div>
        <p>{t(locale, 'play.empty')}</p>
        <button type="button" className="primary" onClick={() => setRoute({ name: 'play' })}>{t(locale, 'play.home')}</button>
      </div>
    )
  }

  const grade = (wordId: string, errors: number, correct: boolean) => {
    const info = recordWord(wordId, level, errors, correct)
    outcomes.current.push({ wordId, errors, correct, leveled: info.leveled, mastered: info.mastered, level: info.level })
    setLive((value) => value + 1)
    return info
  }

  const list = outcomes.current
  let run = 0
  for (let index = list.length - 1; index >= 0; index--) {
    const item = list[index]
    if (!item?.correct || item.errors !== 0) break
    run += 1
  }
  void live
  const title = round.title || (round.cat ? catLabel(locale, round.cat) : t(locale, `level.${level}.name`))

  if (phase === 'done') {
    const clean = list.filter((item) => item.correct && item.errors === 0).length
    const helped = list.filter((item) => item.correct && item.errors > 0).length
    const missed = list.filter((item) => !item.correct).length
    const score = stars(clean, list.length)
    const opened = openLevels(data.words).filter((item) => !openedAtStart.current.includes(item))
    const ratio = list.length ? clean / list.length : 0
    const mood: MascotMood = opened.length || list.some((item) => item.leveled) || ratio >= 0.6 ? 'joy' : missed > clean ? 'think' : 'idle'
    const left = plan.hands.slice(handIndex + 1).reduce((sum, item) => sum + item.length, 0)
    return (
      <div className="summary">
        <div className="summary-hero">
          {list.some((item) => item.leveled) ? <Burst /> : null}
          <Mascot mood={mood} size={116} />
          <div>
            <p className="kicker">{t(locale, 'play.summary')}</p>
            <h1 className="stars">{'★'.repeat(score)}{'☆'.repeat(3 - score)}</h1>
            <p className="muted">{title}</p>
          </div>
        </div>
        <div className="kpis">
          <div className="kpi"><small>{t(locale, 'play.perfect')}</small><b>{clean}</b></div>
          <div className="kpi"><small>{t(locale, 'play.helped')}</small><b>{helped}</b></div>
          <div className="kpi"><small>{t(locale, 'play.missed')}</small><b>{missed}</b></div>
        </div>
        {opened.map((item) => (
          <p key={item} className="banner">{t(locale, 'play.opened', { level: item, name: t(locale, `level.${item}.name`) })}</p>
        ))}
        <div className="stack">
          {list.map((item, index) => {
            const word = WORD_BY_ID.get(item.wordId)
            if (!word) return null
            const kind = item.correct && item.errors === 0 ? 'play.perfect' : item.correct ? 'play.helped' : 'play.missed'
            return (
              <div key={`${item.wordId}-${index}`} className="sum-row">
                <b>{deLabel(word)}</b>
                <span>{gloss(word, bridge)}</span>
                <small>
                  {t(locale, kind)}
                  {item.leveled ? ` · ${t(locale, 'play.moved', { level: item.level })}` : ''}
                  {item.mastered ? ` · ${t(locale, 'play.mastered')}` : ''}
                </small>
              </div>
            )
          })}
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          {left > 0 ? (
            <button type="button" className="primary" onClick={() => { setHandIndex((value) => value + 1); setStep(0); setPhase('play') }}>
              {t(locale, 'play.more')}
            </button>
          ) : null}
          <button type="button" className="ghost" onClick={() => setRoute({ ...round, nonce: Date.now() })}>{t(locale, 'play.again')}</button>
          <button type="button" className="text-btn" onClick={() => setRoute({ name: 'home' })}>{t(locale, 'play.home')}</button>
        </div>
        {left > 0 ? <p className="fine">{t(locale, 'play.left', { n: left })}</p> : null}
      </div>
    )
  }

  return (
    <div className="session">
      <header className="runner">
        <div>
          <p className="kicker">{t(locale, 'common.level', { n: level })} · {t(locale, `level.${level}.name`)}</p>
          <strong>{title}</strong>
        </div>
        <div className="runner-side">
          {run > 1 ? <span className="streak-pill">{t(locale, 'play.streak', { n: run })}</span> : null}
          <span className="runner-count">{level === 1 ? hand.length : `${Math.min(step + 1, hand.length)}/${hand.length}`}</span>
        </div>
      </header>
      <div className="progress" aria-hidden="true">
        <i style={{ width: level === 1 ? '12%' : `${(step / Math.max(hand.length, 1)) * 100}%` }} />
      </div>
      <div className="play-scroll">
        {level === 1 ? (
          <MatchGame
            key={handIndex}
            words={hand}
            bridge={bridge}
            locale={locale}
            sound={data.profile?.sound !== false}
            voice={data.profile?.voice !== false}
            onGrade={grade}
            onDone={() => setPhase('done')}
          />
        ) : task ? (
          <PromptGame
            key={`${handIndex}-${step}`}
            task={task}
            level={level}
            bridge={bridge}
            locale={locale}
            sound={data.profile?.sound !== false}
            voice={data.profile?.voice !== false}
            onGrade={grade}
            onNext={() => {
              if (step + 1 >= hand.length) setPhase('done')
              else setStep((value) => value + 1)
            }}
          />
        ) : null}
      </div>
      <button type="button" className="text-btn end-round" onClick={() => (list.length ? setPhase('done') : setRoute({ name: 'home' }))}>
        {t(locale, 'play.end')}
      </button>
    </div>
  )
}

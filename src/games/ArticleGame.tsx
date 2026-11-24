import { useEffect, useRef, useState } from 'react'
import { getCategory } from '../data/categories'
import { Icon } from '../components/Icon'
import { playFeedback, speakGerman } from '../lib/audio'
import { t } from '../lib/i18n'
import { deLabel, gloss } from '../lib/text'
import type { Bridge, Locale, Word } from '../lib/types'

interface Mark {
  leveled: boolean
  mastered: boolean
  level: number
}

const ARTS = ['der', 'die', 'das', 'none'] as const

export function ArticleGame({
  word,
  bridge,
  locale,
  sound,
  voice,
  onGrade,
  onNext,
}: {
  word: Word
  bridge: Bridge
  locale: Locale
  sound: boolean
  voice: boolean
  onGrade: (wordId: string, errors: number, correct: boolean) => Mark
  onNext: () => void
}) {
  const answer = word.art ?? 'none'
  const [chosen, setChosen] = useState<string | null>(null)
  const [mark, setMark] = useState<Mark | null>(null)
  const done = useRef(false)
  const cat = getCategory(word.cat)

  const pick = (id: string) => {
    if (done.current) return
    done.current = true
    const correct = id === answer
    setChosen(id)
    setMark(onGrade(word.id, correct ? 0 : 1, correct))
    playFeedback(correct, sound)
    if (voice) speakGerman(deLabel(word), true)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return
      if (event.key === 'Enter' && done.current) onNext()
      if (!done.current && /^[1-4]$/.test(event.key)) {
        const option = ARTS[Number(event.key) - 1]
        if (option) pick(option)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="prompt-game">
      <p className="kicker">{cat?.emoji} {t(locale, 'play.prompt.article')}</p>
      <div className="prompt-head">
        <h2 className="prompt">{word.de}</h2>
        <button type="button" className="icon-btn tiny" aria-label={t(locale, 'play.listen')} onClick={() => speakGerman(word.de, true)}>
          <Icon name="volume" size={16} />
        </button>
      </div>
      <p className="muted">{gloss(word, bridge)}</p>
      <div className="art-grid">
        {ARTS.map((id, index) => (
          <button
            key={id}
            type="button"
            className="art-btn"
            data-art={id === 'none' ? '' : id}
            data-on={chosen === id}
            data-ok={chosen !== null && id === answer}
            data-bad={chosen === id && id !== answer}
            disabled={chosen !== null}
            onClick={() => pick(id)}
          >
            <small>{index + 1}</small>
            {id === 'none' ? t(locale, 'play.none') : id}
          </button>
        ))}
      </div>
      {chosen ? (
        <div className={chosen === answer ? 'verdict ok' : 'verdict bad'} role="status">
          <b>{chosen === answer ? t(locale, 'play.yes') : t(locale, 'play.no')}</b>
          <p>{deLabel(word)} · {gloss(word, bridge)}</p>
          {mark?.leveled ? <p>{t(locale, 'play.moved', { level: mark.level })}</p> : null}
          {mark?.mastered ? <p>{t(locale, 'play.mastered')}</p> : null}
        </div>
      ) : null}
      {chosen ? <button type="button" className="primary" data-ready="true" onClick={onNext}>{t(locale, 'play.next')}</button> : null}
    </div>
  )
}

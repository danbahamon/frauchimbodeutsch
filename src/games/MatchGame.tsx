import { useEffect, useMemo, useRef, useState } from 'react'
import { Spiral } from '../components/Bits'
import { playFeedback, speakGerman } from '../lib/audio'
import { t } from '../lib/i18n'
import { matchCards, type MemoryCard } from '../lib/text'
import type { Bridge, Locale, Word } from '../lib/types'

interface Props {
  words: Word[]
  bridge: Bridge
  locale: Locale
  sound: boolean
  voice: boolean
  onGrade: (wordId: string, errors: number, correct: boolean) => void
  onDone: () => void
}

export function MatchGame({ words, bridge, locale, sound, voice, onGrade, onDone }: Props) {
  const cards = useMemo(() => matchCards(words, bridge), [words, bridge])
  const [open, setOpen] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [bad, setBad] = useState(false)
  const misses = useRef<Record<string, number>>({})
  const lock = useRef(false)
  const timer = useRef(0)
  const done = useRef(false)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const tap = (card: MemoryCard) => {
    if (lock.current || matched.includes(card.wordId)) return
    if (open.includes(card.key)) {
      setOpen((current) => current.filter((key) => key !== card.key))
      return
    }
    const next = [...open, card.key]
    if (next.length < 2) {
      setOpen(next)
      return
    }
    const first = cards.find((item) => item.key === next[0])
    if (!first) return
    if (first.wordId === card.wordId && first.side !== card.side) {
      const errors = misses.current[card.wordId] ?? 0
      const nextMatched = [...matched, card.wordId]
      setMatched(nextMatched)
      setOpen([])
      playFeedback(true, sound)
      if (voice) speakGerman(card.speak, true)
      onGrade(card.wordId, errors, true)
      if (nextMatched.length === words.length && !done.current) {
        done.current = true
        timer.current = window.setTimeout(onDone, 420)
      }
      return
    }
    misses.current[first.wordId] = (misses.current[first.wordId] ?? 0) + 1
    misses.current[card.wordId] = (misses.current[card.wordId] ?? 0) + 1
    playFeedback(false, sound)
    lock.current = true
    setBad(true)
    setOpen(next)
    timer.current = window.setTimeout(() => {
      setOpen([])
      setBad(false)
      lock.current = false
    }, 740)
  }

  const tag = bridge === 'es' ? 'ES' : 'EN'
  return (
    <div className="mem-grid" role="group">
      {cards.map((card) => {
        const up = open.includes(card.key) || matched.includes(card.wordId)
        return (
          <button
            key={card.key}
            type="button"
            className="mem"
            data-up={up}
            data-matched={matched.includes(card.wordId)}
            data-bad={bad && open.includes(card.key)}
            aria-pressed={up}
            aria-label={up ? card.text : t(locale, 'play.hidden')}
            onClick={() => tap(card)}
          >
            <span className="mem-inner">
              <span className="mem-face mem-back">
                <Spiral />
                <small>DE · {tag}</small>
              </span>
              <span className="mem-face mem-front" data-art={card.art ?? ''} data-long={card.text.length > 16}>
                <small>{card.side === 'de' ? 'DE' : tag}</small>
                <b>{card.text}</b>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

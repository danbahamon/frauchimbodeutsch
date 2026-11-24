import { useEffect, useMemo, useRef, useState } from 'react'
import { Spiral } from '../components/Bits'
import { playFeedback, speakGerman } from '../lib/audio'
import { t } from '../lib/i18n'
import { matchCards, type MemoryCard } from '../lib/text'
import type { Bridge, Locale, Word } from '../lib/types'

interface Props {
  words: Word[]
  mode: 'open' | 'memory'
  bridge: Bridge
  locale: Locale
  sound: boolean
  voice: boolean
  onGrade: (wordId: string, errors: number, correct: boolean) => void
  onDone: () => void
}

export function MatchGame({ words, mode, bridge, locale, sound, voice, onGrade, onDone }: Props) {
  const cards = useMemo(() => matchCards(words, bridge), [words, bridge])
  const [picked, setPicked] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [bad, setBad] = useState(false)
  const slips = useRef<Record<string, number>>({})
  const seen = useRef<Record<string, { de: boolean; bridge: boolean }>>({})
  const lock = useRef(false)
  const timer = useRef(0)
  const done = useRef(false)
  const open = mode === 'open'

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const knew = (wordId: string) => {
    const item = seen.current[wordId]
    return !!item?.de && !!item?.bridge
  }

  const reveal = (card: MemoryCard) => {
    const item = seen.current[card.wordId] ?? { de: false, bridge: false }
    item[card.side] = true
    seen.current[card.wordId] = item
  }

  const tap = (card: MemoryCard) => {
    if (lock.current || matched.includes(card.wordId)) return
    if (picked.includes(card.key)) {
      setPicked((current) => current.filter((key) => key !== card.key))
      return
    }
    const next = [...picked, card.key]
    if (next.length < 2) {
      if (!open) reveal(card)
      setPicked(next)
      return
    }
    const first = cards.find((item) => item.key === next[0])
    if (!first) return
    const firstKnew = !open && knew(first.wordId)
    const secondKnew = !open && knew(card.wordId)
    if (!open) reveal(card)
    if (first.wordId === card.wordId && first.side !== card.side) {
      const errors = slips.current[card.wordId] ?? 0
      const nextMatched = [...matched, card.wordId]
      setMatched(nextMatched)
      setPicked([])
      playFeedback(true, sound)
      if (voice) speakGerman(card.speak, true)
      onGrade(card.wordId, errors, true)
      if (nextMatched.length === words.length && !done.current) {
        done.current = true
        timer.current = window.setTimeout(onDone, 420)
      }
      return
    }
    if (open || firstKnew) slips.current[first.wordId] = (slips.current[first.wordId] ?? 0) + 1
    if (open || secondKnew) slips.current[card.wordId] = (slips.current[card.wordId] ?? 0) + 1
    playFeedback(false, sound)
    lock.current = true
    setBad(true)
    setPicked(next)
    timer.current = window.setTimeout(() => {
      setPicked([])
      setBad(false)
      lock.current = false
    }, open ? 420 : 740)
  }

  const tag = bridge === 'es' ? 'ES' : 'EN'
  return (
    <div>
      <p className="kicker">{t(locale, open ? 'play.prompt.open' : 'play.prompt.memory')}</p>
      <div className="mem-grid" role="group">
        {cards.map((card) => {
          const up = open || picked.includes(card.key) || matched.includes(card.wordId)
          return (
            <button
              key={card.key}
              type="button"
              className="mem"
              data-face={open ? 'open' : 'hidden'}
              data-up={up}
              data-picked={picked.includes(card.key) && !matched.includes(card.wordId)}
              data-matched={matched.includes(card.wordId)}
              data-bad={bad && picked.includes(card.key)}
              aria-pressed={picked.includes(card.key) || matched.includes(card.wordId)}
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
    </div>
  )
}

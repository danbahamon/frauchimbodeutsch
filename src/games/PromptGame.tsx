import { useEffect, useMemo, useRef, useState } from 'react'
import { getCategory } from '../data/categories'
import { UmlautBar } from '../components/Bits'
import { Icon } from '../components/Icon'
import { playFeedback, speakGerman } from '../lib/audio'
import { t } from '../lib/i18n'
import { SHELF } from '../lib/progress'
import { deLabel, firstLetter, gloss, matchesDe, matchesGloss, puzzleAnswer, puzzleGoal, shuffle, type Task } from '../lib/text'
import type { Bridge, Locale } from '../lib/types'

interface Mark {
  leveled: boolean
  mastered: boolean
  level: number
}

interface Props {
  task: Task
  level: number
  bridge: Bridge
  locale: Locale
  sound: boolean
  voice: boolean
  onGrade: (wordId: string, errors: number, correct: boolean) => Mark
  onNext: () => void
}

export function PromptGame({ task, level, bridge, locale, sound, voice, onGrade, onNext }: Props) {
  const { word, direction, puzzle } = task
  const showGerman = direction === 'to-bridge'
  const [filled, setFilled] = useState<string[]>([])
  const [typed, setTyped] = useState('')
  const [hinted, setHinted] = useState('')
  const [shake, setShake] = useState(0)
  const [locked, setLocked] = useState(false)
  const [mark, setMark] = useState<Mark | null>(null)
  const [result, setResult] = useState<{ correct: boolean; errors: number } | null>(null)
  const errorsRef = useRef(0)
  const done = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bank = useMemo(() => shuffle(puzzle.pieces.map((piece) => piece.id)), [puzzle])
  const cat = getCategory(word.cat)

  const finish = (count: number, correct: boolean) => {
    if (done.current) return
    done.current = true
    setLocked(true)
    setResult({ correct, errors: count })
    setMark(onGrade(word.id, count, correct))
    playFeedback(correct, sound)
    if (voice && !showGerman) speakGerman(deLabel(word), true)
  }

  const miss = () => {
    const next = errorsRef.current + 1
    errorsRef.current = next
    setShake((value) => value + 1)
    if (next >= 3) finish(next, false)
    else playFeedback(false, sound)
  }

  const submitPuzzle = () => {
    if (done.current || filled.length !== puzzle.solution.length) return
    if (puzzleAnswer(puzzle, filled) === puzzleGoal(puzzle, word.de)) finish(errorsRef.current, true)
    else miss()
  }

  const submitTyped = () => {
    if (done.current || !typed.trim()) return
    const ok = direction === 'to-bridge'
      ? matchesGloss(word, bridge, typed)
      : matchesDe(word, typed, null, 'optional')
    if (ok) finish(errorsRef.current, true)
    else miss()
  }

  const hint = () => {
    if (done.current || hinted) return
    const next = errorsRef.current + 1
    errorsRef.current = next
    setHinted(firstLetter(word.de))
    setShake((value) => value + 1)
    if (next >= 3) finish(next, false)
  }

  useEffect(() => {
    if (voice && showGerman) speakGerman(deLabel(word), true)
    if (level === SHELF.recall) inputRef.current?.focus()
  }, [word, voice, showGerman, level])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (event.key === 'Enter') {
        if (done.current) onNext()
        else if (level === SHELF.scramble) submitPuzzle()
        return
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const instruction = level === SHELF.scramble
    ? 'play.prompt.scramble'
    : direction === 'to-bridge'
      ? 'play.prompt.recall.bridge'
      : 'play.prompt.recall.de'

  let cursor = 0
  const slots = puzzle.mode === 'words'
    ? [
        ...filled.map((id) => ({
          key: id,
          text: puzzle.pieces.find((piece) => piece.id === id)?.text ?? '',
          fixed: false,
          pieceId: id,
        })),
        ...Array.from({ length: Math.max(0, puzzle.solution.length - filled.length) }, (_, index) => ({
          key: `g${index}`,
          text: '',
          fixed: false,
          pieceId: null as string | null,
        })),
      ]
    : puzzle.slots.map((slot, index) => {
        if (slot.fixed) return { key: `f${index}`, text: slot.text, fixed: true, pieceId: null as string | null }
        const pieceId = filled[cursor] ?? null
        cursor += 1
        return {
          key: pieceId ?? `e${index}`,
          text: puzzle.pieces.find((piece) => piece.id === pieceId)?.text ?? '',
          fixed: false,
          pieceId,
        }
      })
  const used = new Set(filled)
  const clean = result?.correct && result.errors === 0

  return (
    <div
      className={shake ? 'prompt-game shake' : 'prompt-game'}
      onAnimationEnd={(event) => {
        if (event.animationName === 'shake') setShake(0)
      }}
    >
      <p className="kicker">{cat?.emoji} {t(locale, instruction)}</p>
      <div className="prompt-head">
        <h2 className="prompt">{showGerman ? deLabel(word) : gloss(word, bridge)}</h2>
        {showGerman || locked ? (
          <button type="button" className="icon-btn tiny" aria-label={t(locale, 'play.listen')} onClick={() => speakGerman(deLabel(word), true)}>
            <Icon name="volume" size={16} />
          </button>
        ) : null}
      </div>
      {level === SHELF.scramble ? (
        <>
          <div className="slots">
            {slots.map((slot) => (
              <button
                key={slot.key}
                type="button"
                className="slot"
                data-fixed={slot.fixed}
                disabled={locked || slot.fixed || !slot.pieceId}
                onClick={() => slot.pieceId && setFilled((current) => current.filter((id) => id !== slot.pieceId))}
              >
                {slot.text || '·'}
              </button>
            ))}
          </div>
          <div className="tiles">
            {bank.filter((id) => !used.has(id)).map((id) => {
              const piece = puzzle.pieces.find((item) => item.id === id)
              return (
                <button key={id} type="button" className="tile" disabled={locked} onClick={() => setFilled((current) => [...current, id])}>
                  {piece?.text}
                </button>
              )
            })}
          </div>
        </>
      ) : null}
      {level === SHELF.recall ? (
        <>
          <input
            ref={inputRef}
            className="write"
            value={typed}
            lang={direction === 'to-bridge' ? bridge : 'de'}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label={t(locale, instruction)}
            onChange={(event) => setTyped(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return
              event.preventDefault()
              event.stopPropagation()
              if (done.current) onNext()
              else submitTyped()
            }}
          />
          {!locked && direction === 'to-de' ? (
            <UmlautBar
              onInsert={(ch) => {
                setTyped((value) => value + ch)
                inputRef.current?.focus()
              }}
              tip={t(locale, 'play.umlaut.tip')}
            />
          ) : null}
        </>
      ) : null}
      {hinted && !locked ? (
        <>
          <p className="hint-line">{t(locale, 'play.starts', { letter: hinted })}</p>
          <p className="fine">{t(locale, 'play.hint.note')}</p>
        </>
      ) : null}
      {locked && result ? (
        <div className={clean ? 'verdict ok' : result.correct ? 'verdict helped' : 'verdict bad'} role="status">
          <b>{clean ? t(locale, 'play.yes') : result.correct ? t(locale, 'play.helped.verdict') : t(locale, 'play.no')}</b>
          <p>{deLabel(word)} · {gloss(word, bridge)}</p>
          {mark?.leveled ? <p>{t(locale, 'play.moved', { level: mark.level })}</p> : null}
          {mark?.mastered ? <p>{t(locale, 'play.mastered')}</p> : null}
        </div>
      ) : null}
      <div className="row">
        {level === SHELF.scramble && !locked ? (
          <>
            <button type="button" className="ghost" onClick={() => setFilled([])}>{t(locale, 'play.clear')}</button>
            <button type="button" className="ghost" title={t(locale, 'play.hint.note')} onClick={hint}>{t(locale, 'play.hint')}</button>
            <button type="button" className="primary" disabled={filled.length !== puzzle.solution.length} onClick={submitPuzzle}>{t(locale, 'play.check')}</button>
          </>
        ) : null}
        {level === SHELF.recall && !locked ? (
          <>
            <button type="button" className="ghost" title={t(locale, 'play.hint.note')} onClick={hint}>{t(locale, 'play.hint')}</button>
            <button type="button" className="ghost" onClick={() => finish(Math.max(errorsRef.current, 1), false)}>{t(locale, 'play.show')}</button>
            <button type="button" className="primary" disabled={!typed.trim()} onClick={submitTyped}>{t(locale, 'play.check')}</button>
          </>
        ) : null}
        {locked ? <button type="button" className="primary" data-ready="true" onClick={onNext}>{t(locale, 'play.next')}</button> : null}
      </div>
    </div>
  )
}

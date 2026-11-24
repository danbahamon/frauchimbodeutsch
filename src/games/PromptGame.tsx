import { useEffect, useMemo, useRef, useState } from 'react'
import { getCategory } from '../data/categories'
import { Icon } from '../components/Icon'
import { playFeedback, speakGerman } from '../lib/audio'
import { t } from '../lib/i18n'
import { deLabel, firstLetter, gloss, matchesDe, matchesGloss, puzzleAnswer, puzzleGoal, shuffle, type Task } from '../lib/text'
import type { Art, Bridge, Locale } from '../lib/types'

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
  const [article, setArticle] = useState<Art | null>(null)
  const [hinted, setHinted] = useState('')
  const [chosen, setChosen] = useState<string | null>(null)
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

  const pick = (id: string) => {
    if (done.current) return
    setChosen(id)
    finish(id === word.id ? 0 : 1, id === word.id)
  }

  const submitPuzzle = () => {
    if (done.current || filled.length !== puzzle.solution.length) return
    if (puzzleAnswer(puzzle, filled) === puzzleGoal(puzzle, word.de)) finish(errorsRef.current, true)
    else miss()
  }

  const submitTyped = () => {
    if (done.current || !typed.trim()) return
    const ok = level === 5 && direction === 'to-bridge'
      ? matchesGloss(word, bridge, typed)
      : matchesDe(word, typed, article, level === 4 && word.art ? 'required' : 'optional')
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
    if (level >= 4) inputRef.current?.focus()
  }, [word, voice, showGerman, level])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (event.key === 'Enter') {
        if (done.current) onNext()
        else if (level === 3) submitPuzzle()
        return
      }
      if (!done.current && level === 2 && /^[1-4]$/.test(event.key)) {
        const option = task.options[Number(event.key) - 1]
        if (option) pick(option.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const instruction = level === 3
    ? 'play.prompt.scramble'
    : level === 4
      ? 'play.prompt.spell'
      : level === 5
        ? (direction === 'to-bridge' ? 'play.prompt.recall.bridge' : 'play.prompt.recall.de')
        : (direction === 'to-bridge' ? 'play.prompt.bridge' : 'play.prompt.de')

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
      {level === 2 ? (
        <div className="stack">
          {task.options.map((option, index) => (
            <button
              key={option.id}
              type="button"
              className="choice"
              data-art={direction === 'to-de' ? option.art ?? '' : ''}
              data-ok={locked && option.id === word.id}
              data-bad={locked && chosen === option.id && option.id !== word.id}
              disabled={locked}
              onClick={() => pick(option.id)}
            >
              <small>{index + 1}</small>
              {direction === 'to-de' ? deLabel(option) : gloss(option, bridge)}
            </button>
          ))}
        </div>
      ) : null}
      {level === 3 ? (
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
      {level === 4 && word.art ? (
        <div>
          <p className="fine">{t(locale, 'play.article')}</p>
          <div className="art-row">
            {(['der', 'die', 'das'] as const).map((item) => (
              <button key={item} type="button" className="art-btn" data-art={item} data-on={article === item} disabled={locked} onClick={() => setArticle(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {level >= 4 ? (
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
      ) : null}
      {hinted && !locked ? <p className="hint-line">{t(locale, 'play.starts', { letter: hinted })}</p> : null}
      {locked && result ? (
        <div className={clean ? 'verdict ok' : 'verdict bad'} role="status">
          <b>{clean ? t(locale, 'play.yes') : t(locale, 'play.no')}</b>
          <p>{deLabel(word)} · {gloss(word, bridge)}</p>
          {mark?.leveled ? <p>{t(locale, 'play.moved', { level: mark.level })}</p> : null}
          {mark?.mastered ? <p>{t(locale, 'play.mastered')}</p> : null}
        </div>
      ) : null}
      <div className="row">
        {level === 3 && !locked ? (
          <>
            <button type="button" className="ghost" onClick={() => setFilled([])}>{t(locale, 'play.clear')}</button>
            <button type="button" className="ghost" onClick={hint}>{t(locale, 'play.hint')}</button>
            <button type="button" className="primary" disabled={filled.length !== puzzle.solution.length} onClick={submitPuzzle}>{t(locale, 'play.check')}</button>
          </>
        ) : null}
        {level >= 4 && !locked ? (
          <>
            <button type="button" className="ghost" onClick={hint}>{t(locale, 'play.hint')}</button>
            <button type="button" className="ghost" onClick={() => finish(Math.max(errorsRef.current, 1), false)}>{t(locale, 'play.show')}</button>
            <button type="button" className="primary" disabled={!typed.trim()} onClick={submitTyped}>{t(locale, 'play.check')}</button>
          </>
        ) : null}
        {locked ? <button type="button" className="primary" data-ready="true" onClick={onNext}>{t(locale, 'play.next')}</button> : null}
      </div>
    </div>
  )
}

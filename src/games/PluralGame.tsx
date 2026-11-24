import { useEffect, useMemo, useRef, useState } from 'react'
import { getCategory } from '../data/categories'
import { Icon } from '../components/Icon'
import { playFeedback, speakGerman } from '../lib/audio'
import { t } from '../lib/i18n'
import { SHELF } from '../lib/progress'
import { deLabel, firstLetter, gloss, matchesPlural, pluralChips } from '../lib/text'
import type { Bridge, Locale, Word } from '../lib/types'

interface Mark {
  leveled: boolean
  mastered: boolean
  level: number
}

export function PluralGame({
  word,
  level,
  bridge,
  locale,
  sound,
  voice,
  onGrade,
  onNext,
}: {
  word: Word
  level: number
  bridge: Bridge
  locale: Locale
  sound: boolean
  voice: boolean
  onGrade: (wordId: string, errors: number, correct: boolean) => Mark
  onNext: () => void
}) {
  const write = level === SHELF.endings
  const noun = word.kind === 'noun'
  const chips = useMemo(() => (write ? [] : pluralChips(word)), [word, write])
  const [chosen, setChosen] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [hinted, setHinted] = useState('')
  const [shake, setShake] = useState(0)
  const [mark, setMark] = useState<Mark | null>(null)
  const [errors, setErrors] = useState(0)
  const [correct, setCorrect] = useState(false)
  const done = useRef(false)
  const errorsRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const cat = getCategory(word.cat)
  const spoken = noun && word.pl ? `die ${word.pl}` : deLabel(word)
  const prompt = !noun
    ? (write ? 'play.prompt.spell' : 'play.prompt.de')
    : word.pl
      ? (write ? 'play.prompt.plural.write' : 'play.prompt.plural')
      : (write ? 'play.prompt.plural.same' : 'play.prompt.plural')

  const finish = (count: number, ok: boolean) => {
    if (done.current) return
    done.current = true
    setErrors(count)
    setCorrect(ok)
    setMark(onGrade(word.id, count, ok))
    playFeedback(ok, sound)
    if (voice) speakGerman(spoken, true)
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

  const submit = () => {
    if (done.current || !typed.trim()) return
    if (matchesPlural(word, typed)) finish(errorsRef.current, true)
    else miss()
  }

  const hint = () => {
    if (done.current || hinted) return
    const next = errorsRef.current + 1
    errorsRef.current = next
    setHinted(firstLetter(word.pl && noun ? word.pl : word.de))
    setShake((value) => value + 1)
    if (next >= 3) finish(next, false)
  }

  useEffect(() => {
    if (write) inputRef.current?.focus()
  }, [word, write])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return
      if (event.key === 'Enter' && done.current) onNext()
      if (!done.current && !write && /^[1-4]$/.test(event.key)) {
        const chip = chips[Number(event.key) - 1]
        if (chip) pick(chip.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const clean = correct && errors === 0
  const showGerman = !noun && !write

  return (
    <div
      className={shake ? 'prompt-game shake' : 'prompt-game'}
      onAnimationEnd={(event) => {
        if (event.animationName === 'shake') setShake(0)
      }}
    >
      <p className="kicker">{cat?.emoji} {t(locale, prompt)}</p>
      <div className="prompt-head">
        <h2 className="prompt">{showGerman ? gloss(word, bridge) : deLabel(word)}</h2>
        {noun || done.current ? (
          <button type="button" className="icon-btn tiny" aria-label={t(locale, 'play.listen')} onClick={() => speakGerman(done.current ? spoken : deLabel(word), true)}>
            <Icon name="volume" size={16} />
          </button>
        ) : null}
      </div>
      {noun ? <p className="muted">{gloss(word, bridge)}</p> : null}
      {write ? (
        <input
          ref={inputRef}
          className="write"
          value={typed}
          lang="de"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label={t(locale, prompt)}
          onChange={(event) => setTyped(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return
            event.preventDefault()
            event.stopPropagation()
            if (done.current) onNext()
            else submit()
          }}
        />
      ) : (
        <div className="stack">
          {chips.map((chip, index) => (
            <button
              key={chip.id}
              type="button"
              className="choice"
              data-ok={chosen !== null && chip.id === word.id}
              data-bad={chosen === chip.id && chip.id !== word.id}
              disabled={chosen !== null}
              onClick={() => pick(chip.id)}
            >
              <small>{index + 1}</small>
              {chip.label || t(locale, 'play.noplural')}
            </button>
          ))}
        </div>
      )}
      {hinted && !done.current ? <p className="hint-line">{t(locale, 'play.starts', { letter: hinted })}</p> : null}
      {done.current ? (
        <div className={clean ? 'verdict ok' : 'verdict bad'} role="status">
          <b>{clean ? t(locale, 'play.yes') : t(locale, 'play.no')}</b>
          <p>{spoken} · {gloss(word, bridge)}</p>
          {mark?.leveled ? <p>{t(locale, 'play.moved', { level: mark.level })}</p> : null}
          {mark?.mastered ? <p>{t(locale, 'play.mastered')}</p> : null}
        </div>
      ) : null}
      <div className="row">
        {write && !done.current ? (
          <>
            <button type="button" className="ghost" onClick={hint}>{t(locale, 'play.hint')}</button>
            <button type="button" className="ghost" onClick={() => finish(Math.max(errorsRef.current, 1), false)}>{t(locale, 'play.show')}</button>
            <button type="button" className="primary" disabled={!typed.trim()} onClick={submit}>{t(locale, 'play.check')}</button>
          </>
        ) : null}
        {done.current ? <button type="button" className="primary" data-ready="true" onClick={onNext}>{t(locale, 'play.next')}</button> : null}
      </div>
    </div>
  )
}

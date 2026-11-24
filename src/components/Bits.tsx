import type { CSSProperties } from 'react'
import { speakGerman } from '../lib/audio'
import { MAX_LEVEL } from '../lib/progress'
import { deLabel } from '../lib/text'
import type { Word, WordStat } from '../lib/types'
import { Icon } from './Icon'

export function Lemma({ word }: { word: Word }) {
  return (
    <span className="lemma">
      {word.art ? <em data-art={word.art}>{word.art}</em> : null}
      <b>{word.de}</b>
    </span>
  )
}

export function Pips({ stat }: { stat: WordStat }) {
  return (
    <span className="pips" aria-hidden="true">
      {Array.from({ length: MAX_LEVEL }, (_, index) => (
        <i key={index} className={index < stat.level ? 'pip on' : 'pip'} />
      ))}
      {stat.mastered ? (
        <b>★</b>
      ) : (
        <span className="clean-pips">
          {Array.from({ length: 3 }, (_, index) => (
            <i key={index} data-on={index < stat.clean} />
          ))}
        </span>
      )}
    </span>
  )
}

export function SpeakButton({ text, label }: { text: string; label: string }) {
  return (
    <button type="button" className="icon-btn tiny" aria-label={label} onClick={() => speakGerman(text, true)}>
      <Icon name="volume" size={16} />
    </button>
  )
}

export function GenderKey({ label }: { label: string }) {
  return (
    <p className="gender-key">
      <i data-art="der">der</i>
      <i data-art="die">die</i>
      <i data-art="das">das</i>
      <span>{label}</span>
    </p>
  )
}

export function Spiral() {
  return (
    <svg className="spiral" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 34c0-7 7-10 10-4 4 8-5 16-13 13-10-3-11-16-2-21 11-7 24 1 24 13 0 16-16 27-32 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Burst() {
  return (
    <span className="burst" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <i key={index} style={{ '--i': index } as CSSProperties} />
      ))}
    </span>
  )
}

export function deOf(word: Word) {
  return deLabel(word)
}

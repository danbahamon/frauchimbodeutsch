import { useState } from 'react'
import { Mascot } from '../components/Mascot'
import { t } from '../lib/i18n'
import { roundRoute } from '../lib/launch'
import { assignLevel, countReached, countSitting, isUnlocked, UNLOCK_AT } from '../lib/progress'
import { useStore } from '../state'

export function Play() {
  const { locale, data, setRoute, flash } = useStore()
  const assigned = assignLevel(data.words)
  const [level, setLevel] = useState(assigned)
  const open = isUnlocked(data.words, level)

  const begin = () => {
    if (!open) {
      flash(t(locale, 'home.next', { level, need: UNLOCK_AT, have: countReached(data.words, level) }))
      return
    }
    const next = roundRoute(data.words, level, 'shelf', { title: t(locale, `level.${level}.name`) })
    if (!next) flash(t(locale, 'play.empty'))
    else setRoute(next)
  }

  return (
    <div>
      <div className="page-head">
        <Mascot mood="think" size={72} />
        <div>
          <p className="kicker">{t(locale, 'play.title')}</p>
          <h1>{t(locale, `level.${level}.name`)}</h1>
        </div>
      </div>
      <p className="muted">{t(locale, 'play.lead')}</p>
      <div className="shelves">
        {[1, 2, 3, 4, 5].map((item) => {
          const unlocked = isUnlocked(data.words, item)
          return (
            <button
              key={item}
              type="button"
              className="shelf"
              data-open={unlocked}
              data-on={item === level}
              data-today={item === assigned}
              onClick={() => {
                if (!unlocked) {
                  flash(t(locale, 'home.next', { level: item, need: UNLOCK_AT, have: countReached(data.words, item) }))
                  return
                }
                setLevel(item)
              }}
            >
              {item === assigned ? <small>{t(locale, 'shelf.today')}</small> : <small>{t(locale, 'common.level', { n: item })}</small>}
              <b>{t(locale, `level.${item}.name`)}</b>
              <span>{unlocked ? t(locale, 'shelf.waiting', { n: countSitting(data.words, item) }) : `${countReached(data.words, item)}/${UNLOCK_AT}`}</span>
            </button>
          )
        })}
      </div>
      <p>{t(locale, `level.${level}.blurb`)}</p>
      <button type="button" className="primary wide" disabled={!open} onClick={begin}>{t(locale, 'play.begin')}</button>
    </div>
  )
}

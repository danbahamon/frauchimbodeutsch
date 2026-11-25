import { useState } from 'react'
import { Mascot } from '../components/Mascot'
import { t } from '../lib/i18n'
import type { Bridge, Locale } from '../lib/types'
import { useStore } from '../state'

const LOCALES: Locale[] = ['en', 'es', 'de']

export function Onboarding() {
  const { setProfile } = useStore()
  const [step, setStep] = useState(0)
  const [lang, setLang] = useState<Locale>('en')
  const [name, setName] = useState('')
  const [bridge, setBridge] = useState<Bridge>('en')
  const trimmed = name.trim()

  const finish = () => {
    if (!trimmed) return
    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setProfile({
      name: trimmed.slice(0, 40),
      locale: lang,
      bridge,
      sound: true,
      voice: true,
      motion: !quiet,
      theme: 'day',
      createdAt: Date.now(),
    })
  }

  return (
    <section className="solo-card">
      <div className="on-hero">
        <Mascot mood={step === 2 ? 'joy' : 'idle'} size={92} />
        <div>
          <p className="kicker">{t(lang, 'on.kicker')}</p>
          <div className="dots" aria-hidden="true">
            {LOCALES.map((_, index) => <i key={index} data-on={index <= step} />)}
          </div>
        </div>
      </div>
      {step === 0 ? (
        <>
          <h1>{t(lang, 'on.lang')}</h1>
          <p className="muted">{t(lang, 'on.lang.sub')}</p>
          <div className="stack">
            {LOCALES.map((code) => (
              <button key={code} type="button" className="choice" data-on={lang === code} onClick={() => setLang(code)}>
                {t(lang, `lang.${code}`)}
              </button>
            ))}
          </div>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <h1>{t(lang, 'on.name')}</h1>
          <input
            className="write"
            value={name}
            maxLength={40}
            autoFocus
            placeholder={t(lang, 'on.name.ph')}
            aria-label={t(lang, 'on.name')}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && trimmed) {
                setBridge(lang === 'es' ? 'es' : 'en')
                setStep(2)
              }
            }}
          />
        </>
      ) : null}
      {step === 2 ? (
        <>
          <h1>{t(lang, 'on.bridge')}</h1>
          <p className="muted">{t(lang, 'on.bridge.sub')}</p>
          <div className="stack">
            {(['en', 'es'] as const).map((code) => (
              <button key={code} type="button" className="choice" data-on={bridge === code} onClick={() => setBridge(code)}>
                {t(lang, `bridge.${code}`)}
              </button>
            ))}
          </div>
        </>
      ) : null}
      <div className="row" style={{ marginTop: 18 }}>
        {step > 0 ? (
          <button type="button" className="ghost" onClick={() => setStep((value) => value - 1)}>{t(lang, 'on.back')}</button>
        ) : null}
        {step < 2 ? (
          <button
            type="button"
            className="primary"
            disabled={step === 1 && !trimmed}
            onClick={() => {
              if (step === 1) setBridge(lang === 'es' ? 'es' : 'en')
              setStep((value) => value + 1)
            }}
          >
            {t(lang, 'on.next')}
          </button>
        ) : (
          <button type="button" className="primary" onClick={finish}>{t(lang, 'on.start')}</button>
        )}
      </div>
    </section>
  )
}

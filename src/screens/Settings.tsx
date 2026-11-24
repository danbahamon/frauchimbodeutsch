import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { t } from '../lib/i18n'
import { downloadBackup, normalize } from '../lib/storage'
import type { Bridge, Locale, Theme } from '../lib/types'
import { useStore } from '../state'

export function Settings({ onClose }: { onClose: () => void }) {
  const { locale, data, patchProfile, replaceAll, resetProgress, flash } = useStore()
  const profile = data.profile
  const fileRef = useRef<HTMLInputElement>(null)
  const [confirm, setConfirm] = useState(false)
  const [name, setName] = useState(profile?.name ?? '')
  useEffect(() => setName(profile?.name ?? ''), [profile?.name])
  if (!profile) return null

  const importFile = async (file: File) => {
    try {
      const parsed: unknown = JSON.parse(await file.text())
      const next = normalize(parsed)
      if (!next?.profile) {
        flash(t(locale, 'set.import.bad'))
        return
      }
      replaceAll(next)
      flash(t(locale, 'set.import.ok'))
      onClose()
    } catch {
      flash(t(locale, 'set.import.bad'))
    }
  }

  return (
    <div>
      <button type="button" className="settings-back" onClick={onClose}>
        <Icon name="back" /> {t(locale, 'set.back')}
      </button>
      <p className="kicker">{t(locale, 'set.title')}</p>
      <h2>{t(locale, 'set.learner')}</h2>
      <p className="muted">{t(locale, 'set.lead')}</p>
      <label className="field">
        <span>{t(locale, 'set.name')}</span>
        <input
          value={name}
          maxLength={40}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => {
            const next = name.trim().slice(0, 40)
            if (next) patchProfile({ name: next })
            else setName(profile.name)
          }}
        />
      </label>
      <p className="fine">{t(locale, 'set.language')}</p>
      <div className="segment">
        {(['en', 'es', 'de'] as const satisfies readonly Locale[]).map((code) => (
          <button key={code} type="button" data-on={profile.locale === code} onClick={() => patchProfile({ locale: code })}>
            {t(locale, `lang.${code}`)}
          </button>
        ))}
      </div>
      <p className="fine">{t(locale, 'set.bridge')}</p>
      <p className="fine">{t(locale, 'set.bridge.sub')}</p>
      <div className="segment">
        {(['en', 'es'] as const satisfies readonly Bridge[]).map((code) => (
          <button key={code} type="button" data-on={profile.bridge === code} onClick={() => patchProfile({ bridge: code })}>
            {t(locale, `bridge.${code}`)}
          </button>
        ))}
      </div>
      <div className="stack" style={{ marginTop: 16 }}>
        <Toggle on={profile.sound} label={t(locale, 'set.sound')} sub={t(locale, 'set.sound.sub')} onChange={(sound) => patchProfile({ sound })} />
        <Toggle on={profile.voice} label={t(locale, 'set.voice')} sub={t(locale, 'set.voice.sub')} onChange={(voice) => patchProfile({ voice })} />
        <Toggle on={profile.motion} label={t(locale, 'set.motion')} sub={t(locale, 'set.motion.sub')} onChange={(motion) => patchProfile({ motion })} />
      </div>
      <p className="fine">{t(locale, 'set.theme')}</p>
      <div className="segment">
        {(['day', 'dusk'] as const satisfies readonly Theme[]).map((theme) => (
          <button key={theme} type="button" data-on={profile.theme === theme} onClick={() => patchProfile({ theme })}>
            {t(locale, theme === 'day' ? 'set.day' : 'set.dusk')}
          </button>
        ))}
      </div>
      <h2 style={{ marginTop: 22 }}>{t(locale, 'set.data')}</h2>
      <div className="stack">
        <button type="button" className="action" onClick={() => downloadBackup(data)}>
          <span className="well teal"><Icon name="download" size={20} /></span>
          <span><b>{t(locale, 'set.export')}</b><span>{t(locale, 'set.export.sub')}</span></span>
        </button>
        <button type="button" className="action" onClick={() => fileRef.current?.click()}>
          <span className="well gold"><Icon name="upload" size={20} /></span>
          <span><b>{t(locale, 'set.import')}</b><span>{t(locale, 'set.import.sub')}</span></span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) void importFile(file)
          }}
        />
        {confirm ? (
          <div className="panel">
            <p>{t(locale, 'set.reset.confirm')}</p>
            <div className="row">
              <button type="button" className="ghost danger" onClick={() => { resetProgress(); setConfirm(false); onClose() }}>{t(locale, 'set.reset')}</button>
              <button type="button" className="text-btn" onClick={() => setConfirm(false)}>{t(locale, 'cancel')}</button>
            </div>
          </div>
        ) : (
          <button type="button" className="action" onClick={() => setConfirm(true)}>
            <span className="well coral"><Icon name="trash" size={20} /></span>
            <span><b>{t(locale, 'set.reset')}</b><span>{t(locale, 'set.reset.sub')}</span></span>
          </button>
        )}
      </div>
    </div>
  )
}

function Toggle({ on, label, sub, onChange }: { on: boolean; label: string; sub: string; onChange: (next: boolean) => void }) {
  return (
    <button type="button" className="setting" onClick={() => onChange(!on)} aria-pressed={on}>
      <span><b>{label}</b><small>{sub}</small></span>
      <span className="switch" data-on={on}><i /></span>
    </button>
  )
}

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { t } from '../lib/i18n'
import { shareLink } from '../lib/share'
import { useStore } from '../state'

export function ShareModal() {
  const { share, closeShare, locale, flash, data } = useStore()
  const [link, setLink] = useState('')
  const [qr, setQr] = useState('')
  useEffect(() => {
    if (!share) return
    const next = shareLink(share.title, share.words)
    setLink(next)
    setQr('')
    let live = true
    const dusk = data.profile?.theme === 'dusk'
    void import('qrcode').then((mod) =>
      mod.toDataURL(next, {
        margin: 1,
        width: 360,
        color: { dark: dusk ? '#f6efe6' : '#1c1712', light: dusk ? '#221c17' : '#fffaf3' },
      }),
    ).then((src) => {
      if (live) setQr(src)
    })
    return () => {
      live = false
    }
  }, [share, data.profile?.theme])
  if (!share) return null
  const local = link.includes('localhost') || link.includes('127.0.0.1')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      flash(t(locale, 'share.copied'))
    } catch {
      flash(t(locale, 'share.copyfail'))
    }
  }
  const native = async () => {
    if (!navigator.share) return
    try {
      await navigator.share({ title: share.title, url: link })
    } catch {
      /* dismissed */
    }
  }
  return createPortal(
    <div className="modal-back" onClick={closeShare}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <p className="kicker">{t(locale, 'share.title')}</p>
        <h2>{share.title}</h2>
        <p className="muted">{t(locale, 'share.note')}</p>
        {qr ? <img className="qr" src={qr} alt="" /> : <div className="qr qr-wait" />}
        <p className="fine link-line">{link}</p>
        {local ? <p className="fine">{t(locale, 'share.lan')}</p> : null}
        <div className="row">
          <button type="button" className="primary" onClick={() => void copy()}>{t(locale, 'share.copy')}</button>
          {typeof navigator.share === 'function' ? (
            <button type="button" className="ghost" onClick={() => void native()}>{t(locale, 'share.native')}</button>
          ) : null}
          <button type="button" className="text-btn" onClick={closeShare}>{t(locale, 'share.close')}</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

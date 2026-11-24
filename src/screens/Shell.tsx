import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon, type IconName } from '../components/Icon'
import { Mascot } from '../components/Mascot'
import { t } from '../lib/i18n'
import type { Route } from '../lib/types'
import { useStore } from '../state'
import { Class } from './Class'
import { Home } from './Home'
import { Play } from './Play'
import { Round } from './Round'
import { Settings } from './Settings'
import { Stats } from './Stats'
import { Words } from './Words'

const NAV: { name: 'home' | 'play' | 'words' | 'class' | 'stats'; key: string; icon: IconName }[] = [
  { name: 'home', key: 'nav.home', icon: 'home' },
  { name: 'play', key: 'nav.play', icon: 'play' },
  { name: 'words', key: 'nav.words', icon: 'words' },
  { name: 'class', key: 'nav.class', icon: 'class' },
  { name: 'stats', key: 'nav.stats', icon: 'stats' },
]

function tabOf(route: Route) {
  if (route.name === 'play' || route.name === 'round') return 'play'
  if (route.name === 'words' || route.name === 'category') return 'words'
  if (route.name === 'class' || route.name === 'shared') return 'class'
  if (route.name === 'stats') return 'stats'
  return 'home'
}

function screenKey(route: Route) {
  if (route.name === 'round') return `round-${route.nonce}`
  if (route.name === 'category') return `cat-${route.cat}`
  if (route.name === 'shared') return `shared-${route.title}-${route.words.length}`
  return route.name
}

export function Shell() {
  const { locale, data, setRoute, patchProfile } = useStore()
  const route = data.route
  const tab = tabOf(route)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const dusk = data.profile?.theme === 'dusk'
  const go = (name: 'home' | 'play' | 'words' | 'class' | 'stats') => {
    setSettingsOpen(false)
    setRoute({ name })
  }

  return (
    <>
      <aside className="rail">
        <button type="button" className="brand" onClick={() => go('home')}>
          <Mascot size={54} />
          <span>
            <strong>Frau <em>Chimbo</em></strong>
            <small>{t(locale, 'app.tagline')}</small>
          </span>
        </button>
        <nav className="rail-nav">
          {NAV.map((item) => (
            <button key={item.name} type="button" className="nav-btn" data-on={tab === item.name} aria-current={tab === item.name ? 'page' : undefined} onClick={() => go(item.name)}>
              <Icon name={item.icon} />
              <span>{t(locale, item.key)}</span>
            </button>
          ))}
        </nav>
        <div className="rail-spacer" />
        <button type="button" className="nav-btn" data-on={settingsOpen} onClick={() => setSettingsOpen(true)}>
          <Icon name="gear" />
          <span>{t(locale, 'nav.settings')}</span>
        </button>
      </aside>
      <main className="stage">
        <div className="sheet">
          <header className="topbar">
            <button type="button" className="brand" onClick={() => go('home')}>
              <Mascot size={42} />
              <span>
                <strong>Frau <em>Chimbo</em></strong>
                <small>{data.profile?.name}</small>
              </span>
            </button>
            <div className="top-actions">
              <button
                type="button"
                className="icon-btn"
                aria-label={t(locale, 'set.theme')}
                onClick={() => patchProfile({ theme: dusk ? 'day' : 'dusk' })}
              >
                <Icon name={dusk ? 'sun' : 'moon'} />
              </button>
              <button type="button" className="icon-btn" aria-label={t(locale, 'nav.settings')} onClick={() => setSettingsOpen(true)}>
                <Icon name="gear" />
              </button>
            </div>
          </header>
          <div className="rise" key={screenKey(route)}>
            {route.name === 'home' ? <Home /> : null}
            {route.name === 'play' ? <Play /> : null}
            {route.name === 'words' || route.name === 'category' ? <Words /> : null}
            {route.name === 'class' || route.name === 'shared' ? <Class /> : null}
            {route.name === 'stats' ? <Stats /> : null}
            {route.name === 'round' ? <Round key={route.nonce} /> : null}
          </div>
        </div>
      </main>
      <nav className="dock">
        {NAV.map((item) => (
          <button key={item.name} type="button" className="nav-btn" data-on={tab === item.name} aria-current={tab === item.name ? 'page' : undefined} onClick={() => go(item.name)}>
            <Icon name={item.icon} />
            <span>{t(locale, item.key)}</span>
          </button>
        ))}
      </nav>
      {settingsOpen ? createPortal(
        <div className="modal-back" onClick={() => setSettingsOpen(false)}>
          <div className="modal settings-panel" onClick={(event) => event.stopPropagation()}>
            <Settings onClose={() => setSettingsOpen(false)} />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  )
}

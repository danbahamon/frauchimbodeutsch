import { createPortal } from 'react-dom'
import { ShareModal } from './components/ShareModal'
import { t } from './lib/i18n'
import { Onboarding } from './screens/Onboarding'
import { Shell } from './screens/Shell'
import { Provider, useStore } from './state'

function Frame() {
  const { data, notice, locale } = useStore()
  const message = notice === 'link' ? t(locale, 'share.bad') : notice
  return (
    <div className={data.profile ? 'app studio' : 'app solo'}>
      {data.profile ? <Shell /> : <Onboarding />}
      <ShareModal />
      {message ? createPortal(<p className="toast" role="status">{message}</p>, document.body) : null}
    </div>
  )
}

export function App() {
  return (
    <Provider>
      <Frame />
    </Provider>
  )
}

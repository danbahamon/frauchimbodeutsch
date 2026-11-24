export type IconName =
  | 'home'
  | 'play'
  | 'words'
  | 'class'
  | 'stats'
  | 'gear'
  | 'back'
  | 'forward'
  | 'sun'
  | 'moon'
  | 'volume'
  | 'motion'
  | 'download'
  | 'upload'
  | 'trash'
  | 'check'
  | 'share'
  | 'user'
  | 'globe'
  | 'search'

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {name === 'home' ? <path {...common} d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" /> : null}
      {name === 'play' ? <path {...common} d="M8 6.5v11l10-5.5z" /> : null}
      {name === 'words' ? <path {...common} d="M5 5.5h9a4 4 0 0 1 4 4V19H8.5A3.5 3.5 0 0 1 5 15.5zM5 15.5h13" /> : null}
      {name === 'class' ? <path {...common} d="M8 4h8v3a4 4 0 0 1-8 0zM7 7H5.5v12h13V7H17M9 14l2 2 4-4" /> : null}
      {name === 'stats' ? <path {...common} d="M5 19V10M12 19V5M19 19v-7" /> : null}
      {name === 'gear' ? (
        <>
          <circle {...common} cx="12" cy="12" r="2.6" />
          <path {...common} d="M9.6 3.4h4.8l.5 2.1a6 6 0 0 1 1.8 1l2-1.1 2.4 2.4-1.1 2a6 6 0 0 1 1 1.8l2.1.5v4.8l-2.1.5a6 6 0 0 1-1 1.8l1.1 2-2.4 2.4-2-1.1a6 6 0 0 1-1.8 1l-.5 2.1H9.6l-.5-2.1a6 6 0 0 1-1.8-1l-2 1.1-2.4-2.4 1.1-2a6 6 0 0 1-1-1.8l-2.1-.5V9.6l2.1-.5a6 6 0 0 1 1-1.8l-1.1-2 2.4-2.4 2 1.1a6 6 0 0 1 1.8-1l.5-2.1z" />
        </>
      ) : null}
      {name === 'back' ? <path {...common} d="M15 5 8 12l7 7" /> : null}
      {name === 'forward' ? <path {...common} d="M9 5l7 7-7 7" /> : null}
      {name === 'check' ? <path {...common} d="M5 12.5 10 17.5 19 7" /> : null}
      {name === 'share' ? <path {...common} d="M12 4v10M8 8l4-4 4 4M6 13.5V19h12v-5.5" /> : null}
      {name === 'search' ? (
        <>
          <circle {...common} cx="11" cy="11" r="6" />
          <path {...common} d="m16 16 3.5 3.5" />
        </>
      ) : null}
      {name === 'user' ? (
        <>
          <circle {...common} cx="12" cy="8" r="3.2" />
          <path {...common} d="M5.2 19.2a6.8 6.8 0 0 1 13.6 0" />
        </>
      ) : null}
      {name === 'globe' ? (
        <>
          <circle {...common} cx="12" cy="12" r="8" />
          <path {...common} d="M4 12h16M12 4c2.2 2.2 3.4 5 3.4 8s-1.2 5.8-3.4 8c-2.2-2.2-3.4-5-3.4-8s1.2-5.8 3.4-8z" />
        </>
      ) : null}
      {name === 'volume' ? <path {...common} d="M4.5 9.5h3L11 6v12l-3.5-3.5h-3zM15 9a4 4 0 0 1 0 6" /> : null}
      {name === 'motion' ? <path {...common} d="M4 8c2.5 2.5 4.5 2.5 7 0s4.5-2.5 7 0M4 16c2.5-2.5 4.5-2.5 7 0s4.5 2.5 7 0" /> : null}
      {name === 'sun' ? (
        <>
          <circle {...common} cx="12" cy="12" r="3.4" />
          <path {...common} d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
        </>
      ) : null}
      {name === 'moon' ? <path {...common} d="M15.5 14.5A6 6 0 0 1 9.2 5.2 6.4 6.4 0 1 0 15.5 14.5z" /> : null}
      {name === 'download' ? <path {...common} d="M12 4v10M8 10.5 12 14.5l4-4M5 19h14" /> : null}
      {name === 'upload' ? <path {...common} d="M12 15V5M8 8.5 12 4.5l4 4M5 19h14" /> : null}
      {name === 'trash' ? <path {...common} d="M5 7.5h14M9.5 7.5V5h5v2.5M7.5 7.5l.7 12h7.6l.7-12" /> : null}
    </svg>
  )
}

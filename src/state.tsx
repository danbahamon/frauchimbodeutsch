import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { applyStat, readStat } from './lib/progress'
import { decodeSet } from './lib/share'
import { loadState, saveState, type Persisted } from './lib/storage'
import type { Bridge, ClassSet, Locale, Profile, Route, SessionRec, TargetWord } from './lib/types'

interface ShareJob {
  title: string
  words: TargetWord[]
}

interface Solved {
  leveled: boolean
  mastered: boolean
  level: number
}

interface Store {
  data: Persisted
  locale: Locale
  bridge: Bridge
  notice: string | null
  share: ShareJob | null
  setRoute: (route: Route) => void
  setProfile: (profile: Profile) => void
  patchProfile: (patch: Partial<Profile>) => void
  recordWord: (wordId: string, gameLevel: number, errors: number, correct: boolean) => Solved
  logSession: (session: SessionRec) => void
  saveSet: (set: ClassSet) => void
  deleteSet: (id: string) => void
  replaceAll: (next: Persisted) => void
  resetProgress: () => void
  flash: (message: string) => void
  openShare: (title: string, words: TargetWord[]) => void
  closeShare: () => void
}

const Ctx = createContext<Store | null>(null)

export function Provider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Persisted>(() => loadState())
  const [notice, setNotice] = useState<string | null>(null)
  const [share, setShare] = useState<ShareJob | null>(null)
  const timer = useRef(0)

  useEffect(() => {
    const route = data.route.name === 'round' ? { name: 'play' as const } : data.route
    saveState({ ...data, route })
  }, [data])

  useEffect(() => {
    const profile = data.profile
    document.documentElement.lang = profile?.locale ?? 'en'
    document.documentElement.dataset.theme = profile?.theme ?? 'day'
    document.documentElement.dataset.motion = profile?.motion === false ? 'off' : 'on'
    const color = profile?.theme === 'dusk' ? '#14110e' : '#f3eadf'
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = color
    })
  }, [data.profile])

  useEffect(() => {
    const read = () => {
      if (!location.hash.startsWith('#c=')) return
      let payload = location.hash.slice(3)
      try {
        payload = decodeURIComponent(payload)
      } catch {
        /* the browser already decoded the hash */
      }
      const parsed = decodeSet(payload)
      if (!parsed) {
        setNotice('link')
        window.setTimeout(() => setNotice((current) => (current === 'link' ? null : current)), 2800)
        return
      }
      setData((current) => ({ ...current, route: { name: 'shared', title: parsed.title, words: parsed.words } }))
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [])

  const api = useMemo<Store>(() => {
    const locale = data.profile?.locale ?? 'en'
    const bridge = data.profile?.bridge ?? (locale === 'es' ? 'es' : 'en')
    return {
      data,
      locale,
      bridge,
      notice,
      share,
      setRoute: (route) => {
        setData((current) => ({ ...current, route }))
        if (route.name !== 'shared' && location.hash.startsWith('#c=')) {
          history.replaceState(null, '', location.pathname + location.search)
        }
      },
      setProfile: (profile) => setData((current) => ({ ...current, profile })),
      patchProfile: (patch) =>
        setData((current) => ({
          ...current,
          profile: current.profile ? { ...current.profile, ...patch } : current.profile,
        })),
      recordWord: (wordId, gameLevel, errors, correct) => {
        let result: Solved = { leveled: false, mastered: false, level: 1 }
        setData((current) => {
          const applied = applyStat({ stat: readStat(current.words, wordId), gameLevel, errors, correct })
          result = { leveled: applied.leveled, mastered: applied.masteredNow, level: applied.stat.level }
          return { ...current, words: { ...current.words, [wordId]: applied.stat } }
        })
        return result
      },
      logSession: (session) =>
        setData((current) => ({ ...current, sessions: [...current.sessions, session].slice(-300) })),
      saveSet: (set) =>
        setData((current) => ({
          ...current,
          sets: [...current.sets.filter((item) => item.id !== set.id), set].slice(-40),
        })),
      deleteSet: (id) => setData((current) => ({ ...current, sets: current.sets.filter((item) => item.id !== id) })),
      replaceAll: (next) => setData(next),
      resetProgress: () => setData((current) => ({ ...current, words: {}, sessions: [], route: { name: 'home' } })),
      flash: (message) => {
        setNotice(message)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setNotice((current) => (current === message ? null : current)), 2800)
      },
      openShare: (title, words) => setShare({ title, words }),
      closeShare: () => setShare(null),
    }
  }, [data, notice, share])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useStore() {
  const store = useContext(Ctx)
  if (!store) throw new Error('store')
  return store
}

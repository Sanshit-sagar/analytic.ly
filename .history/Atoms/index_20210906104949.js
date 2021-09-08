import { atom } from 'jotai'

export const fetchResultAtom = atom({ loading: true, error: null, data: null })
export const runFetchAtom = atom(
  (get) => get(fetchResultAtom),
  (_get, set, url) => {
    const fetchData = async () => {
      set(fetchResultAtom, (prev) => ({ ...prev, loading: true }))
      try {
        const response = await fetch(url)
        const data = await response.json()
        set(fetchResultAtom, { loading: false, error: null, data })
      } catch (error) {
        set(fetchResultAtom, { loading: false, error, data: null })
      }
    }
    fetchData()
  }
)
runFetchAtom.onMount = (runFetch) => {
  runFetch('https://json.host.com')
}
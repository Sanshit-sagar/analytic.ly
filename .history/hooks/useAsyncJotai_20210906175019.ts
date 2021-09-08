import { useState, useEffect } from 'react'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const fetchResultAtom = atom({ loading: true, error: null, data: null })
const runFetchAtom = atom(
  (get) => get(fetchResultAtom),
  (_get, set, url: string) => {
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

// runFetchAtom.onMount = (runFetch) => {
    // runFetch('/api/urchins/user/sanshit.sagar@gmail.com')
// }

const useAsyncJotai = (url: string) => {
    const [lastFetchedAt, setLastFetchedAt]=useState<string | undefined>(undefined)

    const fetchRequest = useUpdateAtom(runFetchAtom)
    const fetchResult = useAtomValue(fetchResultAtom)

    useEffect(() => {
        fetchRequest(url)
    }, []); 

    return {lastFetchedAt, ...fetchResult}
}
import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Text } from '../../../primitives/Text'

const fetchResultAtom = atom({ loading: true, error: null, data: null })
const runFetchAtom = atom(
  (get) => setTimeout(() => get(fetchResultAtom), 2500), 
  (_get, set, url: string) => {
    const fetchData = async () => {
      set(fetchResultAtom, (prev) => ({ ...prev, loading: true }))
      try {
        const response = await fetch('/api/urchins/user/sanshit.sagar@gmail.com')
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
    runFetch('/api/urchins/user/sanshit.sagar@gmail.com')
}

export const SeoParamResult = () => {
    const fetchResult = useAtomValue(fetchResultAtom)

    const { data, loading, error } = fetchResult

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error </Text>
    if(!data) return <Text> No Data! </Text> 

    return (
        <Text css={{ color: '$text' }}> 
            {JSON.stringify(data)} 
        </Text> 
    )
}
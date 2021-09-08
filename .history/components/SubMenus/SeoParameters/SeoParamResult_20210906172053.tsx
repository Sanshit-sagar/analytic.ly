import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { Text } from '../../../primitives/Text'

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
runFetchAtom.onMount = (runFetch) => {
    runFetch('/api/urchins/user/sanshit.sagar@gmail.com')
}

export const SeoParamResult = () => {
    const fetcher = useUpdateAtom(runFetchAtom)
    cont 
    const { data, loading, error } = fetchResult

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error! </Text>
    if(!data) return <Text> No Data! </Text> 

    return (
        <Text css={{ color: '$text' }}> 
            {JSON.stringify(data)} 
        </Text> 
    )
}
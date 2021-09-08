import { atom, useAtom } from 'jotai'
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

 const SeoParamResult = () => {
    const [fetchResult] = useAtom(runFetchAtom)

    return (
       <Text css={{ color: '$text' }}> 
       {JSON.stringify(fetchResult)} </Text> 
    )
}

export default SeoParamResult
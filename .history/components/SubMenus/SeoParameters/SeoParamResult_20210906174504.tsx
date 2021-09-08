import { useState, useEffect } from 'react'
import { atom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Heading } from '../../../primitives/Heading'

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
    const [lastFetchedAt, setLastFetchedAt]=useState<number | undefined>(undefined)

    const fetchRequest = useUpdateAtom(runFetchAtom)
    const fetchResult = useAtomValue(fetchResultAtom)
    const seconds = new Date().toLocaleDateString()

    useEffect(() => {
        setLastFetchedAt(seconds)
        fetchRequest(url)
    }, [seconds, lastFetchedAt]); 

    return {lastFetchedAt, ...fetchResult}
}

const Results = ({ data, loading, error }: { data: any | null, loading: boolean, error: any | null }) => {
    if(loading) return <Text> Loading... 2.0 </Text>
    if(error) return <Text> Error! </Text>
    if(!data) return <Text> No Data! </Text> 

    const format = (data: any) => JSON.stringify(data)

    return  (
        <>
            <Heading size='2'> RESULTS 2.0 </Heading>
            <Text css={{ color: '$text' }}> {format(data)} </Text> 
        </>
    );
}

export const SeoParamResult = () => {
    let url = '/api/urchins/user/sanshit.sagar@gmail.com'
    const { lastFetchedAt, data, loading, error } = useAsyncJotai(url)

    if(!lastFetchedAt) return <Text> loading 1.0 </Text>

    return (
        <>
        <Text> {lastFetchedAt} </Text>
        <Results data={data} loading={loading} error={error} />
        </>
    ); 
}
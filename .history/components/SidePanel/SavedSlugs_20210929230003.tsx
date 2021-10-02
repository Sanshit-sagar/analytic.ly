import useSWR from 'swr' 
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

interface SwrResponse {
    data: any;
    loading: boolean;
    error: Error | null; 
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

const useSavedSlugs = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/list`, fetcher)

    return {
        data: data ? data.data : undefined,
        loading: !data && !error,
        error
    }
}

export const SavedSlugs = () => {
   
    const { data, loading, error }: SwrResponse = useSavedSlugs()

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || ''} </Text>
    
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            {data && data.data.map((datum: string, index: number) => (
                <Text key={`slug-number-${index}`}> 
                    {datum} 
                </Text>
            ))}
        </Flex>
    )
}
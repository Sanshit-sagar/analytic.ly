import { useState } from 'react'
import useSWR from 'swr' 
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

interface UseSavedSlugsProps {
    cursor: number; 
    pageSize: number;
}
interface SwrResponse {
    data: any;
    loading: boolean;
    error: Error | null; 
}

const useSavedSlugs = ({ cursor, pageSize }: UseSavedSlugsProps): SwrResponse => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)

    return {
        data: data.data || undefined,
        loading: !data && !error,
        error
    }
}

export const SavedSlugs = () => {
    const [pageSize, setPageSize] = useState<number>(10)
    const [cursor, setCursor] = useState<number>(0)

    const updatePageSize = (newSize: number) => setPageSize(newSize)
    const updateCursor = (newCursor: number) => setCursor(newCursor)

    const { data, loading, error }: SwrResponse = useSavedSlugs({ cursor, pageSize })

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message?.length ? error.message : 'Unknown Error'} </Text>

  
    return <p> {data && data.length : '0'} items  </p>

    // return (
    //     <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
    //         {data.map((datum: string, index: number) => (
    //             <Text key={`slug-number-${index}`}> 
    //                 {datum} 
    //             </Text>
    //         ))}
    //     </Flex>
    // )
}
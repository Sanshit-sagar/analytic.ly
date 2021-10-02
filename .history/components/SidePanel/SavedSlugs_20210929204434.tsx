import { useState } from 'react'
import useSWR from 'swr' 
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'



interface UseSavedSlugsProps {
    cursor: string; 
    pageSize: number;
}
interface SwrResponse {
    data: any;
    loading: boolean;
    error: Error | null; 
}


const useSavedSlugs = ({ cursor = 0, pageSize = 10 }: UseSavedSlugsProps): SwrResponse => {
    const { data, error } = useSWR(`/api/configs/list/${cursor}/${pageSize}`)

    return {
        data: data || undefined,
        loading: !data && !error,
        error
    }
}

const SavedSlugs = () => {
    const [pageSize, setPageSize] = useState<number>(10)
    const [cursor, setCursor] = useState<string>(0)

    const updatePageSize = (newSize: number) => setPageSize(newSize)
    const updateCursor = (newCursor: string) => setCursor(newCursor)

    const { data, loading, error }: SwrResponse = useSavedSlugs({ cursor, pageSize })

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            {data.data.map((datum: string, index: number) => (
                <Text key={`slug-number-${index}`}> 
                    {datum} 
                </Text>
            ))}
        </Flex>
    )
}
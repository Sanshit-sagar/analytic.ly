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

const useSavedSlugs = (): SwrResponse => {
    const { data, error } = useSWR(`/api/config/list`)

    return {
        data,
        loading: !data && !error,
        error
    }
}

export const SavedSlugs = () => {
   
    const { data, loading, error }: SwrResponse = useSavedSlugs()

    // if(loading) return <Text> Loading... </Text>
    // if(error) return <Text> Error {error?.message?.length ? error.message : 'Unknown Error'} </Text>
    if(data) console.log(data)
  
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            {data?.map((datum: string, index: number) => (
                <Text key={`slug-number-${index}`}> 
                    {datum} 
                </Text>
            ))}
        </Flex>
    )
}
import useSWR from 'swr' 
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { useSavedSlugs } from '../../hooks/useSavedCollections'

interface SwrResponse {
    slugs: any;
    loading: boolean;
    error: Error | null; 
}


export const SavedSlugs = () => {
   
    const { slugs, loading, error }: SwrResponse = useSavedSlugs()

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>
    
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
            {slugs && slugs.map((datum: string, index: number) => (
                <Text key={`slug-number-${index}`}> 
                    {datum} 
                </Text>
            ))}
        </Flex>
    )
}
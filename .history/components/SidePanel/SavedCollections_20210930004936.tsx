import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import {
    useSavedSlugs, 
    useSavedDestinations 
} from '../../hooks/useSavedCollections'

interface SwrResponse {
    data: string[];
    loading: boolean;
    error: Error | null; 
}
interface CollectionProps {
    name: string; 
    data: string[]; // TODO replace with Collection[] 
    loading: boolean;
    error: Error | null; 
}

const CollectionContainer = styled(Flex, {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '$1'
});

const Collection = ({ name, data, loading, error }: CollectionProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>
    
    return (
        <CollectionContainer>
            {data && data.map((datum: string, i: number) => (
                <Text key={`slugIdx-${idx}`}> 
                    {datum} 
                </Text>
            ))}
        </CollectionContainer>
    )
}

export const SavedSlugs = () => {
    const { data, loading, error }: SwrResponse = useSavedSlugs()
    return <Collection name={'Slugs'} data={data} loading={loading} error={error} /> 
}

export const SavedDestinations = () => {
    const { data, loading, error }: SwrResponse = useSavedDestinations()
    return <Collection name={'Destination URLs'} data={data} loading={loading} error={error} /> 
}
import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Heading } from '../../primitives/Heading'
import { Separator } from '../../primitives/Separator'
import { Tree } from '../../compositions/Tree'

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

interface MappingProps {
    name: string; 
    data: {
        [key: string]: string[] 
    }; 
    loading: boolean; 
    error: Error | null; 
}

const CollectionContainer = styled(Flex, {
    height: '100%',
    width: '300px',
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
            <Heading size='2'> {name} </Heading>
            <Separator orientation={'horizontal'} /> 
            
            <Tree name={name} level={1} defaultOpen>
                {data && data.map((datum: string, idx: number) => (
                    <Tree 
                        key={`slugIdx-${idx}`} 
                        level={2} 
                        name={datum} 
                    />
                ))}
            </Tree>
        </CollectionContainer>
    )
}

const Mapping = ({ name, data, loading, error }: MappingProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>

    return (
        <CollectionContainer>
            <Tree name={<Text size='2'> {name} </Text>} level={1}>
                {data && Object.keys(data).map((url, i) => {
                    let slugs = data[url] 
                    return (
                        <Tree key={i} name={`${url} (${slugs.length})`} level={2} defaultOpen>
                            {slugs.map((slug, j) => (
                                <Tree 
                                    key={j} 
                                    name={slug} level={3} 
                                    
                                >
                                    <Box css={{ height: '100px', width: '100px', color: '$accent'}}>

                                    </Box>
                                </Tree> 
                            ))}
                        </Tree>
                    )
                })}
            </Tree>
        </CollectionContainer>
    )
}

export const SavedSlugs = () => {
    const { data, loading, error }: SwrResponse = useSavedSlugs()
    return <Collection name={'Slugs'} data={data} loading={loading} error={error} /> 
}

export const SavedDestinations = () => {
    const { data, loading, error }: SwrResponse = useSavedDestinations()
    return <Mapping name={'Destination URLs'} data={data} loading={loading} error={error} /> 
}
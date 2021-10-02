import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { ScrollArea } from '../../primitives/ScrollArea'
import { Tree } from '../../compositions/Tree'
import { Box } from '../../primitives/Box'

import { ExampleTable } from '../Table/Aria/Example'
import { useSlugDetails } from '../../hooks/useSavedCollections'
import { Loading } from '../Loading/Halogen'

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
            <Tree name={<Text size='2'> {name} </Text>} level={1} defaultOpen>
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

// const {data, error} = useSWR(`/api/configs/slug/${slug}`)
// let fields = data ? Object.entries(data.data) : []
// createdAt, email, destination, expiration, password, slug
const SlugInfo = ({ slug, isVisible }: { slug: string; isVisible: boolean; }) => {
    if(!isVisible) return null; 

    const { data } = useSlugDetails(slug)
    if(!data) return <Loading /> 
    return (
        <Box css={{ height: '125px', width: '125px', bc: '$panelDullest'}}>
            <ExampleTable />
        </Box>
    )
}

const Mapping = ({ name, data, loading, error }: MappingProps) => {
    const [open, setOpen] = React.useState(false)

    const toggleOpen = () => setOpen(!open)

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>

    return (
        <ScrollArea>
            <CollectionContainer>
                <Tree name={<Text size='2'> {name} </Text>} level={1} defaultOpen>
                    {data && Object.keys(data).map((url, i) => {
                        let slugs = data[url] 
                        return (
                            <Tree key={i} name={`${url} (${slugs.length})`} level={2} actionable defaultOpen>
                                {slugs.map((slug, j) => (
                                    <Tree 
                                        key={j} 
                                        name={slug} linkable level={3} open={open} handleOpen={toggleOpen}>
                                        <SlugInfo slug={slug} isVisible={open} /> 
                                    </Tree> 
                                ))}
                            </Tree>
                        )
                    })}
                </Tree>
            </CollectionContainer>
        </ScrollArea>
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
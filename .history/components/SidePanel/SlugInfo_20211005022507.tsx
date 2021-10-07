import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Tree } from '../../compositions/Tree'


import { useSlugDetails } from '../../hooks/useSavedCollections'
import { deleteAbTestConfigAtom } from '../../atoms/abtesting'

const SlugDetailsContainer = styled(Flex, {
    height: 100,
    width: 100, 
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch',
    gap: '$1',
    bc: 'transparent', 
    color: '$text',
    border: 'none', 
    margin: 0, 
    padding: 0,
    ml: '$1',
    pl: '1px',
    pt: '$1',
});


interface SlugDetails {
    createdAt: number; 
    destination: string; 
    email: string; 
    expiration: string; 
    password: string; 
    slug: string; 
    url: string; 
}

function deserialize(data: SlugDetails): SlugDetails | undefined {
    if(!data?.slug) return undefined;

    return {
        ...data,
        encodedUrl: data.url,
        createdAt: new Date(data.url).toDateString(),
    }
}


export const SlugInfo = ({ slug }: { slug: string;}) => {
    let cols: { id: string; name: string; value: string }[] = []
    const { data, loading, error } = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>


    let details: SlugDetails | undefined = data ? deserialize(data) : undefined

    if(details===undefined) return null
    
    return (
        <SlugDetailsContainer>
            <Tree name={deleteAbTestConfigAtom.expiration} defaultOpen />
            <Tree name={}
        </SlugDetailsContainer>
    )
}
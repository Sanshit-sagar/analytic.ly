import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Tree } from '../../compositions/Tree'
import { Box } from '../../primitives/Box'

import { useSlugDetails } from '../../hooks/useSavedCollections'

const SlugDetailsContainer = styled(Box, {
    height: 100,
    width: 100, 
    bc: '$neutral'
})



const SlugInfo = ({ slug }: { slug: string;}) => {
    let cols: { id: string; name: string; value: string }[] = []
    const { data, loading, error } = useSlugDetails(slug)
    
    if(loading) return  <Text> loading... </Text>
    if(error) return <Text> error </Text>


    return (
        <SlugDetailsContainer>
           <Text> {JSON.stringify(data)} </Text>
        </SlugDetailsContainer>
    )
}
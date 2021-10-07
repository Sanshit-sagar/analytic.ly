

import { TabulatedSlug } from '../Table/SlugTable'

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
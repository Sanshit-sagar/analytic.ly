import { useAsyncJotai } from '../../../hooks/useAsyncJotai'

import { Text } from '../../../primitives/Text'
import { Heading } from '../../../primitives/Heading'

export const SeoParamResult = () => {
    let url = '/api/urchins/user/sanshit.sagar@gmail.com'
    const { lastFetchedAt, data, loading, error } = useAsyncJotai(url)

    if(loading) return <Text> Loading... 2.0 </Text>
    if(error) return <Text> Error! </Text>
    if(!data) return <Text> No Data! </Text> 
    const format = (data: any) => JSON.stringify(data)
    return  (
        <>
            <Heading size='2'> RESULTS 2.0 </Heading>
            <Text css={{ color: '$text' }}> {format(data)} </Text> 
        </>
    );
}
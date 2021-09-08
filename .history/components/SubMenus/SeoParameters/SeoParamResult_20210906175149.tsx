import { useAsyncJotai } from '../../../hooks/useAsyncJotai'

import { Text } from '../../../primitives/Text'
import { Heading } from '../../../primitives/Heading'

const Results = ({ data, loading, error }: { data: any | null, loading: boolean, error: any | null }) => {
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

export const SeoParamResult = () => {
    let url = '/api/urchins/user/sanshit.sagar@gmail.com'
    const { lastFetchedAt, data, loading, error } = useAsyncJotai(url)

    if(!lastFetchedAt) return <Text> loading 1.0 </Text>

    return (
        <>
        <Text> {lastFetchedAt} </Text>
        <Results data={data} loading={loading} error={error} />
        </>
    ); 
}
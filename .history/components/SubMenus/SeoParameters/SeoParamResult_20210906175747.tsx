import { atom } from 'jotai'
import { useAsyncJotai } from '../../../hooks/useAsyncJotai'

import { Text } from '../../../primitives/Text'
import { Heading } from '../../../primitives/Heading'

const urlEndpointAtom = atom('/api/urchins/user')
const userEmailAtom = atom(
    (get) => get(urlEndpointAtom),
    (get, set, updatedEmail: string) => {
        set(urlEndpointAtom, `${get(urlEndpointAtom)}/${updatedEmail}`)
    }
);

const format = (data: any) => JSON.stringify(data)

export const SeoParamResult = () => {
    const { data, loading, error } = useAsyncJotai(url)

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error! </Text>
    if(!data) return <Text> No Data! </Text> 

    return  (
        <>
            <Heading size='2'> RESULTS 2.0 </Heading>
            <Text css={{ color: '$text' }}> {format(data)} </Text> 
        </>
    );
}

const 
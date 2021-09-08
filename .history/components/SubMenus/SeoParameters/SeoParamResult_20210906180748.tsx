import { atom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Heading } from '../../../primitives/Heading'
import { useAsyncJotai } from '../../../hooks/useAsyncJotai'

const urlEndpointAtom = atom('/api/urchins/user')
const fetchUrlAtom = atom(
    (get) => get(urlEndpointAtom),
    (get, set, updatedEmail: string) => {
        set(urlEndpointAtom, `${get(urlEndpointAtom)}/${updatedEmail}`)
    }
);

const format = (data: any) => JSON.stringify(data)

const FetchResult:React.FC<{ url: string }> = ({ url }) => {
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

const FetchQuery:React.FC = () => {
    const setUserEmail = useUpdateAtom(fetchUrlAtom)

    return (
        <button onClick={() => setUserEmail('sanshit.sagar@gmail.com')}>
            update and fetch
        </button>
    )
} 

export const SeoParamResult:React.FC = () => {
    const [shouldFetch, setShouldFetch] = useState(false)
    const url = useAtomValue(urlEndpointAtom)

    return (
        <>
            <FetchQuery updateRes={setShouldFetch} /> 
            { shouldFetch && <FetchResult url={url} />}
        </>
    )
}
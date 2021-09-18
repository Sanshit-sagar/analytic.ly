import { useState } from 'react' 
import { atom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { useAsyncJotai } from '../../../hooks/useAsyncJotai'
import { urlEndpointAtom, fetchUrlAtom } from '../../../atoms/urchins'

const format = (data: any) => JSON.stringify(Object.keys(data.userUrchins))

const FetchResult:React.FC<{ url: string }> = ({ url }: { url: IntrinsicAttributes & { url?: string } & { children?: React.ReactNode }}) => {
    const { data, loading, error } = useAsyncJotai(url)

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error! </Text>
    if(!data) return <Text> No Data! </Text> 
    
    return  <Text css={{ color: '$text' }}> {format(data)} </Text> 
}

const FetchQuery = ({ updateRes }: { updateRes: any }) => {
    const setUserEmail = useUpdateAtom(fetchUrlAtom)

    return (
        <button 
            onClick={() => {
                setUserEmail('sanshit.sagar@gmail.com')
                updateRes()
            }}
        >
            update and fetch
        </button>
    )
} 

export const UserUrchins:React.FC = () => {
    const [shouldFetch, setShouldFetch] = useState(false)
    const url = useAtomValue(urlEndpointAtom)

    const handleChange = () => setShouldFetch(true)

    return (
        <>
            <FetchQuery updateRes={handleChange} /> 
            { shouldFetch && <FetchResult url={url} />}
        </>
    )
}
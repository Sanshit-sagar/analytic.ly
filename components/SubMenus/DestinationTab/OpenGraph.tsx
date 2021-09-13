import React from 'react'

import { styled } from '../../../stitches.config'

import useSWR from 'swr'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { ScrollArea } from '../../../primitives/ScrollArea'

import { 
    destinationInputAtom, 
    isDestinationInputValidAtom 
} from '../DestinationTab'

const OG_BASE_ENDPOINT = 'https://opengraph.io/api/1.1/site'
const OG_PARAMS = 'accept_lang=en&full_render=false&cache_ok=true&use_proxy=false'
const OG_API_KEY = 'app_id=453a9e17-3d5b-4ad9-90b6-44638ec02cb2'

const encodedDestinationUrlAtom = atom<string | undefined>((get) => {
    return get(isDestinationInputValidAtom) ? encodeURIComponent(get(destinationInputAtom)) : undefined
});

const openGraphFetchUrlAtom = atom<string | undefined>((get) =>  {
    let isValid = get(isDestinationInputValidAtom);
    return isValid ? `${OG_BASE_ENDPOINT}/${get(encodedDestinationUrlAtom)}?${OG_PARAMS}&${OG_API_KEY}` : undefined
});

const ApiResponseFieldKey = styled(Text, {
    width: '100px', 
    textDecoration: 'underline', 
    textDecorationColor: '$accent',
    color: '$accent'
})

const ApiResponseFieldValue = styled(Text, {
    width: '100%', 
    float: 'right', 
    color: '$text', 
    ml: '$2'
})

const ApiResponseContainer = styled('div', {
    height: '100%', 
    width: '350px', 
    padding: '$1',
    pt: '$3', 
    margin: '$1', 
    bc: 'transparent', 
    border: '1px solid $border',
    br: '$2',
    '&:hover': {
        borderColor: '$border3' 
    }
});

const ApiResponseFields = styled('div', {
    width: '100%',
    display: 'inline-flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$2',
});


interface IOpenGraphResult {
    openGraph: any | null,
    hybridGraph: any | null,
    htmlInferred: any | null,
    request_info: any,
    accept_lang: string,
    is_cache: boolean,
    url: string, 
}

export const OgResultsData = ({ hybridGraph, hybridGraphKeys }: { 
    hybridGraph: any; 
    hybridGraphKeys: string[] | undefined; 
}) => {

    if(!hybridGraphKeys?.length) return null; 
    return (
        <ApiResponseContainer>
            <ScrollArea>
                {hybridGraphKeys?.filter((k: string) => hybridGraph[k]!==null).map((key: string, idx: number) => (
                    <ApiResponseFields key={idx}>
                        <ApiResponseFieldKey>{key}</ApiResponseFieldKey> 
                        <ApiResponseFieldValue>{hybridGraph[key]}</ApiResponseFieldValue>
                    </ApiResponseFields>
                ))}
            </ScrollArea>
        </ApiResponseContainer>
    );
}

export const OgResultsWrapper = ({ endpoint }: { endpoint: string }) => {

    const { data, error } = useSWR(endpoint) 

    let hybridGraph = data?.hybridGraph ?? undefined
    let hybridGraphKeys = hybridGraph ? Object.keys(hybridGraph) : undefined
    let loading = (!data && !error) || !data || !hybridGraph || !hybridGraphKeys || !hybridGraphKeys?.length 
    let noData = !loading && (!data || !hybridGraph || !hybridGraphKeys) 

    if(loading) return <Text> data loading... </Text> 
    if(error) return <Text> Error! </Text>
    if(noData) return <Text> No Data! </Text> 

    return (
        <OgResultsData 
            hybridGraph={hybridGraph} 
            hybridGraphKeys={hybridGraphKeys} 
        />
    );
}

export const OpenGraphResults = () => {
    const fetchUrl = useAtomValue<string | undefined>(openGraphFetchUrlAtom)
    return fetchUrl?.length ? <OgResultsWrapper endpoint={fetchUrl} /> : <Text> awaiting user input </Text>
}
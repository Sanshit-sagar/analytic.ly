import React from 'react'

import useSWR from 'swr'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Text'
import { Tree } from '../../compositions/Tree'
import { ScrollArea } from '../../primitives/ScrollArea'

import { openGraphFetchUrlAtom } from '../../atoms/destination'

const ScrolledText = ({ key, text }: { key: string; text: string; }) => (
    <ScrollArea key={key}> 
        <pre>{text}</pre> 
    </ScrollArea>
)

function sanitizedResultsLine(key: string, value: string): string {
    return key==='description' || value.length > 75 ? '' : value;
}

interface IOpenGraphProps {
    hybridGraph: any; 
    hybridGraphKeys: string[] | undefined; 
}

export const OgResultsData = ({ hybridGraph, hybridGraphKeys }: IOpenGraphProps) => (
    <Tree name={hybridGraphKeys?.length ? hybridGraph[hybridGraphKeys[0]] : 'Open Graph'}>   
        {hybridGraphKeys?.filter((k: string) => hybridGraph[k]!==null).map((key, i) => (
           
                {sanitizedResultsLine(key, hybridGraph[key]).length==0 
                ?    <Tree key={i} name={`${key}`}> <Text key={key}> {hybridGraph[key]} </Text> 
                :   <ScrolledText  key={key} text={hybridGraph[key]} />
                }
            </Tree>
        ))}
    </Tree>
)

export const OgResultsWrapper = ({ endpoint }: { endpoint: string }) => {

    const { data, error } = useSWR(endpoint) 

    let hybridGraph = data?.hybridGraph ?? undefined
    let hybridGraphKeys = hybridGraph ? Object.keys(hybridGraph) : undefined
    let loading = (!data && !error) || !data || !hybridGraph || !hybridGraphKeys || !hybridGraphKeys?.length 
    let noData = !loading && (!data || !hybridGraph || !hybridGraphKeys) 

    if(loading) return <Text> data loading... </Text> 
    if(error) return <Text> Error! </Text>
    if(noData || !hybridGraphKeys?.length) return <Text> No Data! </Text> 

    return (
        <OgResultsData 
            hybridGraph={hybridGraph} 
            hybridGraphKeys={hybridGraphKeys} 
        />
    )
}

export const OpenGraphResults = () => {
    const fetchUrl = useAtomValue<string | undefined>(openGraphFetchUrlAtom)

    return !fetchUrl?.length ? null : <OgResultsWrapper endpoint={fetchUrl} />
}
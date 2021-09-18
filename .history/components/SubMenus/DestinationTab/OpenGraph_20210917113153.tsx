import React from 'react'

import { styled } from '../../../stitches.config'

import useSWR from 'swr'
import { useAtomValue } from 'jotai/utils'

import { Flex } from '../../../primitives/Flex' 
import { Text } from '../../../primitives/Text'
import { Tree } from '../../../compositions/Tree'
import { ScrollArea } from '../../../primitives/ScrollArea'

import { openGraphFetchUrlAtom } from '../../../atoms/destination'

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
    height: '300px', 
    width: '285px', 
    overflow: 'hidden',
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

const ScrolledText = ({ key, text }: { key: string; text: string; }) => {

    return (
            <ScrollArea> 
                
            <Text>{text}</Text> 
                </ScrollArea>
    )
}

const ApiResponseFields = styled('div', {
    width: '100%',
    display: 'inline-flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$2',
});

function sanitizedResultsLine(key: string, value: string): string {
    return key==='description' || value.length > 75 ? '' : value;
}

export const OgResultsData = ({ hybridGraph, hybridGraphKeys }: { 
    hybridGraph: any; 
    hybridGraphKeys: string[] | undefined; 
}) => {

    if(!hybridGraphKeys?.length) return null; 
    return (
        <ApiResponseContainer>
            <Tree name={hybridGraph[hybridGraphKeys[0]]} defaultOpen>                
                {hybridGraphKeys?.filter((k: string) => hybridGraph[k]!==null).map((key: string, idx: number) => {
                    let sanitizedValue = sanitizedResultsLine(key, hybridGraph[key])
                    let requiresScrollArea = sanitizedValue.length==0

                    return (
                        <Tree 
                            key={idx} 
                            name={`${key}`} 
                        >
                            {requiresScrollArea 
                                ? <ScrolledText key={key} text={hybridGraph[key]} /> 
                                : <Text> {hybridGraph[key]} </Text> 
                            }
                        </Tree>
                    );
                })}
            </Tree>
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
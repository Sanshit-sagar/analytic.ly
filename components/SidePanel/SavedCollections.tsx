import React from 'react'
import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { ScrollArea } from '../../primitives/ScrollArea'

import { Tree } from '../../compositions/Tree'
import { Box } from '../../primitives/Box'

import { SlugInfo } from './SlugInfo'

import {
    useSavedSlugs, 
    useSavedDestinations 
} from '../../hooks/useSavedCollections'

type CollectionType = 'listing' | 'mapping'

interface SwrResponse {
    data: string[];
    loading: boolean;
    error: Error | null; 
}
interface CollectionProps {
    name: string; 
    data: string[]; // TODO replace with Collection[] 
    loading: boolean;
    error: Error | null; 
}

const CollectionContainer = styled(Flex, {
    height: '100%',
    width: '300px',
    margin: 0,
    padding: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '$1'
});


const Listing = ({ name, data, loading, error }: CollectionProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>
    
    return ( 
        <Tree name={<Text size='2'> {name} </Text>} level={1} defaultOpen>
            {data && data?.length && data.map((slug, i) => (
                <Tree key={`slug-${i}`} level={2} name={slug}>
                    <SlugInfo slug={slug} />
                </Tree>
            ))}
        </Tree>
    )
}

const Mapping = ({ name, data, loading, error }: CollectionProps) => {
    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error {error?.message || '!'} </Text>
    
    return (
        <Tree name={<Text size='3'> {name} </Text>} level={1} defaultOpen>
            {data && Object.keys(data).map((url: string, i: number) => (
                
                <Tree key={i} name={<Text size='2'> {url} </Text>} level={2} actionable defaultOpen>
                    {url && data[url] && data[url].map((slug: string, j: number) => (
                        
                        <Tree key={j} name={slug} linkable level={3}>
                            <SlugInfo slug={slug} />
                        </Tree> 
                    ))}
                </Tree>
            ))}
        </Tree>
    )
}

const CollectionWrapper = ({ type, name, swrProps }: { 
    type: CollectionType; 
    name: string;
    swrProps: SwrResponse; 
}) => {
    
    const { data, loading, error } = swrProps

    return (
        <ScrollArea>
            <CollectionContainer>
                {type==='mapping'
                ? <Mapping name={name} data={data} loading={loading} error={error} />
                : <Listing name={name} data={data} loading={loading} error={error} />}
            </CollectionContainer>
        </ScrollArea>
    )
}

export const SavedSlugs = () => {
    const swrProps: SwrResponse = useSavedSlugs()
    return <CollectionWrapper type={'listing'} name={'/slugs'} swrProps={swrProps} /> 
}

export const SavedDestinations = () => {
    const swrProps: SwrResponse = useSavedDestinations()
    return <CollectionWrapper type={'mapping'} name={'/destinations'} swrProps={swrProps} /> 
}
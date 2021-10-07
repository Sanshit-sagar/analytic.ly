import React from 'react'
import useSWR from 'swr'
import { Text } from '../../primitives/Text'

import { AreaDifference } from './AreaDifference'
import { VisxParentSizeWrapper } from '../../primitives/Shared'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import {
    AreaDifferenceProps,
    Margin,
    Click,
    ParentSizeProps
} from './interfaces'

import {

} from '../../atoms/'
interface SwrFetchResponse<T> {
    data: ApiResourceWrapper<T>; 
    error: Error | any | null;
}

interface ApiResourceWrapper<T> {
    frequencies: T; 
    category: string; 
    resource: string;
    resourceId: string;
    collection: string; 
    timestamp: number; 
};

interface SlugRankings {
    title: string; 
    score: string; 
    rank: number;
    normalizedFreq: number; 
}

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}; 


const useUserSlugs = (): SwrResponse<any> => {
    const { data, error } = useSWR(`/api/info/clickstream/${slug}/${}/${range}/${increments}`)

    return {
        data: data || undefined,
        loading: !data && !error,
        error: error
    };
}

export const amountAtom = atom((get) => get(rangeStrAtom).split(' ')[0])
export const rangeAtom = atom((get) => get(rangeStrAtom).split(' ')[1].toLowerCase())
export const intervalAtom = atom((get) => intervalOptions[get(intervalIndexAtom)].textValue)
export const statisticAtom = atom((get) => statisticOptions[get(statisticIndexAtom)].textValue)

export const globalFiltersStrAtom = atom<string>(
    (get) => `/${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
); 

export const Threshold = () => {

    const { data, loading, error } = useUserSlugs()

    if(loading) return <Text>loading...</Text> 
    if(error) return <Text>error!</Text> 
    
    return (
        <VisxParentSizeWrapper>
            <ParentSize>
                {({ height, width }: ParentSizeProps) => (
                    <AreaDifference
                        clicks={clicks}
                        height={height}
                        width={width}
                    /> 
                )}
            </ParentSize>
       </VisxParentSizeWrapper>
    )
}


// TODO import timeseries atoms here
    // http://localhost:3000/api/users/sanshit.sagar@gmail.com/rankings/frequencies

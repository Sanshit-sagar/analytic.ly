import React from 'react'
import { styled } from '../../stitches.config'
import useSWR from 'swr'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Text'

import { Controller } from '../Timeseries/Controller'
import { AreaDifference } from './AreaDifference'
import { VisxParentSizeWrapper } from '../../primitives/Shared'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import {
    ParentSizeProps
} from './interfaces'

import {
    amountAtom,
    rangeAtom,
    intervalAtom
} from '../../atoms/timeseries'

import { Flex } from '../../primitives/Flex'
import { SavedSlugs } from '../SidePanel/SavedCollections'

const globalFiltersStrAtom = atom<string>(
    (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
); 

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}

const Controller = styled(Flex, {
    height: 40, 
    width: '100%', 
    margin: 0, 
    padding: '$1', 
    border: 'thin solid $border', 
    br: '$2',
    fd: 'column', 
    jc: 'flex-end',
    ai: 'flex-start',
    gap: '$1'
})


const useUserSlugs = ({ 
    slug, 
}: { 
    slug: string | undefined;
}): SwrResponse<any> => {

    const globalFilters = useAtomValue(globalFiltersStrAtom)

    const { data, error } = useSWR(slug!==undefined ? `/api/info/clickstream/${slug}/${globalFilters}` : null)

    return {
        data: data ? data?.data : undefined,
        loading: !data && !error,
        error: error
    };
}

export const Threshold = () => {
    const [slug, setSlug] = React.useState('billy-bob-the-rhino')
    const { data, loading, error } = useUserSlugs({ slug })

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let clicks = data ? data?.clickstream : []
    
    return (
        <VisxParentSizeWrapper>
            <Controller /> 
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

// interface SwrFetchResponse<T> {
//     data: ApiResourceWrapper<T>; 
//     error: Error | any | null;
// }
// interface SlugRankings {
//     title: string; 
//     score: string; 
//     rank: number;
//     normalizedFreq: number; 
// }

// interface ApiResourceWrapper<T> {
//     frequencies: T; 
//     category: string; 
//     resource: string;
//     resourceId: string;
//     collection: string; 
//     timestamp: number; 
// };
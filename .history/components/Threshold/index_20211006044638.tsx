import React from 'react'
import { styled } from '../../stitches.config'

import useSWR from 'swr'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Text'

import { AreaDifference } from './AreaDifference'
import { Range, Increments, WindowSize } from '../Timeseries/Controller'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { ParentSizeProps } from './interfaces'
import {
    ThresholdWrapper,
    ThresholdController,
    ThresholdContainer
} from './styled'

import {
    amountAtom,
    rangeAtom,
    intervalAtom
} from '../../atoms/timeseries'
// import { SavedSlugs } from '../SidePanel/SavedCollections'


const globalFiltersStrAtom = atom<string>(
    (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
); 

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}


const useUserSlugs = ({ 
    slug, 
}: { 
    slug: string | undefined;
}): SwrResponse<any> => {
    const globalFilters = useAtomValue(globalFiltersStrAtom)

    const { data, error } = useSWR(`/api/metrics/slug/${slug}/tail/${globalFilters}`)

    return {
        data: data ? data?.data : undefined,
        loading: !data && !error,
        error: error
    };
}

const Toolbar = () => {

    return (
        <ThresholdController> 
            <Range />
            <Increments />
            <WindowSize /> 
        </ThresholdController>
    )
}

export const ThresholdParent = () => {
    const [slug, setSlug] = React.useState('billy-bob-the-rhino')
    const { data, loading, error } = useUserSlugs({ slug })

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let clicks = data ? data?.clickstream : []
    
    return (
        <ThresholdWrapper>
            <ParentSize>
                {({ height, width }: ParentSizeProps) => (
                    <AreaDifference
                        clicks={clicks}
                        height={height}
                        width={width}
                    /> 
                )}
            </ParentSize>
       </ThresholdWrapper>
    )
}

const clickstreamCurveIndexAtom = atom(1)

export const CurveOptions = ({ curveOptions }: { curveOptions: { key: string; }}) => {
    const [curveIndex, setCurveIndex] = useAtom(clickstreamCurveIndexAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${curveIndex}`}
            setSelectedIndex={(value: number) => setCurveIndex(value || 0)}
            selectedValue={`${curveIndex}`}
            selectedTextValue={`${curveOptions[curveIndex].value}`}
            items={curveOptions}
            groupName={'Slug Activity Graph Curve Options'}
        />
    );
}

export const Threshold = () => {

    return (
        <ThresholdContainer>
            <Toolbar />
            <ThresholdParent />
        </ThresholdContainer>
    )
}

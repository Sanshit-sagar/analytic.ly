import React from 'react'
import { styled } from '../../stitches.config'

import useSWR from 'swr'
import {useIsSSR} from '@react-aria/ssr'

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
} from './styled'

import {
    amountAtom,
    rangeAtom,
    intervalAtom
} from '../../atoms/timeseries'

import { useSlugsWithViews } from './hooks'


const globalFiltersStrAtom = atom<string>(
    (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
); 

const slug1ValueAtom = atom('')
const slug2ValueAtom = atom('')
const slug3ValueAtom = atom('')
const slug1Atom = atom(
    (get) => {
            let 
    }
)

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}

export const Threshold = () => {
    // const [slug, setSlug] = React.useState('billy-bob-the-rhino')
    
    const { data, loading, error } = useSlugsWithViews({ slug })

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


import React from 'react'
import { atom } from 'jotai'

import { Text } from '../../primitives/Text'

import { AreaDifference } from './AreaDifference'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { ParentSizeProps } from './interfaces'
import {
    ThresholdWrapper,
} from './styled'

import {
    amountAtom,
    rangeAtom,
    intervalAtom
} from '../../atoms/timeseries'

import { useSlugsWithViews } from './hooks'


// const globalFiltersStrAtom = atom<string>(
//     (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
// ); 

const slug1ValueAtom = atom('')
const slugs: string[] = []

const slug1Atom = atom(
    (get) => get(slug1ValueAtom),
    (_get, set, update: number) => set(slug1ValueAtom, slugs[update]),
); 

interface SwrResponse<T> {
    data: T;
    loading: boolean;
    error: Error | any | null;
}

export const Threshold = () => {
    // const [slug, setSlug] = React.useState('billy-bob-the-rhino')
    
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let visitedUserSlugs: string[] = !loading && !error && data ? Object.keys(data) : []
    
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
           
            <Text> /brave-delay-damage-7rgys </Text>
       
        <ThresholdWrapper>
            <ParentSize>
                {({ height, width }: ParentSizeProps) => (
                    <AreaDifference 
                        slugs={visitedUserSlugs}
                        height={height} 
                        width={width} 
                    />
                )}
            </ParentSize>
       </ThresholdWrapper>
    )
}

// /api/users/sanshit.sagar@gmail.com/rankings/uniques

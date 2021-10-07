import React from 'react'
import { atom } from 'jotai'

import { Text } from '../../primitives/Text'

import { MenuBar, Container, ParentSizeWrapper } from './styled'

import { AreaDifference } from './AreaDifference'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { useSlugsWithViews } from './hooks'
import { ParentSizeProps } from './interfaces'

// const globalFiltersStrAtom = atom<string>(
//     (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
// ); 

// const slug1ValueAtom = atom('')
// const slugs: string[] = []

// const slug1Atom = atom(
//     (get) => get(slug1ValueAtom),
//     (_get, set, update: number) => set(slug1ValueAtom, slugs[update]),
// ); 

// interface SwrResponse<T> {
//     data: T;
//     loading: boolean;
//     error: Error | any | null;
// }

export const Threshold = () => {
    // const [slug, setSlug] = React.useState('billy-bob-the-rhino')
    
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let visitedUserSlugs: string[] = !loading && !error && data ? Object.keys(data) : []
    
    return (
        <Container>        
            <MenuBar>
                <Text> /brave-delay-damage-7rgys </Text>
                <Text> /anotha-one </Text>
            </MenuBar>
       
            <ParentSizeWrapper>
                <ParentSize>
                    {({ height, width }: ParentSizeProps) => (
                        <AreaDifference 
                            slugs={visitedUserSlugs}
                            height={height} 
                            width={width} 
                        />
                    )}
                </ParentSize>
            </ParentSizeWrapper>
        </Container>
    )
}

// /api/users/sanshit.sagar@gmail.com/rankings/uniques
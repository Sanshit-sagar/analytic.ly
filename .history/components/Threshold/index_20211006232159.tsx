import React, { useState, useEffect } from 'react'

import { atom, useAtom, WritableAtom } from 'jotai'
import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import { amountAtom, rangeAtom, intervalAtom } from '../../atoms/timeseries'

import { useSlugsWithViews } from './hooks'
import { Text } from '../../primitives/Text'
import { ParentSizeProps } from './interfaces'
import { AreaDifference } from './AreaDifference'
import SelectMenu from '../../compositions/SelectMenu'
import { MenuBar, Container, ParentSizeWrapper } from './styled'

import ParentSize from '@visx/responsive/lib/components/ParentSize'


interface StoredSlugState {
    slug: string; 
    selectedValue: string | undefined; 
    isSelected: boolean; 
    isLoading: boolean; 
    endpoint: string;
}

interface IItem {
    id: string;
    value: string;
    textValue: string;
    icon: React.ReactNode | undefined;
    alt: string | undefined; 
}

const INIT_SELECTION_STATE: StoredSlugState[] = [{ 
    slug: 'slug1',
    isSelected: false,
    selectedValue: undefined,
    isLoading: false,
    endpoint: ''
}, {
    slug: 'slug2',
    isSelected: false,
    selectedValue: undefined,
    isLoading: false,
    endpoint: ''
}];

const globalFilterStrAtom = atom(
    (get) => `${get(amountAtom)}/${get(rangeAtom)}/${get(intervalAtom)}`
);

// init selections to not loading, not selected 
const slugSelectionAtom = atom(INIT_SELECTION_STATE) 
const selectedIndexAtom = atom(0)
const selectedValueAtom = atom((get) => selectOptions[get(selectedIndexAtom)])

 //init fetchEndpoints to empty string for each selection
const slugFetchEndpointsAtom: WritableAtom<string[], string[]> = atom(
    (get) => Object.keys(get(slugSelectionAtom)).map((_slug: string) => ''),
    (get, set, update: string[]) => {
        set(slugSelectionAtom, get(slugSelectionAtom).map((entry: StoredSlugState, index: number) => {
            return {
                ...entry,
                isLoading: false,
                endpoint: !entry.isSelected || !update[index]?.length ? '' : update[index],
            };
        }));
    }
)

// on an updated selection, if an item is unselected -> revert to original settings
// if a selection is made, update selection values, and mark the state as loading -> awaiting clicks
const makeSelectionAtom = atom(
    null,
    (get, set, update: number) => {
        set(selectedIndexAtom, number)
        set(selectedValueAtom, )
        set(slugSelectionAtom, get(slugSelectionAtom).map((slugState: StoredSlugState, _index: number) => {
            return {
                slug: slugState.slug !== update.slug ? slugState.slug : update.slug,
                selectedValue: slugState.slug !== update.slug ? slugState.selectedValue : update.selectedValue,
                isSelected: slugState.slug !== update.slug && slugState.selectedValue ? true : false,
                isLoading: slugState.isLoading || update.isLoading ? true : false, 
                endpoint: slugState.slug===update.slug ? `/api/metrics/slug/${update.selectedValue}/tail/${get(globalFilterStrAtom)}`:''
            }
        }))
        
    }
);

const resetSelectionAtom = atom(
    null,
    (_get, set, update: string) => set(makeSelectionAtom, {
        slug: update,
        selectedValue: undefined,
        isSelected: false,
        isLoading: false,
        endpoint: ''
    })
);
   
const isEqual = (id1: string, id2: string): boolean => id1===id2

function SelectPropsFactory(keys: string[]): IItem[] {
    return keys.map((key: string, i: number) => {
        return {
            id: `${i}`,
            value: key,
            textValue: `${key}`,
            icon: undefined,
            alt: undefined,
        }
    })
}

// selectSlug(userSlugs[selectedIndex]);
const SlugSelector = ({ 
    slugId, 
    userSlugs 
}: { 
    slugId: string; 
    userSlugs: string[]; 
}) => {

    let slugItems: IItem[] = SelectPropsFactory(userSlugs?.length ? userSlugs : ['']) 

    const selectSlug = useUpdateAtom(makeSelectionAtom)    
   
    const handleUpdate = (value: number) => selectSlug({ value, sl

    return (
        <SelectMenu
            selectOnly={true}
            group={'Slugs'}
            items={slugItems} 
            selectedIndex={selectedIndex}
            setSelectedIndex={handleUpdate}
            selectedTextValue={slugItems[selectedIndex].textValue}
            selectedValue={slugItems[selectedIndex].value}
        /> 
    )
}

const SlugEndpoints = () => {
    const selectionObj = useAtomValue(slugSelectionAtom)
    return <Text css={{ fontSize: '8px' }}>{JSON.stringify(selectionObj)} </Text> 
}

const SelectionMenu = ({ userSlugs }: { userSlugs: string[]; }) => (
    <MenuBar> 
        <SlugSelector 
            slugId={'slug1'}
            userSlugs={userSlugs} 
        />

        <SlugEndpoints />

        <SlugSelector 
            slugId={'slug2'}
            userSlugs={userSlugs} 
        />
    </MenuBar>
)


export const Threshold = () => {
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let userSlugs: string[] = !loading && !error && data ? Object.keys(data) : []

    return (
        <Container>        
            <SelectionMenu 
                userSlugs={userSlugs} 
            /> 
       
            <ParentSizeWrapper>
                <ParentSize>
                    {({ height, width }: ParentSizeProps) => (
                        <AreaDifference 
                            slugs={userSlugs}
                            height={height} 
                            width={width} 
                        />
                    )}
                </ParentSize>
            </ParentSizeWrapper>
        </Container>
    );
}

// /api/users/sanshit.sagar@gmail.com/rankings/uniques

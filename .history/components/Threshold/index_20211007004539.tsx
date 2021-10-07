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
import toast from 'react-hot-toast'


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

// type SlugDetails = { 
//     index: number; 
//     value: string; 
// }
// type SlugConfig = {
//     id: number; 
//     index: number; 
//     value: string;
// }

// const slugConfigAtom: PrimitiveAtom<SlugConfig[]> = atom([
//     { id: '0', index: 0, value: 'n/a' },
//     { id: '1', index: 0, value: 'n/a' },
// ])

// const shareSlugConfigAtom = atom(
//     (get) => {
//         return get(slugConfigAtom)
//     },
// )
// const updateSlugConfigAtom = atom(
//     null,
//     (get, set, update: SlugDetails) => {
//         set(slugConfigAtom, get(slugConfigAtom).map((update: { index: number; value: string }) => {
//             return  (idx===update.index) ? { id: `${idx}`, ...update  } : { ...prevDetails } 
//         }));
//     } 
// );

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
// const selectSlug = useUpdateAtom(makeSelectionAtom)    
// const handleUpdate = (value: number) => selectSlug({ 
//     index: value, 
//     name: slugItems[index].value 
// })
const endpointAtom = atom({ 'slug1': '',  'slug2': '' })
const setEndpointAtom = atom(
    (get) => get(endpointAtom),
    (get, set, update: { name: string; value: string; }) => {
        set(endpointAtom, { 
            ...get(endpointAtom), 
            [`${update.name}`]: `${update.value}` 
        });
    }
)

const SlugSelector = ({ 
    slugId, 
    userSlugs,
    selectedIndex,
    endpoint
}: { 
    slugId: string; 
    userSlugs: string[]; 
    selectedIndex: number;
    endpoint: string;
}) => {

    const setEndpoint = useUpdateAtom(setEndpointAtom)
  
    const handleUpdate = (value: number) => {
        setEndpoint(slugId, endpoint)
        toast.success(`Selected ${value}, [${userSlugs[value]}]`)
    }
    
    let slugItems: IItem[] = SelectPropsFactory(userSlugs?.length ? userSlugs : [''])   

    

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


const SelectionMenu = ({ userSlugs }: { userSlugs: string[]; }) => (
    <MenuBar> 
        <SlugSelector 
            slugId={'slug1'}
            userSlugs={userSlugs} 
            selectedIndex={2}
            endpoint={`/api/metrics/slug/avenged-darkness-singe-aqvnz/views`}
        />

        <SlugSelector 
            slugId={'slug2'}
            userSlugs={userSlugs} 
            selectedIndex={4}
            endpoint={`/api/metrics/slug/brave-delay-damage-7rgys/views`}
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
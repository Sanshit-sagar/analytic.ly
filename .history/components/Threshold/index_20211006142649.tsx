import React, { useState } from 'react'

import { atom, WritableAtom } from 'jotai'
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
    (get, set, update: StoredSlugState) => {
        set(slugSelectionAtom, get(slugSelectionAtom).map((slugState: StoredSlugState, _index: number) => {
        
            return {
            slug: slugState.slug !== update.slug ? slugState.slug : update.slug,
            selectedValue: slugState.slug !== update.slug ? slugState.selectedValue : update.selectedValue,
            isSelected: slugState.slug !== update.slug && slugState.selectedValue ? slugState.isSelected : update.isSelected,
            isLoading: slugState.isLoading || update.isLoading, 
            endpoint: slugState.slug === update.slug ? `/api/metrics/slug/${slugState.selectedValue}/tail/${get(globalFilterStrAtom)}` : ''
        }
    }));
    // todo revert fetch endpoint here as well
)

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

const SlugSelector = ({ 
    slugId, 
    userSlugs 
}: { 
    slugId: string; 
    userSlugs: string[]; 
}) => {
    let slugItems: IItem[] = SelectPropsFactory(userSlugs?.length ? userSlugs : ['']) 
    const [selection, setSelection] = useState<string>(userSlugs[0])
    const selectSlug = useUpdateAtom(makeSelectionAtom)

    useEffect(() => {
        selectSlug({
            slug: slugId,
            selectedValue: userSlugs[0],
            isSelected: true,
            isLoading: true,
            endpoint: ''
        });

    });

    

    const handleUpdate = (updatedSelection: string) => {  
    
        if(isEqual(updatedSelection, selection)) {
            selectSlug({
                slug: '',
                selectedValue: undefined,
                isSelected: false,
                isLoading: false,
                endpoint: ''
            });
            setSelection('')
        } else {
            selectSlug({ 
                slug: slugId, 
                selectedValue: updatedSelection,
                isSelected: true,
                isLoading: true,
                endpoint: '',
            });
            setSelection(`${updatedSelection}`) 
        }
    
    }

   

    return (
        <SelectMenu
            selectOnly={true}
            group={'Slugs'}
            items={slugItems} 
            selectedIndex={parseInt(selectedIndex)}
            setSelectedIndex={(updatedIndex: number) => handleIndexUpdate(slugItems[updatedIndex].value)}
            selectedTextValue={`${slugItems[parseInt(selectedIndex)]?.textValue ?? slugItems[0].textValue}`}
            selectedValue={`${slugItems[parseInt(selectedIndex)]?.value ?? slugItems[0].value}`}
        /> 
    )
}

const SlugEndpoints = () => {
    const slugFetchEndpoints = useAtomValue(slugFetchEndpointsAtom)

    return <Text>{JSON.stringify(slugFetchEndpoints)} </Text> 
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

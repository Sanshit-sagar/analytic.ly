import React, { useState } from 'react'
import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { Text } from '../../primitives/Text'
import SelectMenu from '../../compositions/SelectMenu'
import { MenuBar, Container, ParentSizeWrapper } from './styled'

import { AreaDifference } from './AreaDifference'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { useSlugsWithViews } from './hooks'
import { ParentSizeProps } from './interfaces'


interface SlugState { 
    slug: string, 
    value: string | undefined; 
}

interface IItem {
    id: string;
    value: string;
    textValue: string;
    icon: React.ReactNode | undefined;
    alt: string | undefined; 
}

const slugSelectionAtom = atom({ 
    'slug1': { 
        isSelected: false,
        selectedValue: undefined
    },
    'slug2': {
        isSelected: false,
        selectedValue: undefined
    }
});


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


function isIndexInRange(index: number, itemsInRange: any[]) {
    return index >= 0 && index <itemsInRange?.length
}

const SlugSelector = ({ 
    slugId, 
    seenUserSlugs 
}: { 
    slugId: string; 
    seenUserSlugs: string[]; 
}) => {

    
    const [selectedIndex, setSelectedIndex] = useState(slugId)
    const selectSlug = useUpdateAtom(makeSelectionAtom)

    const handleIndexUpdate = (updatedIndex: number) => {
        setSelectedIndex(`${updatedIndex}`)   
        selectSlug({ 
            slug: slugId, 
            value: isIndexInRange(updatedIndex, slugItems) ? slugItems[updatedIndex].textValue : undefined 
        });
    }

    let slugItems: IItem[] = SelectPropsFactory(seenUserSlugs?.length ? seenUserSlugs : ['']) 

    return (
        <SelectMenu
            selectOnly={true}
            group={'Slugs'}
            items={slugItems} 
            selectedIndex={parseInt(selectedIndex)}
            setSelectedIndex={handleIndexUpdate}
            selectedTextValue={`${slugItems[parseInt(selectedIndex)]?.textValue ?? slugItems[0].textValue}`}
            selectedValue={`${slugItems[parseInt(selectedIndex)]?.value ?? slugItems[0].value}`}
        /> 
    )
}


export const Threshold = () => {
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let seenUserSlugs: string[] = !loading && !error && data ? Object.keys(data) : []
       
    return (
        <Container>        
            <MenuBar> 
                <SlugSelector 
                    slugId={'slug1'}
                    seenUserSlugs={seenUserSlugs} 
                />

                <SlugSelector 
                    slugId={'slug2'}
                    seenUserSlugs={seenUserSlugs} 
                />
            </MenuBar>
       
            <ParentSizeWrapper>
                <ParentSize>
                    {({ height, width }: ParentSizeProps) => (
                        <AreaDifference 
                            slugs={seenUserSlugs}
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
import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent
} from '../../primitives/Select'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useAtom, atom } from 'jotai'

interface SlugCategory {
    id: number; 
    category: string; 
    description: string; 
}

const slugCategoryOptions: SlugCategory[] = [
    { id: 0, category: 'Short', description: '' },
    { id: 1, category: 'Cute', description: ''  },
    { id: 2, category: 'Secure', description: '' },
    { id: 3, category: 'Marketable', description: '' },
    { id: 4, category: 'Custom', description: '' }
];

const isSlugCategoryActive = atom<boolean>(false)
const selectedSlugCategoryIndexAtom = atom<number>(0)
const selectedSlugCategoryValueAtom = atom<any>((get) => get(selectedSlugCategoryIndexAtom)


export const SlugCategorySelector = () => {
    const [isOpen, setIsOpen] = useAtom(isSlugCategoryActive)
    const [_, setSelectedIndex] = useAtom(selectedSlugCategoryIndexAtom); 
    const selectedSlugCategory = useAtom(selectedSlugCategoryAtom)
            
    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                        <Text size='1'> 
                            {selectedSlugCategory} 
                            <ChevronDownIcon />
                        </Text>
                    </Flex>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {slugCategoryOptions.map((option: SlugCateogry, index: number) => {
                            return (
                                <SelectRadioItem
                                    key={index}
                                    onSelect={() => setSelectedIndex(index)}
                                    css={{ textTransform: 'uppercase' }}
                                >
                                    <Text size='1'>{option.category}</Text> 
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    )
}

export const SlugTabContent = () => {

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'>
                Select a category that should be used to generate a Slug.
            </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> Choose a Category </Label>
                <SlugCategorySelector />
            </UrlFieldSet>
        </Flex>
    )   
}



export const ThemeSelections = () => {
    const [theme] = useAtom(themeAtom)
    const [panel] = useAtom(panelAtom)
    const [accent] = useAtom(accentAtom)

    return (
        <Text size='1'> 
          {theme} | {panel} | {accent}
        </Text>
    )
}

export default ThemeSelector
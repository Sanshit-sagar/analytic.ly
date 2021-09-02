import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 

import { useSuggestedSlugs } from '../../hooks/useSuggestedSlugs'

import {
    SelectRoot, 
    SelectTrigger,
    SelectRadioGroup,
    SelectRadioItem,
    SelectContent
} from '../../primitives/Select'

import { ChevronDownIcon } from '@radix-ui/react-icons'

interface ISlugCateogry {
    id: number; 
    category: string; 
    description: string; 
}

const slugCategoryOptions: ISlugCateogry[] = [
    { id: 0, category: 'Short', description: '' },
    { id: 1, category: 'Cute', description: ''  },
    { id: 2, category: 'Secure', description: '' },
    { id: 3, category: 'Marketable', description: '' },
    { id: 4, category: 'Custom', description: '' }
];

export const SlugCategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
            
    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                        <Text size='1'> 
                            {slugCategoryOptions[selectedIndex]?.category} 
                            <ChevronDownIcon />
                        </Text>
                    </Flex>
                </SelectTrigger>
                <SelectContent>
                    <SelectRadioGroup>
                        {slugCategoryOptions.map((option: ISlugCateogry, index: number) => {
                            return (
                                <SelectRadioItem
                                    key={index}
                                    onSelect={() => setSelectedIndex(index)}
                                    css={{ textTransform: 'uppercase' }}
                                >
                                    <Text size='1'> {option.category} </Text>
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    );
}

const SuggestedSlugs = ({ saltLength, numStrings, }) => {
    const { suggestions, loading, error } = useSuggestedSlugs({ saltLength: 3, numStrings: 2, separator: '^', saltType: 'mixed' });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Box css={{ height: '150px', width: '150px' }}> 
            <Text size='3' css={{ color: '$text'}}>
                {JSON.stringify(suggestions)}
            </Text>
        </Box>
    )
}
                
export const SlugTabContent = () => {

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'> Select the category to generate a Slug.</Text>

            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> Choose a Category </Label>
                {/* <SlugCategorySelector /> */}
                <SuggestedSlugs />
            </UrlFieldSet>
        </Flex>
    )   
}

export default SlugTabContent
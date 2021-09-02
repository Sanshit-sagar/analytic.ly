import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 

import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

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

interface ISuggestedSlugsProps {
    saltLength: number; 
    numStrings: number; 
    saltType: 'number' | 'string' | 'mixed' | undefined;
    separator: string; 
    isManly?: boolean 
}

const SuggestedSlugs = ({ saltLength, numStrings, separator, saltType }: ISuggestedSlugsProps) => {
    let isManly = false; 
    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Box css={{ height: '150px', width: '150px', padding: '$3', margin: '$2' }}> 
            <Text size='3' css={{ color: '$text'}}>
                {JSON.stringify(suggestion)}
            </Text>
        </Box>
    )
}

const saltTypes: any[]  = ['number', 'string', 'mixed', undefined]
                
export const SlugTabContent = () => {
    const [saltLength, setSaltLength] = useState<number>(2)
    const [numStrings, setNumStrings] = useState<number>(3)
    const [separator, setSeparator] = useState<string>('#')
    const [saltTypeIndex, setSaltTypeIndex] = useState<number>(0)

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text
                size='1' 
                css={{ color: '$text' }}
            > 
                Select the category to generate a Slug.
            </Text>

            <Separator css={{  width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> 
                    <Text size='1' css={{ color: '$text' }}> 
                        Choose a Category 
                    </Text>
                 </Label>
                <SlugCategorySelector />
                <SuggestedSlugs 
                    saltLength={saltLength}
                    numStrings={numStrings}
                    separator={separator}
                    saltType={saltTypes[saltTypeIndex]}
                />
            </UrlFieldSet>
        </Flex>
    )   
}

export default SlugTabContent
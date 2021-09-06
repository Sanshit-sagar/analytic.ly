import React, { useState } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { FilterFieldset, Label, Input } from '../../primitives/FieldSet' 

import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

interface INumberFieldProps {
    label: string | string[] | undefined | null;
    value: number | string;
    handleUpdate: (value: number) => void;  
}

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


interface ISuggestedSlugsProps {
    saltLength: number; 
    numStrings: number; 
    saltType: 'number' | 'string' | 'mixed' | undefined;
    separator: string; 
    isManly?: boolean 
}

const SlugCategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
            
    return (
        <Flex css={{ width: '200px', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
            <SelectRoot
                open={isOpen || false}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger>
                    <Text size='1'> 
                        {slugCategoryOptions[selectedIndex]?.category} 
                        <ChevronDownIcon />
                    </Text>
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

const SuggestedSlug  = ({ saltLength, numStrings, separator, saltType }: ISuggestedSlugsProps) => {
    let isManly = false; 
    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly });

    if(loading) return <Text size='1'> loading... </Text>
    if(error) return <Text size='1'> error! {error.message} </Text>

    return (
        <Text size='1' css={{ width: 'flex', display: 'inline-flex', flexWrap: 'nowrap', color: '$text'}}>
            {suggestion}
        </Text>
    )
}

const NumericalFieldSet = ({ label, value, handleUpdate }: INumberFieldProps) => {

    return (
        <FilterFieldset> 
            <Label> {label} </Label>
            <Input 
                type="number"
                key={`label-${label}`}
                value={value} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdate(event.currentTarget.value)}
            />
        </FilterFieldset>
    )
}

const saltTypes = ['number', 'string', 'mixed', 'undefined']
                
const SlugTabContent = () => {
    const [saltLength, setSaltLength] = useState(2)
    const [numStrings, setNumStrings] = useState(3)
    const [separator, setSeparator] = useState('#')
    const [saltTypeIndex, setSaltTypeIndex] = useState(0)

    return (
        <Flex css={{  fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1'}}>
            <SlugCategorySelector />

            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$1' }}>
                <Text size='1'> Custom </Text>
                <NumericalFieldSet
                    label={`NumStrings`}
                    value={numStrings} 
                    handleUpdate={(value: number) => {
                      setNumStrings(value);
                    }}
                />

                <NumericalFieldSet 
                    label={`SaltLen`}
                    value={saltLength} 
                    handleUpdate={(value: number) => {
                      setSaltLength(value);
                    }}
                />

                <SuggestedSlug 
                    saltLength={saltLength} 
                    numStrings={numStrings} 
                    separator={separator} 
                    saltType={saltTypes[saltTypeIndex]} 
                />    
            </Flex>
        </Flex>
    )   
}

export default SlugTabContent
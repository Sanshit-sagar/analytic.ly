import React from 'react'
import { PrimitiveAtom, useAtom } from 'jotai'

import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectRadioGroup, 
    SelectRadioItem
} from '../primitives/Select'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { SelectionOption } from './interfaces'

import { ChevronDownIcon } from '@radix-ui/react-icons'

interface IntervalProps {
    menuName: string;
    openAtom: PrimitiveAtom<boolean>;
    selectedIndexAtom: PrimitiveAtom<number>; 
    selectionOptions: SelectionOption[];
}

export const Select = ({ 
    menuName, 
    openAtom, 
    selectedIndexAtom,
    selectionOptions,
}: IntervalProps) => {    

    const [selectOpen, setSelectOpen] = useAtom(openAtom)
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom); 
           
    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <SelectRoot
                open={selectOpen || false}
                onOpenChange={() => setSelectOpen(!selectOpen)}
            >
                <SelectTrigger>
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                        {selectionOptions[selectedIndex].label} 
                        <ChevronDownIcon />
                    </Flex>
                </SelectTrigger>

                <SelectContent>
                    <SelectRadioGroup>
                        {selectionOptions.map((option: SelectionOption, index: number) => {
                            return (
                                <SelectRadioItem
                                    key={index}
                                    onSelect={() => setSelectedIndex(index)}
                                    css={{ textTransform: 'uppercase' }}
                                >
                                    <Text size='1'>{option.label}</Text> 
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    )
} 



import React from 'react'
import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectRadioGroup, 
    SelectRadioItem
} from '../../primitives/Select'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { SelectionOption } from './index'

import { ChevronDownIcon } from '@radix-ui/react-icons'

import { Atom, useAtom } from 'jotai'

interface IntervalProps {
    menuName: string;
    openAtom: Atom<boolean>;
    selectedIndexAtom: Atom<number>;
    selectionOptions: SelectionOption[];
}

const SelectMenu = ({ 
    menuName, 
    openAtom, 
    selectedIndexAtom,
    selectionOptions,
}: IntervalProps) => {    

    const [selectOpen, setSelectOpen] = useAtom(openAtom)
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom); 
    const toggleSelectOpen = (event: React.ChangeEvent<IReadioItem.onSelect>) => {
        setSelectOpen(!selectOpen);
    }
    const handleSelection = ((event: React.ChangeEvent<IReadioItem.onSelect>) => setSelectedIndex(updatedIndex);

        
    return (
        <Box>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <Text size='1'> {menuName} </Text>

                <SelectRoot
                    open={selectOpen || false}
                    onOpenChange={toggleSelectOpen}
                >
                    <SelectTrigger>
                        <Box  css={{  width: '100%', padding: '$1', bc: 'white' }}>
                            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                                <Text 
                                    size='1' 
                                    css={{ textTransform: 'uppercase' }}
                                > 
                                    {selectionOptions[selectedIndex].label} 
                                </Text>
                                <ChevronDownIcon />
                            </Flex>
                        </Box>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectRadioGroup>
                            {selectionOptions.map((option: SelectionOption, index: number) => {
                                return (
                                    <SelectRadioItem
                                        id={index}
                                        key={index}
                                        value={index}
                                        onSelect={handleSelection}
                                        css={{ textTransform: 'uppercase' }}
                                    >
                                        <Text size='1'>{option.label}</Text> 
                                    </SelectRadioItem>
                                )
                            })}
                        </SelectRadioGroup>
                    </SelectContent>
                </SelectRoot>
            </Flex>
        </Box>
    );
}

export default SelectMenu

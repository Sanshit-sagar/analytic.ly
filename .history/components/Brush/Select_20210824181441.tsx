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

import { useAtom } from 'jotai'

interface IntervalProps {
    menuName: string;
    openAtom: any;
    selectedIndexAtom: any;
    selectionOptions: SelectionOption[];
    disabledKeys: { id: number, label: string }[];
}

const SelectMenu = ({ 
    menuName, 
    openAtom, 
    selectedIndexAtom, 
    selectionOptions,
    disabledKeys
}: IntervalProps) => {    

    const [selectOpen, setSelectOpen] = useAtom(openAtom)
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom); 

    const toggleSelectOpen = () => setSelectOpen(!selectOpen);
    const handleSelection = (updatedIndex: number) => setSelectedIndex(updatedIndex);

    const isDisabled = (index: number) => {
        return disabledKeys.map
    }

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
                                        key={index}
                                        onSelect={() => handleSelection(index)}
                                        css={{ textTransform: 'uppercase'}}
                                    >
                                        <Text size='1'> 
                                            {option.label}
                                        </Text> 
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

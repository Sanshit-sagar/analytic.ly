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

import { ChevronDownIcon } from '@radix-ui/react-icons'

import { useAtom } from 'jotai'

interface IntervalProps {
    menuName: string;
    openAtom: any;
    selectedIndexAtom: any;
    selectedStrAtom: any;
    selectionOptions: string[];
}

const SelectMenu = ({ 
    menuName, 
    openAtom, 
    selectedIndexAtom, 
    selectedStrAtom, 
    selectionOptions 
}: IntervalProps) => {

    const [selectOpen, setSelectOpen] = useAtom(openAtom)
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom); 
    const [selectedIndexStr] = useAtom(selectedStrAtom); 

    const toggleSelectOpen = () => {
        setSelectOpen(!selectOpen) 
    }

    const handleSelection = (updatedIndex: number) => {
        setSelectedIndex(updatedIndex)
    }

    return (
        <Box css={{ height: '40px', width: '100px', margin: '$1' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'space-between', gap: '$1' }}>
                <Text size='1'> {menuName} </Text>

                <SelectRoot
                    open={selectOpen || false}
                    onOpenChange={toggleSelectOpen}
                >
                    <SelectTrigger>
                        <Box 
                            css={{  
                                width: '100%', padding: '$1', bc: 'transparent',
                                border: 'thin solid', borderColor: '$hiContrast', br: '$1' }}
                        >
                            <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$1' }}>
                                <Text size='1'> {selectedIndexStr} </Text>
                                <ChevronDownIcon />
                            </Flex>
                        </Box>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectRadioGroup>
                            {selectionOptions.map((name: string, index: number) => {
                                return (
                                    <SelectRadioItem
                                        key={index}
                                        onSelect={() => handleSelection(index)}
                                        css={{ '&:hover': { bc: 'blue' }  }}
                                    >
                                        {name}
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

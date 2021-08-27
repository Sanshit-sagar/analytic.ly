import React from 'react';
import { useAtom, atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'
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

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 

const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))
const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)

const Interval:React.FC = () => {
    const [selectOpen, setSelectOpen] = useAtom(selectOpenAtom)
    const [interval, setInterval] = useAtom(intervalAtom); 
    const [intervalStr] = useAtom(intervalStrAtom); 


    const toggleSelectOpen = () => {
        setSelectOpen(!selectOpen) 
    }

    const handleSelection = (updatedIndex: number) => {
        setInterval(updatedIndex)
    }

    return (
        <Box css={{ height: '40px', width: '100px', margin: '$1' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'space-between', gap: '$1' }}>
                <Text size='1'> Interval </Text>

                <SelectRoot
                    open={selectOpen}
                    onOpenChange={toggleSelectOpen}
                >
                    <SelectTrigger>
                        <Box 
                            css={{  paddi, bc: 'transparent',
                            border: 'thin solid', borderColor: '$hiContrast', br: '$1' }}
                        >
                            <Flex css={{ fd: 'row', jc: 'row', ai: 'stretch'}}>
                                <Text size='1'> {intervalStr} </Text>
                                <ChevronDownIcon />
                            </Flex>
                        </Box>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectRadioGroup>
                            {intervalOptions.map((intervalLabel: string, index: number) => {
                                return (
                                    <SelectRadioItem
                                        key={index}
                                        onSelect={() => handleSelection(index)}
                                        css={{ '&:hover': { bc: 'blue' }  }}
                                    >
                                        {intervalLabel}
                                    </SelectRadioItem>
                                )
                            })}
                        </SelectRadioGroup>
                    </SelectContent>
                </SelectRoot>
            </Flex>
        </Box>
    )

}

const Amount:React.FC = () => {
    const [amount, setAmount] = useAtom(amountAtom); 
    const [amountNumber] = useAtom(amountNumberAtom);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAmount(event.currentTarget.value); 
    }

    return (
        <>
            <label> Amount: {`${amountNumber}`} </label>
            <input 
                id='amount'
                type='number'
                value={amount}
                onChange={handleInputChange}
            />
        </>
    )
} 

const Timeseries:React.FC = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
           
                <Amount />
                <Interval />
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries
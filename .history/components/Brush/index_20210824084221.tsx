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

let intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month']

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { ChevronDownIcon } from '@radix-ui/react-icons'

const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))
const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)

const Interval:React.FC = () => {
    const [selectOpen, setSelectOpen] = useAtom(selectOpenAtom)
    const [interval, setInterval] = useAtom(intervalAtom); 
    const [intervalStr] = useAtom(intervalStrAtom); 


    const toggleSelectOpen:React.FC = (): void => {
        setSelectOpen(!selectOpen) 
    }

    const handleSelection:React.FC<number> = (updatedIndex: number): void => {
        setInterval(updatedIndex)
    }

    return (
        <SelectRoot
            open={selectOpen}
            onOpenChange={toggleSelectOpen}
        >
            <SelectTrigger>
                <Flex css={{ fd: 'row', jc: 'row', ai: 'stretch'}}>
                    <Text size='1'> {interval}:{intervalStr} </Text>
                    <ChevronDownIcon />
                </Flex>
            </SelectTrigger>
            <SelectContent>
                <SelectRadioGroup>
                    {intervalOptions.map((intervalLabel: string, index: number) => {
                        return (
                            <SelectRadioItem
                                key={index}
                                onSelect={handleSelection}
                                css={{ '&:hover': { bc: 'blue' }  }}
                            >
                                {intervalLabel}    
                            </SelectRadioItem>
                        )
                    })}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
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
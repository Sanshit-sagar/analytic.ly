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

const amountAtom  = atom('1')
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))
const intervalAtom = atom(0)
const intervaStrAtom = atom((get) => intervalMap[get(intervalAtom)])

const: Interval:React.FC = () => {
    const [interval, setInterval] = useAtom(intervalAtom); 
    const [intervalStrAtom] = useAtom(intervalStrAtom); 
    

    return (
        <SelectRoot>
            <SelectTrigger>

            </SelectTrigger>
            <SelectContent>
                <SelectRadioGroup>
                    {intervalOptions.map((intervalLabel: string, index: number) => {
                        return (
                            <SelectRadioItem>
                                <Box as="button" onClick={handleSelection}>
                                    {intervalLabel}    
                                </Box> 
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

            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries
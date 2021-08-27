import React from 'react';
import { useAtom, atom } from 'jotai'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

const amountAtom  = atom('1)
const amountStrAtom = atom((get) => `${get(amountAtom)}`)

const Amount:React.FC = () => {
    const [amount, setAmount] = useAtom(amountAtom); 
    const [amountStr] = useAtom(amountStrAtom);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAmount(event.currentTarget.value); 
    }

    return (
        <>
            <label> Amount: {amountStr} </label>
            <input 
                id='amount'
                type='number'
                value={amount}
                onChange={handleInputChange}
            />
        </>
    )
}

const Timeseries:React.FC<> = () => {

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
           
                <Amount />

            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries
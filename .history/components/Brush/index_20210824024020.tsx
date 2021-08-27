import React from 'react';
import { useAtom, atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

import { getRangeBoundaries } from '../../lib/utils/d3time


const amountAtom  = atom('1')
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))
const rangeAtom = atom('week')
const rangeStartAtom = atom((get) => get(rangeAtom) )

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

const Range:React.FC = () => {


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
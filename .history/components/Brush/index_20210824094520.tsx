import React from 'react';
import { useAtom, atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 

const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))

const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)

import SelectMenu from './Select'

const Amount:React.FC = ({ inputAtom, inputNumberAtom }) => {
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
                <SelectMenu 
                    menuName={'Interval'} 
                    openAtom={selectOpenAtom} 
                    selectedIndexAtom={intervalAtom} 
                    selectedStrAtom={intervalStrAtom} 
                    selectionOptions={intervalOptions}
                />
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries
import React from 'react';
import { atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator
} from '../../primitives/Toolbar'

import SelectMenu from './Select'
import NumberInput from './NumberInput'
import FieldSet from '../../compositions/FieldSet'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 
const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))

const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)


const Timeseries:React.FC = () => {
   handleChange = () => {
   nsole.log('Changed!')
   

    return (
        <DashboardDisplayBox>
            <VisxParentSizeWrapper> 
                <Toolbar>
                     <NumberInput 
                         inputAtom={amountAtom}
                         inputNumberAtom={amountNumberAtom}
                     />
                     <SelectMenu 
                         menuName={'Interval'} 
                         openAtom={selectOpenAtom} 
                         selectedIndexAtom={intervalAtom} 
                         selectedStrAtom={intervalStrAtom} 
                         selectionOptions={intervalOptions}
                     />
                     <ToolbarSeparator /> 

                     <ToolbarButton
                        css={{ marginLeft: 'auto'}}
                    />

                    <FieldSet />                    

                </Toolbar>
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries
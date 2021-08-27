import React from 'react';
import { atom } from 'jotai'

import {
    DashboardDisplayBox,
    VisxParentSizeWrapper
} from '../../primitives/Shared'

import {
    Toolbar,
    ToolbarButton,
    ToolbarSeparator,
    ToolbarToggleGroup, 
    ToolbarToggleItem
} from '../../primitives/Toolbar'

import SelectMenu from './Select'
import NumberInput from './NumberInput'

const intervalOptions = ['millisecond', 'second', 'min', 'hour', 'day', 'week', 'month'] 
let toolbarOptions = [
    { id: 0, value: 'browser', label: 'Browser', width: '45px' },
    { id: 1, value: 'os', label: 'Operating System', width: '100px' },
    { id: 2, value: 'engine', label: 'Engine', width: '45px' },
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '80px' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '70px' },
    { id: 5, value: 'country', label: 'Country', width: '50px' },
    { id: 5, value: 'ip', label: 'IP Address', width: '60px' },
]; 

const amountAtom  = atom(0)
const amountNumberAtom = atom((get) => parseInt(`${get(amountAtom)}`))

const intervalAtom = atom(0)
const intervalStrAtom = atom((get) => intervalOptions[get(intervalAtom)])
const selectOpenAtom = atom(false)

const ToolbarMenu = () => {

    return (
        <Toolbar>
            
        </Toolbar>
    )
}




const Timeseries:React.FC = () => {

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

                    <ToolbarToggleGroup type='single'>
                        <ToolbarToggleItem value='one' as='select'> 
                            <option> one</option> one 
                        </ToolbarToggleItem>    
                        <ToolbarToggleItem value='two'> two </ToolbarToggleItem>
                    </ToolbarToggleGroup>

                </Toolbar>
            </VisxParentSizeWrapper>
        </DashboardDisplayBox>
    )
}

export default Timeseries
import React, { useState } from "react"

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import {styled, css, keyframes, theme } from '../../stitches.config'

import SelectionMenu from '../RangeSelector'
import Timeseries from '../Timeseries'

 
const DashboardDisplayBox = styled('div', {
    height: '500px',
    width: '700px',
    border: '1px solid black',
    br: '$1',
    bc: '#fff',
    padding: '$1', 
    margin: '$1'
}); 

export interface WrapperProps {
    clicks: any;
    range: string;
    interval: string;
    numPeriods: number;
    numClicks: number; 
    amount: string;
    loading: boolean;
    error: any
}

const Wrapper = () => {
    const [amount, setAmount] = useState('1')
    const [range, setRange] = useState('day')
    const [interval, setInterval] = useState('hour')
    const [darkMode, setDarkMode] = useState(true)

    const toggleDarkMode = () => darkMode ? setDarkMode(false) : setDarkMode(true);
    const handleRangeUpdate = (updatedRange: string): void =>  setRange(updatedRange.toLowerCase());
    const handleAmountUpdate = (updatedAmount: string): void => setAmount(updatedAmount.toLowerCase()); 
    const handleIntervalUpdate = (updatedInterval: string): void => setInterval(updatedInterval.toLowerCase()); 

    return (
        <DashboardDisplayBox>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1', padding: '$1' }}>
                <SelectionMenu
                    amount={amount} 
                    range={range} 
                    interval={interval}
                    darkMode={darkMode}
                    updateRange={handleRangeUpdate}
                    updateAmount={handleAmountUpdate}
                    updateInterval={handleIntervalUpdate}
                    toggleDarkMode={toggleDarkMode}
                />    
                <Timeseries 
                    amount={amount} 
                    range={range} 
                    interval={interval}
                    darkMode={darkMode}
                    updateRange={handleRangeUpdate}
                    updateAmount={handleAmountUpdate}
                    updateInterval={handleIntervalUpdate}
                    toggleDarkMode={toggleDarkMode}
                />
            </Flex>
        </DashboardDisplayBox>
    )
}


export default Wrapper 
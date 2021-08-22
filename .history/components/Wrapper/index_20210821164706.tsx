import React, { useState } from "react"

import SelectionMenu from '../RangeSelector'
import Timeseries from '../Timeseries/AreaLine'
import { DashboardDisplayBox } from "../../primitives/Shared"

import UniqueBars from "../Bars"
import PieChart from '../Pie'

import { Flex } from '../../primitives/Flex'

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
    const handleAmountUpdate = (updatedAmount: string): void => setAmount(updatedAmount); 
    const handleIntervalUpdate = (updatedInterval: string): void => setInterval(updatedInterval.toLowerCase()); 

    return (
        <>
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <DashboardDisplayBox>
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
                    />
                </DashboardDisplayBox>

                <DashboardDisplayBox>
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
                    <UniqueBars />
                </DashboardDisplayBox>
            </Flex>

            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                <PieChart /> 
            </Flex>
        </>
    )
}


export default Wrapper 
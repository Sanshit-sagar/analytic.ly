import React, { useState } from "react"

import SelectionMenu from '../RangeSelector'
import Timeseries from '../Timeseries'
import { DashboardDisplayBox } from "../../primitives/Shared"


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
        </DashboardDisplayBox>
    )
}


export default Wrapper 
import React, { useState } from 'react'
import { darkTheme, theme as lightTheme } from '../../stitches.config'

import SelectionMenu from '../RangeSelector'
import Timeseries from '../Timeseries'

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
    const [range, setRange] = useState('week')
    const [interval, setInterval] = useState('day')
    const [darkMode, setDarkMode] = useState(true)

    const toggleDarkMode = () => darkMode ? setDarkMode(false) : setDarkMode(true);
    const handleRangeUpdate = (updatedRange: string): void =>  setRange(updatedRange.toLowerCase());
    const handleAmountUpdate = (updatedAmount: string): void => setAmount(updatedAmount); 
    const handleIntervalUpdate = (updatedInterval: string): void => setInterval(updatedInterval.toLowerCase()); 

    return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>
            <DashboardDisplayBox>
                <VisxParentSizeWrapper>
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
                </VisxParentSizeWrapper>
            </DashboardDisplayBox>
        </StyledAppContainer>
    )
}


export default Wrapper 
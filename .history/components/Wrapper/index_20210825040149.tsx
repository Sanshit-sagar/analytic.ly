import React, { useState } from 'react'
import { styled, darkTheme, theme as lightTheme } from '../../stitches.config'

import SelectionMenu from '../RangeSelector'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'
import Timeseries from '../Timeseries'
//
// StyledAppContainer = styled('div', {
   ight: '100vh',
   dth: '100%',
   rgin: '0',
   dding: '$2',
   ckgroundColor: '$hiContrast',
   rder: '0px',
   rderColor: 'transparent',
   splay: 'flex',
   exDirection: 'row', 
   stifyContent: 'flex-start', 
   ignItems: 'stretch', 
   p: '0',
   erflowY: 'hidden',
   erflowX: 'hidden',
// 
//
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
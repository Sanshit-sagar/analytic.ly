// import React, { useState } from 'react'
// import SelectionMenu from '../RangeSelector'
// import Timeseries from './XYGraph'

// import {
    // DashboardDisplayBox, 
    // VisxParentSizeWrapper 
// } from '../../primitives/Shared'

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
// 
// const Wrapper = () => {
    // const [amount, setAmount] = useState('1')
    // const [range, setRange] = useState('week')
    // const [interval, setInterval] = useState('day')
// 
    // const handleRangeUpdate = (updatedRange: string): void =>  setRange(updatedRange.toLowerCase());
    // const handleAmountUpdate = (updatedAmount: string): void => setAmount(updatedAmount); 
    // const handleIntervalUpdate = (updatedInterval: string): void => setInterval(updatedInterval.toLowerCase()); 
// 
    // return (
        // <DashboardDisplayBox>
            {/* <VisxParentSizeWrapper> */}
                {/* <SelectionMenu */}
                    // amount={amount} 
                    // range={range} 
                    // interval={interval}
                    // darkMode={darkMode}
                    // updateRange={handleRangeUpdate}
                    // updateAmount={handleAmountUpdate}
                    // updateInterval={handleIntervalUpdate}
                    // toggleDarkMode={toggleDarkMode}
                // />    
                {/* <Timeseries  */}
                    // amount={amount} 
                    // range={range} 
                    // interval={interval}
                    // darkMode={darkMode}
                // />
            {/* </VisxParentSizeWrapper> */}
        {/* </DashboardDisplayBox> */}
    // )
// }
// 


export default Wrapper 
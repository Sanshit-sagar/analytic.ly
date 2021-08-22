import React from 'react';

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Toolbar } from '../../primitives/Box'
import { ReloadIcon } from '@radix-ui/react-icons'
const BarController = () => {



    return (
        <>
        <UniqueBars />
        
    )
}

export default BarController

const SelectionMenu = ({ amount, range, interval, darkMode, updateAmount, updateRange, updateInterval, toggleDarkMode }: WrapperProps) => {
    const handleReload = () => toggleDarkMode(); 

    const { clicks, loading, error } = useClickHistoryForUser(amount, range, interval)
   
    if(error) return <p> error... </p>
    if(!clicks) return <p> no data </p> 
    
    return (
        <Box css={{ width: '100%' }}> 
            <Toolbar aria-label="Formatting options">
    
                <RangeSelector
                    loading={loading}
                    metricName='Amount'
                    metricValue={amount}
                    handleUpdate={updateAmount}
                />
                <RangeSelector 
                    loading={loading}
                    metricName='Range'
                    metricValue={range} 
                    handleUpdate={updateRange} 
                />

                <RangeSelector
                    loading={loading}
                    metricName='Interval'
                    metricValue={interval}
                    handleUpdate={updateInterval}
                /> 
                
                <ToolbarSeparator />

                <ToolbarToggleGroup type="single">
                    <ToolbarToggleItem value={loading ? '' : "sec"}>
                        { loading ? <Loading /> : <Text size='1'> Sec </Text> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value={loading ? '' : "min"}>
                        { loading ? <Loading /> : <Text size='1'> Min </Text> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value={loading ? '' : "hour"}>
                        { loading ? <Loading /> : <Text size='1'> Hour </Text> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value={loading ? '' : "day"}>
                        { loading ? <Loading /> : <Text size='1'> Day </Text> }
                    </ToolbarToggleItem>
                </ToolbarToggleGroup>

                <ToolbarSeparator />

       
                <ToolbarButton 
                    as="button" 
                    onClick={handleReload} 
                    css={{ marginLeft: 'auto' }}
                >
                    <ReloadIcon />
                </ToolbarButton>
            </Toolbar>
        </Box>
    );
}

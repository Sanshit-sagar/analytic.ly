import React from 'react'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'

import { 
    Toolbar, 
    ToolbarLink, 
    ToolbarButton, 
    ToolbarSeparator 
} from '../../primitives/Toolbar'

import RangeSelector from './Selector'
import { useClickHistoryForUser } from '../../hooks/useClicks'

import { ReloadIcon } from '@radix-ui/react-icons'

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

              
                <ToolbarLink href="#" target="_blank" css={{ marginRight: 10 }}>
                    <Text size='1'> Edited 2 mins ago </Text>
                </ToolbarLink>
            
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

export default SelectionMenu


import React from 'react';

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { ReloadIcon } from '@radix-ui/react-icons'

import { DashboardDisplayBox } from '../../primitives/Shared'

import { 
  Toolbar, 
  ToolbarToggleGroup,
  ToolbarToggleItem
} from '../../primitives/Toolbar'


const BarController = () => {

    let options = [
          { id: 0, value: 'browser', label: 'Browser', width: '45px' },
          { id: 1, value: 'os', label: 'Operating System', width: '100px' },
          { id: 2, value: 'engine', label: 'Engine', width: '45px' },
          { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '80px' },
          { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '70px' },
          { id: 5, value: 'country', label: 'Country', width: '50px' },
          { id: 5, value: 'ip', label: 'IP Address', width: '60px' },
        ]; 
      
        return (
          <Box css={{ width: '100%' }}> 
            <Toolbar aria-label="Formatting options">
                <ToolbarToggleGroup type="multiple" aria-label="Text formatting">
                    <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}>
                    {options.map(function(option: any, index: number) {
                    return (
                        <ToolbarToggleItem 
                        as="button" 
                        key={index} 
                        onClick={() => updateFilter(option.value)}
                        css={{ border: 'thin solid black' }}
                        >
                            <Text size='1' css={{ width: option.width, color: filter===option.value ? 'rgba(1,10,100,1.0)' : 'black' }}>
                            {option.label}
                            </Text>
                        </ToolbarToggleItem>
                    );
                    })}
                </Flex>
                </ToolbarToggleGroup>
                </Toolbar>
            </Box>
        );

    return (
        <>
        <UniqueBars />
        </>       
    ); 
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

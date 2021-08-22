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

interface BarControllerProps {
    filter: string;
    updateFilter: any;
}

const BarController = ({ filter, updateFilter }: BarControllerProps) => {

    let options = [
        { id: 0, value: 'views per slug', label: 'Slugs' },
        { id: 1, values: 'uniques per slug', label: 'Uniques' },
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
                                    <Text 
                                        size='1' 
                                        css={{ 
                                            width: option.width, 
                                            color: filter===option.value ? 'rgba(1,10,100,1.0)' : 'black' 
                                        }}
                                    >
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
    
                <BarController /> 
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

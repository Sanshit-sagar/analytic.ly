import React, { useState } from 'react'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectRadioGroup, 
    SelectRadioItem
} from '../../primitives/Select'

import { ChevronDownIcon } from '@radix-ui/react-icons'

import { 
    Toolbar, 
    ToolbarToggleGroup,
    ToolbarToggleItem, 
    ToolbarLink, 
    ToolbarButton, 
    ToolbarSeparator 
} from '../../primitives/Toolbar'

import {
    FontBoldIcon,
    FontItalicIcon,
    StrikethroughIcon
} from '@radix-ui/react-icons'

import { Buffetting } from '../Buffetting'
import { useClickHistoryForUser } from '../../hooks/useClicks'

interface ISelectorProps {
    metricName: string,
    metricValue: string;
    handleUpdate: any;
    options?: string[];
    loading?: boolean;
    error?: any; 
}

const selectionOptions: any = {
    Interval: ['day','min','hour'],
    Range: ['day','min','hour'],
    Amount: ['1','2','3','4','5','6','7']
}

const RangeSelector = ({ 
    metricName, 
    metricValue, 
    handleUpdate, 
    options = [], 
    loading = false, 
    error = null 
}: ISelectorProps) => {
    const [open, setOpen] = useState(false);
    let items = options?.length ? options : selectionOptions[`${metricName}`];

    if(loading) return <p> loading... </p>
    if(error) return <p> error... </p>
    if(!items) return <p> no data </p>

    return (
        <SelectRoot  
            open={open} 
            onOpenChange={() => setOpen(!open)}
        >
            <SelectTrigger>
                <Box css={{ border: 'thin solid black', br: '$1', padding: '0 $1' }}>
                    <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center', gap: '$1'}}>
                        <Text size='1'> 
                            {metricValue} 
                        </Text>
                        <ChevronDownIcon />
                    </Flex>
                </Box>
            </SelectTrigger>
            <SelectContent>
                <SelectRadioGroup value={metricValue}>
                    {items.map((item: string, index: number) => {
                        return (
                            <SelectRadioItem  
                                key={index} 
                                onSelect={() => handleUpdate(item)}
                                css={{ '&:hover': { bc: 'blue' }  }}
                            >
                                <Box>
                                    <Text size='1'>
                                        {item} 
                                    </Text>
                                </Box>
                            </SelectRadioItem>
                        )
                    })}
                </SelectRadioGroup>
            </SelectContent>
        </SelectRoot>
    );
}

const SelectionMenu = ({ amount, range, interval, darkMode, updateAmount, updateRange, updateInterval, toggleDarkMode }: WrapperProps) => {
    const [updatedAt, setUpdatedAt] = useState(new Date(1970, 1, 1).getTime().toString());

    const update = (e) => {
        setUpdatedAt(new Date().getTime().toString());
        updateInterval(e);
    }
    const { clicks, loading, error } = useClickHistoryForUser(amount, range, interval)
   
    // if(loading) return <p> loading... </p> 
    if(error) return <p> error... </p>
    if(!clicks) return <p> no data </p> 
    
    return (
        <Box css={{ width: '100%', bc: '$hiContrast' }}> 
            <Toolbar aria-label="Formatting options">
                       
            
            
                <RangeSelector
                    metricName='Amount'
                    metricValue={amount}
                    handleUpdate={update}
                />
                <RangeSelector 
                    metricName='Range'
                    metricValue={range} 
                    handleUpdate={updateRange} 
                />
                <RangeSelector
                    metricName='Interval'
                    metricValue={interval}
                    handleUpdate={updateInterval}
                /> 
                
                <ToolbarSeparator />

                <ToolbarToggleGroup type="multiple">
                    <ToolbarToggleItem value="bold">
                        { loading ? <Buffetting /> : <FontBoldIcon /> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value="italic" aria-label="Italic">
                        { loading ? <Buffetting /> : <FontItalicIcon /> }
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value="strikethrough" aria-label="Strike through">
                        { loading ? <Buffetting /> : <StrikethroughIcon /> }
                    </ToolbarToggleItem>
                </ToolbarToggleGroup>

                <ToolbarSeparator />

               {updatedAt?.length &&
                    <ToolbarLink href="#" target="_blank" css={{ marginRight: 10 }}>
                        Edited 2 hours ago
                    </ToolbarLink>
                }
                <ToolbarButton css={{ marginLeft: 'auto' }}>
                    Reset
                </ToolbarButton>
            </Toolbar>
        </Box>
    );
}

export default SelectionMenu


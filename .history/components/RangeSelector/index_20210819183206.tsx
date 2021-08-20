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
        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                <Text size='1'> {metricName} </Text>
            
                <SelectRoot  
                    open={open} 
                    onOpenChange={() => setOpen(!open)}
                >
                    <SelectTrigger>
                        <Box css={{ bc: 'white', border: 'thin solid black', br: '$2', padding: '$1 $2' }}>
                            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center', gap: '$2'}}>
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
            </Flex>
        </Box>
    );
}

const SelectionMenu = ({ amount, range, interval, darkMode, updateAmount, updateRange, updateInterval, toggleDarkMode }: WrapperProps) => {
    
    const { clicks, loading, error, endpoint } = useClickHistoryForUser(amount, range, interval)
   
    if(loading) return <p> loading... </p> 
    if(error) return <p> error... </p>
    if(!clicks) return <p> no data </p> 
    
    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center' }}>
            <Text size='1'> {endpoint} </Text>
            
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


            <RangeSelector
                metricName='Amount'
                metricValue={amount}
                handleUpdate={updateAmount}
           />

            <Text size='1'> 
                {`[${clicks?.numClicks} / ${clicks?.numPeriods}]`} 
            </Text>
        </Flex>
    )
}

export default SelectionMenu






  // let intervals: IDatum[] = data.mergedIntervals;
    // let details = data.viewsByIntervals
    // let bounds: number = data.bounds
    // let numPeriods: number = data.numPeriods
    // let numClicks: number = data.numClicks
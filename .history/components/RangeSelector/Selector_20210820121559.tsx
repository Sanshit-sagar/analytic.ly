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

export default RangeSelector
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
import { useUniques, useClickHistoryForSlug } from '../../primitives/useClickHistoryForSlug'

interface IFacetControlProps {
    slug: string;
    amount: string;
    range: string;
    interval: string; 
    numPeriods: number;
    numClicks: number;
    updateSlug: any; 
    updateAmount: any;
    updateRange: any; 
    updateInterval: any;
}

interface ISelectorProps {
    metricName: string,
    metricValue: string;
    handleUpdate: any;
    options?: string[];
    loading?: boolean;
    error?: any; 
}

interface ISlugSelectorProps {
    slug: string;
    updateSlug: any; 
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


const SlugSelector = ({ slug, updateSlug }: ISlugSelectorProps) => {
    const { uniques, loading, error } = useUniques(); 

    return (
        <>
            <RangeSelector
                metricName='Slug'
                metricValue={slug}
                handleUpdate={updateSlug}
                options={loading ? [] : [...uniques?.map((unique: IUnique, _: number) => unique.title)]}
                loading={loading}
                error={error}
            />
        </>
    )
}

const SelectionGroup = () => {
    const [slug, setSlug] = useState('')
    const [amount, setAmount] = useState('1')
    const [range, setRange] = useState('day')
    const [interval, setInterval] = useState('hour')

    const handleSlugUpdate = (updatedSlug: string): void => setSlug(updatedSlug);
    const handleRangeUpdate = (updatedRange: string): void =>  setRange(updatedRange.toLowerCase());
    const handleIntervalUpdate = (updatedInterval: string): void => setInterval(updatedInterval.toLowerCase()); 
    const handleAmountUpdate = (updatedAmount: string): void => setAmount(updatedAmount.toLowerCase()); 

    const { data, loading, error } = useClickHistoryForSlug(slug, amount, range, interval); 

    if(loading) return <p> loading... </p> 
    if(error) return <p> error... </p>
    if(!data) return <p> no data </p> 
    
    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center' }}>

            <SlugSelector 
                slug={slug} 
                updateSlug={handleSlugUpdate} 
            />

            <RangeSelector 
                metricName='Range'
                metricValue={range} 
                handleUpdate={handleRangeUpdate} 
            />

            <RangeSelector
                metricName='Interval'
                metricValue={interval}
                handleUpdate={handleIntervalUpdate}
            />


            <RangeSelector
                metricName='Amount'
                metricValue={amount}
                handleUpdate={handleAmountUpdate}
           />

            <Text size='1'> 
                {`[${numClicks} / ${numPeriods}]`} 
            </Text>
        </Flex>
    )
}


export default SelectionGroup



  // let intervals: IDatum[] = data.mergedIntervals;
    // let details = data.viewsByIntervals
    // let bounds: number = data.bounds
    // let numPeriods: number = data.numPeriods
    // let numClicks: number = data.numClicks
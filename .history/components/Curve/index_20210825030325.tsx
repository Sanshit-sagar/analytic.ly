import React, { useState } from 'react'

import LineChart from './Line'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { ChevronDownIcon } from '@radix-ui/react-icons'

import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectRadioGroup, 
    SelectRadioItem
} from '../../primitives/Select'

import NoDataPlaceholder from './NoData'
import { useClickHistoryForSlug, useUniques } from '../../hooks/useClicks'

interface IDatum {
    x: string;
    y: number; 
}

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

interface IUnique {
    slug: string;
    score: number;
    rank: number;
    float: number; 
}

interface ISlugSelectorProps {
    slug: string;
    updateSlug: any; 
}

const DEFAULT_MARGIN = { top: 25, left: 25, bottom: 30, right: 10 }; 

const selectionOptions: any = {
    Interval: ['day','min','hour', 'second', ''],
    Range: ['day','min','hour', 'week', 'month'],
    Amount: ['1','2','3','4','5','6','7']
}

const ParamSelector = ({ metricName, metricValue, handleUpdate, options = [], loading = false, error = null }: ISelectorProps) => {
    const [open, setOpen] = useState(false);

    let items = options?.length ? options : selectionOptions[`${metricName}`];

    
    if(loading) return <p> loading... </p>
    if(error) return <p> error... </p>
    if(!options) return <Text size='1'> {metricName} </Text>

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
            <ParamSelector
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


const FacetControls = ({ slug, amount, range, interval, numClicks, updateSlug, numPeriods, updateAmount, updateRange, updateInterval }: IFacetControlProps) => {
    
    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center' }}>

            <SlugSelector 
                slug={slug} 
                updateSlug={updateSlug} 
            />

            <ParamSelector
                metricName='Amount'
                metricValue={amount}
                handleUpdate={updateAmount}
           />

            <ParamSelector 
                metricName='Range'
                metricValue={range} 
                handleUpdate={updateRange} 
            />

            <ParamSelector
                metricName='Interval'
                metricValue={interval}
                handleUpdate={updateInterval}
            />

            <Text size='2'> {`[${numClicks} / ${numPeriods}]`} </Text>
        </Flex>
    )
}

const Curve = () => {
    let defaultSlug = `brave-delay-damage-7rgys`;

    const [slug, setSlug] = useState(defaultSlug)
    const [amount, setAmount] = useState('1')
    const [range, setRange] = useState('day')
    const [interval, setInterval] = useState('hour')

    const handleSlugUpdate = (updatedSlug: string): void => setSlug(updatedSlug);
    const handleRangeUpdate = (updatedRange: string): void =>  setRange(updatedRange.toLowerCase());
    const handleIntervalUpdate = (updatedInterval: string): void => setInterval(updatedInterval.toLowerCase()); 
    const handleAmountUpdate = (updatedAmount: string): void => setAmount(updatedAmount.toLowerCase()); 

    const { data, loading, error } = useClickHistoryForSlug(slug, amount, range, interval); 

    if(loading) return <NoDataPlaceholder height={600} width={525} margin={DEFAULT_MARGIN} />
    if(error) return <p> error... </p>
    if(!data) return <NoDataPlaceholder height={600} width={525} margin={DEFAULT_MARGIN} />

    let intervals: IDatum[] = data.mergedIntervals;
    let details = data.viewsByIntervals
    let bounds: number = data.bounds
    let numPeriods: number = data.numPeriods
    let numClicks: number = data.numClicks
   
    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1', margin: '$1' }}>
            <Box css={{ height: '490px', width: '675px', border: 'thin solid black', br: '$2' }}>
                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                    <FacetControls
                        slug={slug}
                        amount={amount}
                        range={range}
                        interval={interval}
                        numPeriods={numPeriods}
                        numClicks={numClicks}
                        updateSlug={handleSlugUpdate}
                        updateAmount={handleAmountUpdate}
                        updateRange={handleRangeUpdate}
                        updateInterval={handleIntervalUpdate}
                    />
                    <Box css={{ height: '400px', width: '600px' }}>
                        <ParentSize>
                            {({ width, height }) => (
                                <LineChart 
                                    intervals={intervals}
                                    details={details}
                                    bounds={bounds}
                                    numClicks={numClicks}
                                    width={width} 
                                    height={height} 
                                    margin={DEFAULT_MARGIN}
                                />
                            )}
                        </ParentSize>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Curve
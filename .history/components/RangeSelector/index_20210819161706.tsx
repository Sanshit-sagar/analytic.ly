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

const FacetControls = ({ 
    slug, 
    amount, 
    range, 
    interval, 
    numClicks, 
    updateSlug, 
    numPeriods, 
    updateAmount, 
    updateRange, 
    updateInterval 
}: IFacetControlProps) => {
    
    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center' }}>

            <RangeSelector 
                slug={slug} 
                updateSlug={updateSlug} 
            />

            <RangeSelector
                metricName='Amount'
                metricValue={amount}
                handleUpdate={updateAmount}
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

            <Text size='1'> {`[${numClicks} / ${numPeriods}]`} </Text>
        </Flex>
    )
}


interface ISlugSelectorProps {
    slug: string;
    updateSlug: any; 
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


export default RangeSelector
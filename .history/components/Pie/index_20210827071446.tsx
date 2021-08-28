import React, { useState, useEffect } from 'react'

import { 
  Toolbar, 
  ToolbarToggleGroup,
  ToolbarToggleItem
} from '../../primitives/Toolbar'

import FreqPieChart from './Pie'
import { GraphSkeleton } from '../Skeletons'
import { ScrollArea } from '../../primitives/ScrollArea'
import { useFrequencies } from '../../hooks/useClicks'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

const DEFAULT_MARGIN = { top: 75, left: 50, bottom: 65, right: 30 };

interface Datum {
  title: string;
  score: string;
  rank: string;
}

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: typeof DEFAULT_MARGIN;
  animate: boolean;
};

interface PieControllerProps {
  filter: string;
  updateFilter: any;
};

const PieController = ({ filter, updateFilter }: PieControllerProps) => {
  let options = [
    { id: 0, value: 'browser', label: 'Browser', width: '45px' },
    { id: 1, value: 'os', label: 'Operating System', width: '100px' },
    { id: 2, value: 'engine', label: 'Engine', width: '45px' },
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '80px' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '70px' },
    { id: 5, value: 'country', label: 'Country', width: '50px' },
    { id: 6, value: 'ip', label: 'IP Address', width: '60px' },
    { id: 0, value: 'browser', label: 'Browser', width: '45px' },
    { id: 10, value: 'os', label: 'Operating System', width: '100px' },
    { id: 12, value: 'engine', label: 'Engine', width: '45px' },
    { id: 13, value: 'httpProtocol', label: 'HTTP Protocol', width: '80px' },
    { id: 14, value: 'tlsVersion', label: 'TLS Version', width: '70px' },
    { id: 15, value: 'country', label: 'Country', width: '50px' },
    { id: 16, value: 'ip', label: 'IP Address', width: '60px' },
  ]; 

  return (

        <Toolbar aria-label="Formatting options">
            <ToolbarToggleGroup type="single" aria-label="Text formatting">
                <ScrollArea css={{ bc: 'transparent', width: '100%' }}> 
                    <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch', maxWidth: '450px' }}>
                        {options.map(function(option: any, index: number) {
                            return (
                                <ToolbarToggleItem
                                    as="button"
                                    key={index} 
                                    onClick={() => updateFilter(option.value)}
                                    value={filter}
                                >
                                    {option.label}
                                </ToolbarToggleItem>
                            );
                        })}
                    </Flex>
                </ScrollArea>
            </ToolbarToggleGroup>
        </Toolbar>
  );
}

const PieChart = () => {
    const freqsForCategory: any = {};
    const [filter, setFilter] = useState('httpProtocol')
    const [activeFreqs, setActiveFreqs] = useState([]); 

    useEffect(() => {
        if(freqsForCategory[filter] && !activeFreqs.length) {
            setActiveFreqs([...freqsForCategory[filter]]);
        }
    }, [freqsForCategory, filter, activeFreqs]);

    const handleFilterUpdate = (updatedFilter: string) => {
        setFilter(updatedFilter); 
        if(freqsForCategory[updatedFilter]) {
            setActiveFreqs([...freqsForCategory[updatedFilter]]);
        }
    }

    const { freqs, loading, error } = useFrequencies()

    if(loading) return <GraphSkeleton />
    if(error) return <p> error </p>

    Object.keys(freqs).map((category: string, _: number) => {
        freqsForCategory[category] = [...freqs[category]]
    });

    return (
        <VisxParentSizeWrapper>
            <PieController 
                filter={filter}
                updateFilter={handleFilterUpdate} 
            /> 
            <ParentSize>
                {({ width, height }) => {
                return (
                    <FreqPieChart
                        freqs={activeFreqs}
                        width={width} 
                        height={Math.floor(height * 0.99)} 
                        margin={DEFAULT_MARGIN}
                    />
                );
                }}
            </ParentSize>
        </VisxParentSizeWrapper>
    );
}

export default PieChart
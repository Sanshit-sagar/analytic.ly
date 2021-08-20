import React, { useState } from "react"

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'

import { useFrequencies } from '../../hooks/useClicks'
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import FreqPieChart from './Pie'

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

interface Datum {
  title: string;
  score: string;
  rank: string;
}

export type PieProps = {
  freqs: Datum[];
  width: number;
  height: number;
  margin: typeof defaultMargin;
  animate: boolean;
};

interface PieControllerProps {
  updateFilter: any;
};

const PieController = ({ updateFilter }: PieControllerProps) => {
  let options = [
    { id: 0, value: 'browser', label: 'Browser' },
    { id: 1, value: 'os', label: 'Operating System' },
    { id: 2, value: 'engine', label: 'Engine' },
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version' },
    { id: 5, value: 'country', label: 'Country' },
  ]; 

  return (
    <Box css={{ bc: 'white', border: 'thin solid black', br: '$1', padding: '$1', width: '100%', height: '40px' }}>
      <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch'}}>
        {options.map(function(option: any, index: number) {
          return (
            <Button
              key={index}
              onClick={() => updateFilter(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </Flex>
    </Box>
    
  )
}

const PieChart = () => {
  const [filter, setFilter] = useState('httpProtocol')
  const handleFilterUpdate = (updatedFilter: string) => setFilter(updatedFilter); 

  const { freqs, loading, error } = useFrequencies('httpProtocol')

  if(loading) return <p> loading...</p>
  if(error) return <p> error </p>

  return (
    <Box css={{ height: '500px', width: '500px' }}> 
      <PieController 
        updateFilter={handleFilterUpdate} 
      /> 
      <ParentSize>
        {({ width, height }) => {
          return (
            <FreqPieChart 
              freqs={freqs}
              width={width} 
              height={height} 
              updateFilter={handleFilterUpdate}
              animate={true}
              margin={defaultMargin}
            />
          )
        }}
      </ParentSize>
    </Box>
  )
}

export default PieChart
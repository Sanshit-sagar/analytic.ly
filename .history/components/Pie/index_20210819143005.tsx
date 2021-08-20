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

const PieController = () => {

  return (
    <Box css={{ bc: 'white', border: 'thin solid black', br: '$1', padding: '$1', width: '100%', height: '40px' }}>
      <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch'}}>
        <Button> click me </Button>
        <Button> click me 2 </Button>
        <Button> click me 3 </Button> 
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
      <PieController /> 
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
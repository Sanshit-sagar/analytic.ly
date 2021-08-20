import React, { useState } from "react"

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
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
  filter: string;
  updateFilter: any;
};

const PieController = ({ filter, updateFilter }: PieControllerProps) => {
  let options = [
    { id: 0, value: 'browser', label: 'Browser', width: '60px' },
    { id: 1, value: 'os', label: 'Operating System', width: '100px' },
    { id: 2, value: 'engine', label: 'Engine', width: '60px' },
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '100px' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '100px' },
    { id: 5, value: 'country', label: 'Country', width: '60px' },
  ]; 

  return (
      <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>
        {options.map(function(option: any, index: number) {
          return (
            <Button
              size='large'
              key={index}
              onClick={() => updateFilter(option.value)}
              css={{ padding: '$1 $3', bc: filter===option.value ? 'black' : 'white' }}
            >
              <Text size='1' css={{ width: option.width, color: filter===option.value ? 'white' : 'black' }}>
                {option.label}
              </Text>
            </Button>
          );
        })}
      </Flex>
  )
}

const PieChart = () => {
  const [filter, setFilter] = useState('httpProtocol')
  const handleFilterUpdate = (updatedFilter: string) => setFilter(updatedFilter); 

  const { freqs, loading, error } = useFrequencies(filter)

  if(loading) return <p> loading...</p>
  if(error) return <p> error </p>

  return (
    <Box css={{ height: '500px', width: '700px', border: '1px solid black', br: '$1', bc: '#fff', padding: '$1', margin: '$1'}}>
      <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
        <Box css={{ height: '275px', width: '275px'}}>
            <PieController 
              filter={filter}
              updateFilter={handleFilterUpdate} 
            /> 
            <ParentSize>
              {({ width, height }) => {
                return (
                  <FreqPieChart 
                    freqs={freqs}
                    width={0.95*width} 
                    height={0.95*height} 
                    updateFilter={handleFilterUpdate}
                    animate={true}
                    margin={defaultMargin}
                  />
                )
              }} 
            </ParentSize>
          </Box>
      </Flex>
    </Box>
  )
}

export default PieChart
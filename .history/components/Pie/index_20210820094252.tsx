import React, { useState } from "react"
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'
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

import { useFrequencies } from '../../hooks/useClicks'
import FreqPieChart from './Pie'

const defaultMargin = { top: 100, left: 100, bottom: 30, right: 10 };

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
    { id: 3, value: 'httpProtocol', label: 'HTTP Protocol', width: '95px' },
    { id: 4, value: 'tlsVersion', label: 'TLS Version', width: '95px' },
    { id: 5, value: 'country', label: 'Country', width: '60px' },
    { id: 5, value: 'ip', label: 'IP Address', width: '60px' },
  ]; 

  return (
    <Box css={{ width: '100%'}}> 
      <Toolbar aria-label="Formatting options">
        <ToolbarToggleGroup type="multiple" aria-label="Text formatting">
          <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}>
          {options.map(function(option: any, index: number) {
            return (
              <div key={index}>
                <ToolbarToggleItem>
                  <Text size='1' css={{ width: option.width, color: filter===option.value ? 'white' : 'black' }}>
                    {option.label}
                  </Text>
                </ToolbarToggleItem>
              </div>
            );
          })}
        </Flex>
       </ToolbarToggleGroup>
       </Toolbar>
    </Box>

  );
}

const PieChart = () => {
  const [filter, setFilter] = useState('httpProtocol')
  const handleFilterUpdate = (updatedFilter: string) => setFilter(updatedFilter); 

  const { freqs, loading, error } = useFrequencies(filter)

  if(loading) return <p> loading...</p>
  if(error) return <p> error </p>

  return (
     <Box css={{ height: '500px', width: '550px', border: 'thin solid black', br: '$1', mt: '$1' }}>
        <PieController 
          filter={filter}
          updateFilter={handleFilterUpdate} 
        /> 
        <ParentSize>
          {({ width, height }) => {
            return (
              <FreqPieChart 
                freqs={freqs}
                width={width} 
                height={height} 
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
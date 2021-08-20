import React from 'react';

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

import Curve from '../components/Curve'
import Timeseries from '../components/Timeseries'
import PieChart from '../components/Pie'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Box css={{ height: '100%', width: '100%' }}>
        <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
          <Curve />
          <Flex css={{ fd: 'column', jc: 'space-between', ai: 'stretch', maxHeight: '95vh'}}>
            <Timeseries />
            <PieChart /> 
          </Flex>
        </Flex>
      </Box>
    </main>
  );
}

export default Home


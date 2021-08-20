import React from 'react';

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

import PieChart from '../components/Pie'
import Timeseries from '../components/Timeseries'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>

      <Box css={{ height: '100%', width: '100%' }}>
        <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}>
          <Timeseries />
          <PieChart />
        </Flex>
      </Box>
    
    </main>
  );
}

export default Home


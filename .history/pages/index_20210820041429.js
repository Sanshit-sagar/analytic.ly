import React from 'react';

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

import PieChart from '../components/Pie'
import Wrapper from '../components/Wrapper'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%' }}>

      <Box css={{ height: '100%', width: '100%' }}>
        <Flex css={{ height: '150%', width: '150%' }}>
          <Wrapper />
          <PieChart />
        </Flex>
      </Box>
    
    </main>
  );
}

export default Home


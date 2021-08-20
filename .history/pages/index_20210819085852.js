import React from 'react';

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

import Curve from '../components/Curve'
import Timeseries from '../components/Timeseries'
import Scatter from '../components/Scatter'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Box css={{ height: '100%', width: '100%' }}>
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
          <Curve />
          <Timeseries />
          <Scatter /> 
        </Flex>
      </Box>
    </main>
  );
}

export default Home


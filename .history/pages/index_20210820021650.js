import React from 'react';

import { Box } from '../primitives/Box'
import Wrapper from '../components/Wrapper'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Box css={{ height: '100%', width: '100%' }}>
        <Wrapper />
      </Box>
    </main>
  );
}

export default Home


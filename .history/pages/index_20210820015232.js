import React from 'react';

import { Box } from '../primitives/Box'
// import Wrapper from '../components/Wrapper'
import PieChart from '../components/Pie'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Box css={{ height: '100%', width: '100%' }}>
        {/* <Wrapper /> */}
        <PieChart />
        <RankedBars />
      </Box>
    </main>
  );
}

export default Home


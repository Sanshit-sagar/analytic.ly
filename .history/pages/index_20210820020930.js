import React from 'react';

import { Box } from '../primitives/Box'
// import Wrapper from '../components/Wrapper'
import PieChart from '../components/Pie'
import RankedBars from '../components/Bars'

const Home = () => {

  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <Box css={{ height: '100%', width: '100%' }}>
        {/* <Wrapper /> */}
        <PieChart />
      </Box>
    </main>
  );
}

export default Home


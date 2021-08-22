import React from 'react';

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'

import PieChart from '../components/Pie'
import Wrapper from '../components/Wrapper'
import UniqueBars from '../components/Bars'

const Home = () => {

  return (
      <Box css={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
        <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch', flexWrap: 'wrap' }}>
          {/* <Wrapper />
          <PieChart /> */}
          <UniqueBars />  
        </Flex>
      </Box>
  );
}

export default Home


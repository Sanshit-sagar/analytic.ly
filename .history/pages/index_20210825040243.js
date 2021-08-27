import React from 'react';

import Timeseries from '../components/Timeseries' 
import { StyledAppContainer } from '../primitives/Shared';

const Home = () => {

  return (
        <StyledAppContainer>
            <Timeseries />
        </StyledAppContainer>
    );
}

export default Home;
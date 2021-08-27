import React from 'react';

import Timeseries from '../components/Timeseries' 
import { StyledAppContainer } from '../primitives/Shared';

const Home = () => {

  return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>
            <Timeseries />
        </StyledAppContainer>
    );
}

export default Home;
import React, { useState } from 'react';
// import { darkTheme, theme as lightTheme } from '../stitches.config'
// import Timeseries from '../components/Timeseries' 
import { StyledAppContainer } from '../primitives/Shared';
import GraphManager from '../components/GraphManager'

const Home = () => {
    // const [darkMode, setDarkMode] = useState(true)
    // const toggleDarkMode = () => darkMode ? setDarkMode(false) : setDarkMode(true);
    // className={!darkMode ? darkTheme : lightTheme
    return (
        <StyledAppContainer>
            {/* <Timeseries /> */}
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;
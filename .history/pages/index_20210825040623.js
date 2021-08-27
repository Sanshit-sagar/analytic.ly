import React, { useState } from 'react';
import { darkTheme, theme as lightTheme } from '../'
import Timeseries from '../components/Timeseries' 
import { StyledAppContainer } from '../primitives/Shared';

const Home = () => {
    const [darkMode, setDarkMode] = useState(true)
    
    const toggleDarkMode = () => darkMode ? setDarkMode(false) : setDarkMode(true);

    return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>
            <Timeseries />
        </StyledAppContainer>
    );
}

export default Home;
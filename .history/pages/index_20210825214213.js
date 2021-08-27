import React, { useState } from 'react';
import { darkTheme, theme as lightTheme } from '../stitches.config'
import { Atom, useAtom, atom } from 'jotai'

import { StyledAppContainer } from '../primitives/Shared'
import GraphManager from '../components/GraphManager'

const Home = () => {
    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = () => darkMode ? setDarkMode(false) : setDarkMode(true);
   
    return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;
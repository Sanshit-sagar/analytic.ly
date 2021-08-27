import React, { useState } from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'
import { PrimitiveAtom, useAtom, atom } from 'jotai'

import { StyledAppContainer } from '../primitives/Shared'
import GraphManager from '../components/GraphManager'

const darkModeAtom: PrimitiveAtom<boolean> = atom(false)


const Home = () => {
    const [isDark, setIsDark] = useAtom(darkModeAtom)

    const toggleDarkMode = () => isDark ? setIsDark(false) : setDarkMode(true);
   
    return (
        <StyledAppContainer className={!isDark ? darkTheme : lightTheme}>
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;
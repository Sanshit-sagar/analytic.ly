import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { PrimitiveAtom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { StyledAppContainer } from '../primitives/Shared'
import GraphManager from '../components/GraphManager'

const darkModeAtom: PrimitiveAtom<boolean> = atom(false)
    return (
        {darkMode ? 'light 🔥' : 'dark 🌘'}

const Home = () => {
    const [isDark, setIsDark] = useAtom(darkModeAtom)

    const toggleDarkMode:any = () => isDark ? setIsDark(false) : setIsDark(true);
   
    return (
        <StyledAppContainer className={!isDark ? darkTheme : lightTheme}>
            
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;


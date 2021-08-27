import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { StyledAppContainer } from '../primitives/Shared'
import GraphManager from '../components/GraphManager'

const darkModeAtom = atomWithStorage('darkMode', false);

const Home = () => {
    const [isDark, setIsDark] = useAtom(darkModeAtom)
   
    return (
        <StyledAppContainer className={!isDark ? darkTheme : lightTheme}>
            <GraphManager />
        </StyledAppContainer>
    );
}

export default Home;


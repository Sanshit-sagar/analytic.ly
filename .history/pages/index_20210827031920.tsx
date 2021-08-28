import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyledAppContainer } from '../primitives/Shared'
import { Box } from '../primitives/Box'

import LoremIpsum from '../components/LoremIpsum'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer className={!isDark ? 'darkTheme' : lightTheme}>     
            <button onClick={() => setDarkMode(!darkMode)}> dark mode </button> 
            <LoremIpsum />
            <p>{darkMode.toString()}</p> 
        </Box>
    );
}
   
export default Home;


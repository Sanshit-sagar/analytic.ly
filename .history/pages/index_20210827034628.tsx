import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyledAppContainer } from '../primitives/Shared'
import LoremIpsum from '../components/LoremIpsum'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>     
            <LoremIpsum />
            <p>{darkMode.toString()}</p> 
        </StyledAppContainer>
    );
}
   
export default Home;


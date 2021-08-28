import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyledAppContainer } from '../primitives/Shared'
import DarkMode from '../components/DarkMode'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, _] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer as='div' className={!darkMode ? darkTheme : lightTheme}>     
            <DarkMode />
        </StyledAppContainer>
    );
}
   
export default Home;


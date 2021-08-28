import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyledAppContainer } from '../primitives/Shared'
import LoremIpsum from '../components/LoremIpsum'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, _] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer as='className={!darkMode ? darkTheme : lightTheme}>     
            <LoremIpsum />
        </StyledAppContainer>
    );
}
   
export default Home;


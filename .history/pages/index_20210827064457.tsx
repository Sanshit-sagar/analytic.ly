import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyledAppContainer } from '../primitives/Shared'

import { Flex } from '../primitives/Flex'

import Header from '../componen
import Dashboard from '../components/Dashboard'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, _] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>
            <Dashboard />
        </StyledAppContainer>
    );
}
   
export default Home;


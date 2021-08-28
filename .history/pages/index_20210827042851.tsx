import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { StyledAppContainer } from '../primitives/Shared'

import Header from '../components/Header'
import Dashboard from '../components/Dashboard'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, _] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer className={!darkMode ? darkTheme : lightTheme}>     
            <Header />
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
                
            </Flex>
            <Dashboard />
        </StyledAppContainer>
    );
}
   
export default Home;


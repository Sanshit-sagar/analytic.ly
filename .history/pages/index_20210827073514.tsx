import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { StyledAppContainer } from '../primitives/Shared'
import Dashboard from '../components/Dashboard'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, _] = useAtom(darkModeAtom)
    const 

    return (
        <div 
            className={!darkMode ? darkTheme : lightTheme} 
            style={{ 
                height: '100vh',
                width: '100%',
                margin: '0',
                padding: '0',
                display: 'flex',
                backgroundColor: '',
                flexDirection: 'row',
                justifyContent: 'space-between', 
                alignItems: 'stretch',
                gap: '$1'
            }}
        >
            <Dashboard />
        </StyledAppContainer>
    );
}
   
export default Home;


import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { GlobalLayout } from '../primitives/Shared'
import Dashboard from '../components/Dashboard'

export const darkModeAtom = atomWithStorage('darkMode', false)
const mountedAtom = atom(true)

const Home = () => {
    const [darkMode, _] = useAtom(darkModeAtom)

    return (
        <GlobalLayout 
            className={!darkMode ? darkTheme : lightTheme} 
            children={<Dashboard />} 
        />
    );
}
   
export default Home;


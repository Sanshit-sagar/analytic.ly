import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import {  StyledAppContainer 
} from '../primitives/Shared'

import LoremIpsum from '../components/LoremIpsum'
import PieChart from '../components/Pie'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <StyledAppContainer classMode={darkMode ? darkTheme : lightTheme}>
            <button onClick={() => setDarkMode(!darkMode)}> dark mode </button> 
            <LoremIpsum />
            <p>{darkMode.toString()}</p> 
        </StyledAppContainer>
    );
}
   
export default Home;


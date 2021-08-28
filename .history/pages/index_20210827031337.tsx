import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { 
    GraphContainer,
    StyledAppContainer 
} from '../primitives/Shared'

import LoremIpsum from '../components/LoremIpsum'

// import { ScrollArea } from '../primitives/ScrollArea'
// import BrushedTimeseries from '../components/GraphManager'
import PieChart from '../components/Pie'
// import GroupedBars from '../components/Bars'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <StyledAppContainer classMode={darkMode ? darkTheme : lightTheme}>
            <button onClick={() => setDarkMode(!darkMode)}> dark mode </button> 
            <PieChart />
            <LoremIpsum />
            <p>{darkMode.toString()}</p> 
        </StyledAppContainer>
    );
}
   
export default Home;


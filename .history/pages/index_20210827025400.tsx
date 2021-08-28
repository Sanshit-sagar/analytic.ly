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
// import PieChart from '../components/Pie'
// import GroupedBars from '../components/Bars'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [isDark, setIsDark] = useAtom(darkModeAtom)
    const toggleDarkMode = () => setIsDark(!isDark);

    return (
        <>
       
            <button onClick={toggleDarkMode}> dark mode </button> 
             {/* <BrushedTimeseries />  */}
            <LoremIpsum />
        </>
    );
}
   
export default Home;


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
        <StyledAppContainer className={!isDark ? darkTheme : lightTheme}>
             {/* <BrushedTimeseries />  */}
             <>
                {Array.fill(50).map((_, i: number) => {
                    return ( 
                        <LoremIpsum />
                    );
                 })}
             </>
            {/* <ScrollArea> */}
                {/* <GraphContainer> */}
                    {/* <GroupedBars /> */}
                    {/* <PieChart /> */}
                {/* </GraphContainer> */}
            {/* </ScrollArea> */}
        </StyledAppContainer>
    );
}

export default Home;


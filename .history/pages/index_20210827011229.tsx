import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { 
    GraphContainer, 
    StyledAppContainer 
} from '../primitives/Shared'

import { ScrollArea } from '../primitives/ScrollArea'
import BrushedTimeseries from '../components/GraphManager'
import PieChart from '../components/Pie'
import GroupedBars from '../components/Bars'

export const darkModeAtom = atomWithStorage('darkMode', false)

const Home = () => {
    const [isDark, setIsDark] = useAtom(darkModeAtom)
    const toggleDarkMode = () => setIsDark(!isDark);

    return (
        <StyledAppContainer className={!isDark ? darkTheme : lightTheme}>
             <BrushedTimeseries /> 
             <Box css={{ height: 500, width: 500, }}> 

             </Box>
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


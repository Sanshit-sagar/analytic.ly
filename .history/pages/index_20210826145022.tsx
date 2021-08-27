import React from 'react'
import { darkTheme, theme as lightTheme } from '../stitches.config'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { GraphContainer, StyledAppContainer } from '../primitives/Shared'

import GraphContainer } fro
import GroupedBars from '../components/Bars'
import PieChart from '../components/Pie'

export const darkModeAtom = atomWithStorage('darkMode', true)

const Home = () => {
    const [isDark, setIsDark] = useAtom(darkModeAtom)
    const toggleDarkMode = () => setIsDark(!isDark);

    return (
        <StyledAppContainer className={!isDark ? darkTheme : lightTheme}>
            <GraphContainer>
                <GroupedBars darkMode={isDark} />
                <PieChart darkMode={isDark} />
            </GraphContainer>
        </StyledAppContainer>
    );
}

export default Home;


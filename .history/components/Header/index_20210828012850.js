import React, { useRef } from 'react' 
import { useRouter } from 'next/router'

import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Button } from '../../primitives/Button'
import { ScrollArea } from '../../primitives/ScrollArea'
import { ToggleButton } from '../../primitives/ToggleButton'

import { useAtom } from "jotai";
import { darkModeAtom } from '../../pages/index'

import { a, useSpring } from '@react-spring/web'

import { 
    SunIcon, 
    MoonIcon, 
    GlobeIcon, 
    BarChartIcon 
} from '@radix-ui/react-icons'

const HeaderContainer = styled('div', {
    height:'50px', 
    width: '325px', 
    bc: '$panel', 
    border: 'thin solid', 
    padding: '$1', 
    marginLeft: 'auto',  
    marginRight: '$3', 
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
});

const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <ToggleButton 
            aria-label='darkModeTr'
        onClick={() => setDarkMode(!darkMode)} css={{ padding: '$1' }}> 
            {!darkMode ? <SunIcon /> : <MoonIcon />} 
        </ToggleButton>
    )
}
 

const Header = () => {
    const router = useRouter(); 

    const handleNavigation = (newPath) => {
        alert('rerouting...')
    }

    return (
        <HeaderContainer>
           <DarkMode />

            <Button onClick={() => handleNavigation('timeseries')}>
                <BarChartIcon />
            </Button>

            <Button onClick={() => handleNavigation('geomap')}>
                <GlobeIcon />
            </Button>
        </HeaderContainer>
    );
}

export default Header;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
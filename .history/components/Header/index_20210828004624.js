import React, { useRef } from 'react' 
import { useRouter } from 'next/router'

import { styled } from '../../stitches.config'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'
import { Button } from '../../primitives/Button'

import { Provider, atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { darkModeAtom } from '../../pages/index'
import { valueAtom } from '../../compositions/ToggleGroup'

import { a, useSpring } from '@react-spring/web'

import { 
    SunIcon, 
    MoonIcon, 
    GlobeIcon, 
    BarChartIcon 
} from '@radix-ui/react-icons'

const Preset = () => {
    const [selectedValue, setSelectedValue] = useAtom(valueAtom);

    return (
        <Text> SELECTED: {selectedValue} </Text>
    )
}

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
// 
// const props = useSpring({ from: { count: 0 }, count, reset: true });
{/* <a.h1>{props.count.to(Math.round)}</a.h1>  */}
{/* <Controls />  */}

const DarkMode = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <Button onClick={() => setDarkMode(!darkMode)} css={{ padding: '$1' }}> 
            {!darkMode ? <SunIcon /> : <MoonIcon />} 
        </Button>
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
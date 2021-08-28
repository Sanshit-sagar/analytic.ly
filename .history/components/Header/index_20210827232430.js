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

const countAtom = atom(0);

const Counter = () => {
  const [count] = useAtom(countAtom);
  return (
    <Flex>
      <Text size='1'> (renders: {++useRef(0).current}) </Text>
    </Flex>
  );
};

const Controls = () => {
  const setCount = useUpdateAtom(countAtom);
  const inc = () => setCount((c) => c + 1);
  return (
    <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center', gap: '$2'}}>
        <Button onClick={inc} css={{ padding: '$1 $2', pl: '$1' }}> 
            <Text size='1'>+1</Text> 
        </Button>
        <Text size='1'>(renders: {++useRef(0).current})</Text> 
    </Flex>
  );
};

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
 

const Header = () => {
    const router = useRouter(); 
    const [count] = useAtom(countAtom)
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    const handleNavigation = (newPath) => {
        alert('rerouting...')
    }

    return (
        <HeaderContainer>
            <Button onClick={() => setDarkMode(!darkMode)} css={{ padding: '$1' }}> 
                {!darkMode ? <SunIcon /> : <MoonIcon />} 
            </Button>

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
import React, { useRef } from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'
import { Button } from '../../primitives/Button'

import { Provider, atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

import { darkModeAtom } from '../../pages/index'
import { valueAtom } from '../../compositions/ToggleGroup'

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

const Header = () => {
    const [count] = useAtom(countAtom)
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <Box css={{ height:'50px', width: '325px', bc: '$panel', border: 'thin solid', padding: '$2', marginLeft: 'auto',  mr: '$5', mt: '$1', br: '$1' }}>
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2'}}> 
                <Text size='1'> count: {`${count}  `} </Text>
                <Controls />
                <Button onClick={() => setDarkMode(!darkMode)} css={{ padding: '$1 $2', pl: '$1' }}> 
                  <Text size='1'> {darkMode ? '🔥' : ' 🌘'} </Text> 
                </Button>
                {/* <Counter /> */}
            
                <Preset />
            </Flex>
        </Box>
    );
}

export default Header;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
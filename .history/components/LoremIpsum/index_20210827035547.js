import React, { useRef } from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'
import { Button } from '../../primitives/Button'

import { Provider, atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

import { darkModeAtom } from '../../pages/index'

const countAtom = atom(0);

const Counter = () => {
  const [count] = useAtom(countAtom);
  return (
    <div>
      count: {count}
      (rendered: {++useRef(0).current})
    </div>
  );
};

const Controls = () => {
  const setCount = useUpdateAtom(countAtom);
  const inc = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={inc}>+1</button>
      (rendered: {++useRef(0).current})
    </div>
  );
};

const LoremIpsum = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)

    return (
        <Box css={{ height:'50px', width: '500px', bc: '$panel', border: 'thin solid', bc: '$hiContrast', padding: '$2', marginLeft: 'auto',  mr: '$5', mt: '$1', br: '$1' }}>
            <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'flex-end', ai: 'flex-start', gap: '$2'}}> 
                <Button onClick={() => setDarkMode(!darkMode)}> 
                    {darkMode ? '🔥' : ' 🌘'}
                </Button>
                <Counter />
                <Controls />
            </Flex>
        </Box>
    );
}

export default LoremIpsum;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
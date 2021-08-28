import React, { useRef } from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { Provider, atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

import darkModeAtom

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
        <> 
            <Counter />
            <Controls />
        </>
    );
}

export default LoremIpsum;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
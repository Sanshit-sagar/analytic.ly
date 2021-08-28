import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const counterAtom = atom(0)
const simpleCounterAtom = atom(0)

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

    return (
        <ScrollArea>      
            <Counter />
            <Controls />
        </ScrollArea>
    );
}

export default LoremIpsum;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
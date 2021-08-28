import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const counterAtom = atom(atom)
const simpleCounterAtom = atom(simpleCounterAtom)

const readOnlyCounter = () => {
    const [counter] = useAtom(counterAtom)
    const [simpleCounter] = useAtom(simpleCounterAtom)

    return (
        <Text> {counter} </Text> 
    );
}

const writeOnlyCounter = () => {
    const setCounter = useUpdateAtom(counterAtom);
    const [simpleCounter, setSimpleCounter] = useAtom(simpleCounterAtom); 

    return (
        <button 
            onClick={() => setCounter((counter) => counter + 1)}
        > 
            +1
        </button> 
        <button
            onClick={() => setSimpleCounter((simpleCounter) => simpleCounter + 1)}
    )
}

const LoremIpsum = () => {
    

    return (
        <ScrollArea>      
            
        </ScrollArea>
    );
}

export default LoremIpsum;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
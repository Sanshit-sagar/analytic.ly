import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const counterAtom = atom(0)
const simpleCounterAtom = atom(0)

const readOnlyCounter = () => {
    const [counter] = useAtom(counterAtom)
    const [simpleCounter] = useAtom(simpleCounterAtom)

    return (
        <Text> {counter} </Text> 
    );
}

const writeOnlyCounters = () => {
    const setCounter = useUpdateAtom(counterAtom);
    const [simpleCounter, setSimpleCounter] = useAtom(simpleCounterAtom); 

    return (
        <>
            <button 
                onClick={() => setCounter((counter) => counter + 1)}
            > 
                +1 [USEUPDATEATOM]
            </button> 
            <button
                onClick={() => setSimpleCounter((simpleCounter) => simpleCounter + 1)}
            >
                +1 [USEATOM]
            </button>
        </>
    )
}

const LoremIpsum = () => {
    const [counter] = useAtom(counterAtom)
    const [simpleCounter, _] = useAtom(simpleCounterAtom)

    return (
        <ScrollArea>      
            <Text size='1'> {counter} </Text>
            <Text size='1'> {simpleCounter} </Text>
            
        </ScrollArea>
    );
}

export default LoremIpsum;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
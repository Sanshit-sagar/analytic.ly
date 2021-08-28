import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const counterAtom = atom(atom)

const readOnlyCounter = () => {
    const [counter] = useAtom(counterAtom);

    return (
        <Text> {counter} </Text> 
    );
}

const writeOnlyCounter = () => {
    const setCounter = useUpdateAtom(counterAtom);

    return (
        <Text size='1'> {setCounter} </Text> 
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
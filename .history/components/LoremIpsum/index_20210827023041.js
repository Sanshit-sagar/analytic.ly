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
    const props = 

    return (
        <Text> {counter} </Text> 
    );
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
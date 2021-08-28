import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { Provider, atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

const LoremIpsum = () => {
    let lips = []; 
    let i;

    for(i=0; i<50; i++) {
        lips.push(`${loremIpsumDotText}`);
    }

    return (
        <ScrollArea>
      
            
                {lips.map((lip, i) => {
                    return (
                        <p>
                            {i}--{loremIpsumDotText}
                        </p> 
                    );
                })}
        
        </ScrollArea>
    );
}

export default LoremIpsum;

// writing-mode: tb-rl;
// font-variant-numeric: tabular-nums;
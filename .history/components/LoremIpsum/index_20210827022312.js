import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { ScrollArea } from '../../primitives/ScrollArea'

import { loremIpsumDotText } from './loremIpsumTxt'

const LoremIpsum = () => {
    let lips = []; 
    let i;

    for(i=0; i<3; i++) {
        lips.push(`${loremIpsumDotText}`);
    }

    return (
        <ScrollArea>
      
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}> 
                {lips.map((lip, i) => {
                    return (
                        <p>
                            {i}--{loremIpsumDotText}
                        </p> 
                    );
                })}
            </Flex>
        
        </ScrollArea>
    );
}

export default LoremIpsum;
import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { loremIpsumDotText } from './loremIpsumTxt'

const LoremIpsum = () => {
    let lips = []; 
    let i;

    for(i=0; i<50; i++) {
        lips.push(`${loremIpsumDotText}`);
    }

    return (
        <Box css={{ height: '500px', width: '100%'}}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}> 
                {lips.map((lip, i) {
                    return (
                        <Text size='1'>
                            {loremIpsumDotText}
                        </Text> 
                    ):
                })}
            </Flex>
        </Box>
    );
}

export default LoremIpsum;
import React from 'react' 

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { loremIpsumDotText } from './loremIpsumTxt'

const LoremIpsum = () => {

    return (
        <Box css={{ height: ''}}
        <Text size='1'>
            {loremIpsumDotText}
        </Text> 
    )
}
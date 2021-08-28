import React from 'react' 

import { lorem}

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { loremIpsumDotText } from './loremIpsumTxt'

const LoremIpsum = () => {

    return (
        <Text size='1'>
            {loremIpsumDotText}
        </Text> 
    )
}
import React from 'react' 
import { Text } from '../primitives/'

import { loremIpsumDotText } from './loremIpsumTxt'

const LoremIpsum = () => {

    return (
        <Text size='1'>
            {loremIpsumDotText}
        </Text> 
    )
}
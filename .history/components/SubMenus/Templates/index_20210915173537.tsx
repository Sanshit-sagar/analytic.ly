import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import { CustomTree } from '../../compositions/Tree'


const Templates = () => {

    return (
        <Box css={{ width: '100%', height: '100%', border: 'thin solid $border', bc: 'transparent', margin: '$1', padding: '$1' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                <Text size='$5'> Custom Tree </Text> 
                <CustomTree />
            </Flex>
        </Box> 
    )
}

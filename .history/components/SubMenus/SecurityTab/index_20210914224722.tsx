import React from 'react'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'

export const SecurityTabContent = () => {
   
    return (
        <Box css={{ height: '400px', width: '400px' }}>
            <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
                <Text> does it work ? yee </Text>
                <Meter
                    label={'Secur'}
                    value={meterValue}

            </Flex>
        </Box>

    )
}
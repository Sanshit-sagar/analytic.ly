import React from 'react'
// import { useGloballyConsistentColors } from '../../hooks/useColors'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

import { SeoParams } from './SeoParameters/utmTemplates'

export const SecurityTabContent = () => {
   
    return (
        <Box css={{ p: '$2', br: '$2', bc: '$2'}}>
             <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
            <SeoParams />
            </Flex>
        </Box>

    )
}
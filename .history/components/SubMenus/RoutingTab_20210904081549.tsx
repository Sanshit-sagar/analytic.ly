import React from 'react'

import { useGloballyConsistentColors } from '../../hooks/useColors'


import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

CONST GRADIENT_ID_BASE = 

export const SecurityTabContent = () => {
    const ugcc = useGloballyConsistentColors(GRADIENT_ID_BASE)
    return (
        <Box>
            <Text> {JSON.stringify(</Text>
        </Box>

    )
}
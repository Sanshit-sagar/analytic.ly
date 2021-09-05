import React from 'react'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'

const GRADIENT_ID_BASE: string = 'brush-id'

export const SecurityTabContent = () => {
    const ugcc = useGloballyConsistentColors({ id: GRADIENT_ID_BASE)
    return (
        <Box>
            <Text> {JSON.stringify(ugcc)} </Text>
        </Box>

    )
}
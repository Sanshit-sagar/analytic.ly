import React from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useStatistics } from '../../hooks/useClicks'

const Statistics = () => {
    const { statistics, loading, error } = useStatistics(); 

    return (
        <Box css={{ padding: '$2', margin: '$2', border: 'thin solid', borderColor: '$hiContrast', br: '$2' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                {statistics.map((stat, i) => {
                    return (
                        <Text css=
                    )
                })}
            </Flex>
        </Box>
        
    )
}
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
                        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
                            <Text size='3'> {stat.value} </Text>
                            <Text size='1'> {stat.name} </Text>
                        </Flex:
                    )
                })}
            </Flex>
        </Box>
        
    )
}
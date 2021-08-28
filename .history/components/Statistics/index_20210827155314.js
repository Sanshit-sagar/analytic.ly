import React from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useUserStatistics } from '../../hooks/useClicks'

const Statistics = () => {
    const { statistics, loading, error } = useUserStatistics(); 

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

    return (
        <Box css={{ padding: '$1', margin: '$1' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                {statistics.map((stat, i) => {
                    return (
                        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
                            <Text size='3'> {stat.value} </Text>
                            <Text size='1'> {stat.name} </Text>
                        </Flex>
                    );
                })}
            </Flex>
        </Box>
        
    )
}

export default Statistics
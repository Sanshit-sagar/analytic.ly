import React from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useUserStatistics } from '../../hooks/useClicks'
import { a, useSpring } from '@react-spring/web'

const Statistics = () => {
    const { statistics, loading, error } = useUserStatistics(); 

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

    let result = statistics.result;
    const props = useSpring({ from: { result: 0 }, result, reset: true });

    return (
        <Box css={{ padding: '$1', margin: '$1' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                {statistics.map((stat, i) => {
                    return (
                        <Box 
                            css={{  
                                border: 'thin solid', borderColor: '$accent', 
                                br: '$2', padding: '$2', margin: '$3',
                                '&:hover': { backgroundColor: 'rgba(50,255,150,0.5)'},
                            }}
                        > 
                            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1'}}>
                                <Text size='3'> {stat.name} </Text>
                                <a.h1>{props.result.to(Math.round)}</a.h1>
                            </Flex>
                        </Box>
                    );
                })}
            </Flex>
        </Box>
        
    )
}

export default Statistics
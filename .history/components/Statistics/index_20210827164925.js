import React from 'react'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useUserStatistics } from '../../hooks/useClicks'
import { a, useSpring } from '@react-spring/web'

import { CursorArrowIcon, TargetIcon } from '@radix-ui/react-icons'

const statIcons = [
    <CursorArrowIcon />,
    <TargetIcon />,
];

const Statistics = () => {
    const { statistics, loading, error } = useUserStatistics(); 

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

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
                                <AnimatedStat result={stat.result} />
                            </Flex>
                        </Box>
                    );
                })}
            </Flex>
        </Box>
    );
}

const AnimatedStat = ({ result }) => {
    const props = useSpring({ from: { result: 0 }, result, reset: true });

    return (
        <a.h1>{props.result.to(Math.round)}</a.h1>
    )
}

export default Statistics
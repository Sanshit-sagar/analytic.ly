import React from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useUserStatistics, useUserRankings } from '../../hooks/useClicks'
import { a, useSpring } from '@react-spring/web'

import { CursorArrowIcon, TargetIcon } from '@radix-ui/react-icons'

const statIcons = [
    <CursorArrowIcon css={{ mr: '$2' }}/>,
    <TargetIcon css={{ mr: '$2' }} />,
];

const Statistics = () => {
    const { statistics, loading, error } = useUserStatistics(); 
    const { views, vLoading, vError } = useUserRankings('frequencies', 'sanshit.sagar@gmail.com', true);
    const { uniques, uLoading, uError } = useUserRankings('uniques', 'sanshit.sagar@gmail.com', true);

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
                                <>
                                <Text size='3'>  {statIcons[i]} {stat.name} </Text>
                                {i<2 ? <AnimatedStat result={stat.result} /> :
                                  <>
                                    {/* <Text size='3'> {stat.result[0]} </Text> */}
                                    <Text>{result={stat.result[1]} <Text/> </>
                                }
                                </>
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
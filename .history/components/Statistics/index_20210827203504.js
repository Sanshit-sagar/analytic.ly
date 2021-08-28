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

const StatsWrapper = styled('div', {
    border: 'thin solid',
    borderColor: '$accent', 
    br: '$2',
    margin: '$1', 
    padding: '$1', 
    mr: '$3',
    '&:hover': { 
        backgroundColor: 'rgba(50,255,150,0.5)'
    },
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$1'
});

const AnimatedNumericalStat = ({ index, name }: { index: number; name: string }) => {

    return (
        <>
            <Text size='3'> 
                {statIcons[index]} {name} 
            </Text>
            <AnimatedStat 
                result={stat.result} 
            />
        </>
    )
}

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
                        <StatsWrapper>
                             {i<2 ? <AnimatedNumericalStat index={i} name={stat.name} value={stat.result} />
                                
                               : <AnimatedListedStat index={i} name={stat.name} leader={stat.result[0]} value={stat.result[1]} />
                                    
                                       
                                       
                                    </Flex>
                                }
                                </>
                            </Flex>
                        </StatsWrapper>
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
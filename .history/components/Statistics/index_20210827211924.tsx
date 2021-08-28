import React from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { useUserStatistics } from '../../hooks/useClicks'
import { a, useSpring } from '@react-spring/web'

import { CursorArrowIcon, TargetIcon } from '@radix-ui/react-icons'

const statIcons = [
    <CursorArrowIcon />,
    <TargetIcon  />,
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

interface IStats { 
    index: number; 
    name: string; 
    value: number 
}
interface IStats {
    index: number; 
    name: string; 
    value: number;
    leader: string;
}

let statisticNames: string[] = [
    'Total Page Views', 
    'Total Unique Visits', 
    'Most Viewed Page', 
    'Most Frequent Visitor'
];

const AnimatedNumericalStat = ({ index, name, value }: IStats) => {

    return (
        <>
            <Text size='3'> 
                {statIcons[index]} {name} 
            </Text>
            <AnimatedStat 
                result={value} 
            />
        </>
    )
}

const AnimatedListedStat = ({ index, name, value, leader='' }: IListStats) => {
    return (
        <>
            {i<2 ?
            
            <Text size='3'> {statIcons[index]} {name} </Text>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
                <Text size='4'> {name} </Text>
                <Text size='2'> {leader} </Text>
            </Flex>
            <AnimatedStat 
                result={parseInt(value)}
            />
        </>
    )
}


const AnimatedStat = ({ result }: { result: number }) => {
    if(!result || result===undefined) return <h1 />;
    const props = useSpring({ from: { result: 0 }, result, reset: true });
    return <a.h1>{props.result.to(Math.round)}</a.h1>;
}

const Statistics = () => {
    const { statistics, loading, error } = useUserStatistics()

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> error... </Text>

    return (
        <Box css={{ padding: '$1', margin: '$1' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                {statistics.map((stat: any, i: number) => {
                    return (
                        <StatsWrapper key={i}>  
                            { i < 2 ? 
                            <AnimatedNumericalStat 
                                index={i} 
                                name={stat.name} 
                                value={stat.result} 
                            /> :  
                            <AnimatedListedStat 
                                index={i} 
                                name={stat.name} 
                                value={stat.result[1]} 
                                leader={stat.result[0]}
                                length={1}
                            />}
                         </StatsWrapper>
                    );
                })}
            </Flex>
        </Box>
    );
}







export default Statistics
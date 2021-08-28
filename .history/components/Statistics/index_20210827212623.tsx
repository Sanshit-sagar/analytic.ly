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

type UnparsedNumerical = number | string; 

interface IStats {
    index: number; 
    name: string; 
    value: UnparsedNumerical;
    leader?: string;
}
interface ISpringNumber {
    result: number;
}







const AnimatedStat = ({ index, name, value, leader = '' }: IStats) => {

    let isNumerical: boolean = index < 2;

    return (
        <> {isNumerical ? 
            <Text size='3'> {statIcons[index]} {name} </Text> :   
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
                <Text size='4'> {name} </Text>
                <Text size='2'> {leader} </Text>
            </Flex>}
            <AnimatedNumerical result={parseInt(value)} />
        </>
    )
}


const AnimatedNumerical = ({ result }: ISpringNumber) => {
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
                            <AnimatedStat 
                                index={i} 
                                name={stat.name} 
                                value={stat.result[1]} 
                                leader={stat.result[0]}
                            />}
                         </StatsWrapper>
                    );
                })}
            </Flex>
        </Box>
    );
}







export default Statistics
import React, { useEffect } from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { 
    useUserStatistics,
    useUserSummary,
    useFrequencies
} from '../../hooks/useClicks'

import { a, useSpring } from '@react-spring/web'

import { darkModeAtom } from '../../pages/index'
import { useAtom } from 'jotai'

import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '../../primitives/Button'


import { 
    CursorArrowIcon, 
    TargetIcon,
    EyeOpenIcon,
    LoopIcon
} from '@radix-ui/react-icons'

const statIcons = [
    <CursorArrowIcon />,
    <TargetIcon  />,
    <EyeOpenIcon />,
    <LoopIcon />
];

const StatsWrapper = styled('div', {
    border: 'thin solid',
    borderColor: '$accent', 
    br: '$2',
    margin: '$1', 
    padding: '$1', 
    mr: '$3',
    '&:hover': { 
        backgroundColor: 'rgba(50,255,150,0.6)',
    },
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$1',
    height: '65px',
    bc: '$neutral'
});

interface IStats {
    index: number; 
    name: string; 
    value: number;
    leader?: string;
    displayNext: () => void;
}
interface ISpringNumber {
    result: number;
}

const AnimatedStat = ({ index, name, value, leader = '', displayNext }: IStats) => {

    return (
        <Box as='button' onClick={() => displayNext()}> 
            <Flex css={{ width: '300px', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                <Text as='span' size='4' css={{ fontWeight: 'normal' }}>{statIcons[index]} {name} </Text>
                <Text as='span' size='1' css={{ color: '$accent2' }}> {leader} </Text>
            </Flex>
            <AnimatedNumerical result={parseInt(`${value}`)} />
        </Box>
    )
}


const AnimatedNumerical = ({ result }: ISpringNumber) => {
    // const [darkMode] = useAtom(darkModeAtom)

    if(!result || result===undefined) return <a.h1> 0 </a.h1>;
    const props = useSpring({ from: { result: 0 }, result, reset: true });
    return <a.h1 style={{ color: 'white' }}>{props.result.to(Math.round)}</a.h1>;
}

const Statistics = () => {
    let currentFreqMapIndex = 0; 
    let currentCategory, currentFreqs 

    const { statistics, statsLoading, statsError } = useUserStatistics()
    const { summary, smLoading, smError } = useUserSummary()
    const { freqs, loading, error } = useFrequencies()

    if(statsLoading || smLoading || loading) return <Text as='span'> loading... </Text>
    if(statsError || smError || error) return <Text as='span'> error... </Text>

    let start = summary.start;
    let end = summary.end;
    let duration = summary.numDays



    return (
        <Box css={{ width: '300px', margin: '$1' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                {statistics.map((stat: any, i: number) => {
                    return (
                        <StatsWrapper key={`statistic-${i}`}>  
                            <AnimatedStat 
                                index={i} 
                                name={stat.name} 
                                value={i<2 ? stat.result : stat.result[1]} 
                                leader={i<2 ? (i===0 ? `${start.split(' ')[0]} to ${end.split(' ')[0]} [${Math.round(duration)} Days]` : '') : stat.result[0]}
                            />
                        </StatsWrapper>
                    );
                })}
            </Flex>
          
            <StatsWrapper key={`statistic-${statistics.length}`}> 
                <AnimatedStat 
                    index={statistics.length} 
                    name={`Most Used ${currentCategory}`} 
                    value={{
                    leader={N/A'}
                    displayNext={displayNext}
                />
            </StatsWrapper>    
        </Box>
    );
}

export default Statistics
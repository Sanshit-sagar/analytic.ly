import React, { useState } from 'react'
import { styled } from '../../stitches.config'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'

import { 
    useUserStatistics,
    useUserSummary,
    useFrequencies
} from '../../hooks/useClicks'

import { a, useSpring } from '@react-spring/web'

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
        backgroundColor: '$accentSecondary',
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
}
interface ISpringNumber {
    result: number;
}

const AnimatedStat = ({ index, name, value, leader = '' }: IStats) => {

    return (
        <>
            <Flex css={{ width: '300px', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
                <Text as='span' size='4' css={{ fontWeight: 'normal' }}>{statIcons[index]} {name} </Text>
                <Text as='span' size='1' css={{ color: '$accent2' }}> {leader} </Text>
            </Flex>
            <AnimatedNumerical result={parseInt(`${value}`)} />
        </>
    )
}


const AnimatedNumerical = ({ result }: ISpringNumber) => {
    // const [darkMode] = useAtom(darkModeAtom)

    if(!result || result===undefined) return <a.h1> 0 </a.h1>
    const props = useSpring({ from: { result: 0 }, result, reset: true })

    return (
        <a.h1 style={{ color: 'white', fontWeight: 'bold' }}>
            {props.result.to(Math.round)}
        </a.h1>
    );
}

const entries = atom({ 
    'browser': -1, 'os': -1, 'engine': -1, 'country': -1, 'ipAddress': -1, 'httpProtocol': -1, 'tlsVersion': -1
});


const entriesIndexAtom = atom(0)
const entriesValueAtIndexAtom = atom((get) => get(entries)[get(entriesIndexAtom)])
const entryTit

const Statistics = () => {
    const [entriesIndex, setEntriesIndex] = useAtom<number>(entriesIndexAtom)


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
          
            {/* Force rerender when entriesIndex changes by using it in the key for the wrapper elem */}
            <StatsWrapper key={`statistic-for-${entriesIndex}`}> 
                <AnimatedStat 
                    index={statistics.length} 
                    name={`Most Used ${Object.entries(freqs)[entriesIndex][0]}`} 
                    value={parseInt(Object.entries(freqs)[entriesIndex][1][0].score)}
                    leader={`${Object.entries(freqs)[entriesIndex][1][0].title}`}
                />
            </StatsWrapper>    

            <Button 
                onClick={() => {
                    setEntriesIndex((entriesIndex + 1) % Object.entries(freqs).length)
                }}
            > 
                next 
            </Button>
        </Box>
    );
}

export default Statistics



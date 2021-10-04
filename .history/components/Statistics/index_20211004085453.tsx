import React, { useState } from "react"
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
import { StatisticsSkeleton } from './Skeleton'

import { 
    CursorArrowIcon, 
    TargetIcon,
    EyeOpenIcon,
    LoopIcon
} from '@radix-ui/react-icons'

import { useGloballyConsistentColors } from '../../hooks/useColors' 

const statIcons = [
    <CursorArrowIcon key={'1'} />,
    <TargetIcon  key={'2'} />,
    <EyeOpenIcon key={'3'} />,
    <LoopIcon key={'1'}  />
];

const StatsWrapper = styled('div', {
    height: '75px',
    bc: '$neutral',
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$1',
    border: '2px solid',
    borderColor: '$accent', 
    br: '$2',
    margin: '$1', 
    padding: '$1', 
    mr: '$3',
    '&:hover': { 
        bc: '$accentSecondary',
    }
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

interface INormalizedFreqProps { 
    title: string; 
    score: number; 
    rank: number; 
    normalizedFreq: number; 
}

const AnimatedStat = ({ index, name, value, leader = '' }: IStats) => (
    <>
        <Flex css={{ width: '300px', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$2'}}>
                <Text as='span' size='2' css={{ color: '$funky' }}> {statIcons[index]} </Text>
                <Text as='span' size='2' css={{ color: '$text' }}> {name.toUpperCase()} </Text>
            </Flex>

            <Text as='span' size='1' css={{ color: '$accent', fontWeight: '500' }}> {leader} </Text>
        </Flex>
        <AnimatedNumerical result={parseInt(`${value}`)} />
    </>
);


const AnimatedNumerical = ({ result }: ISpringNumber) => {
    if(!result || result===undefined) return <a.h1> 0 </a.h1>

    const colors = useGloballyConsistentColors()
    const props = useSpring({ from: { result: 0 }, result, reset: true })

    return (
        <a.h1 
            style={{ 
                color: colors.accent, 
                fontWeight: 'bold'
            }}
        >
            {props.result.to(Math.round)}
        </a.h1>
    );
}

const Statistics = () => {
    const [entriesIndex, setEntriesIndex] = useState<number>(0)

    const { statistics, statsLoading, statsError } = useUserStatistics()
    const { summary, smLoading, smError } = useUserSummary()
    const { freqs, loading, error } = useFrequencies()

    if(statsLoading ||smLoading || loading) return <StatisticsSkeleton />
    if(statsError || smError || error) return <Text as='span'> error... </Text>

    let start = summary.start;
    let end = summary.end;
    let duration = summary.numDays

    const normalizedFreqsObjs: [key: string, entry: INormalizedFreqProps][number] = Object.entries(freqs)
    const lastStatCategory: string = normalizedFreqsObjs[entriesIndex][0]
    const lastStat: INormalizedFreqProps = normalizedFreqsObjs[entriesIndex][1][0]

    return (
        <Box css={{ width: '300px', margin: '$1' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1', mb: '$2' }}>
                {statistics.map((stat: any, i: number) => {
                    return (
                        <StatsWrapper key={`statistic-${i}`}>  
                            <AnimatedStat 
                                index={i} 
                                name={stat.name} 
                                value={i<2 ? stat.result : stat.result[1]} 
                                leader={
                                        i < 2
                                    ?   i===0 
                                    ?   `${start.split(' ')[0]} to ${end.split(' ')[0]} [${Math.round(duration)} Days]` 
                                    :   ''
                                    : stat.result[0]
                                }
                            />
                        </StatsWrapper>
                    )
                })}
            </Flex>
          
            {/* Force rerender when entriesIndex changes by using it in the key for the wrapper elem */}
            <StatsWrapper key={`statistic-for-${entriesIndex}`}> 
                <AnimatedStat 
                    index={statistics.length} 
                    name={`Most Used ${lastStatCategory}`} 
                    value={parseInt(`${lastStat.score}`)}
                    leader={`${lastStat.title}`}
                />
            </StatsWrapper>    

            <Button onClick={() => setEntriesIndex((entriesIndex + 1) % Object.entries(freqs).length)}>
                next 
            </Button>
        </Box>
    );
}

export default Statistics



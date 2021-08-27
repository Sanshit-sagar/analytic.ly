import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import Loading from '../Loading'
import { useClickHistoryForUser } from '../../hooks/useClicks'

export type TimeStamp = number;
export type ClickScore = number;
export type ClickDate = Date; 

export interface ClickHistoryProps {
    quantity: string;
    timeAgo: string;
    tickSize: string;
}

export interface Datum {
    index: number;
    timestamp: TimeStamp;
    clickscore: ClickScore;
    clickdate: ClickDate; 
}

export interface ClickHistory {
    clicks?: Datum[];
    start: ClickDate;
    end?: ClickDate;
    durationInMs?: number;
    tickSize?: number;
    numIntervals?: number; 
};

export interface MarginProps {
    top: number;
    left: number; 
    bottom: number; 
    right: number; 
}

export interface PrimaryChartProps {
    height: number; 
    width: number;
    data: ClickHistory;
    margin: MarginProps; 
}

let data: Datum[] = []
let history: ClickHistory | null = null


const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(quantity, timeAgo, tickSize)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    let start: number = parseInt(minTimestamp)
    let duration: number = new Date().getTime() - start
    let numIntervals: number = duration/parseInt(tickSize)

    clicks.map((click: { x: number, y: number }, i: number) => {
        let timestamp: TimeStamp = start + click.x
        let clickscore: ClickScore = click.y
        let clickdate: ClickDate = new Date(start + click.x)
        data.push({ index: i, timestamp, clickscore, clickdate }); 
    });

    history = {
        clicks: [...clicks], 
        start: new Date(start),
        end:,
        durationInMs: end.getTime()-start.getTime(),
        tickSize: parseInt(tickSize),
        numIntervals
    }
    
    return (
        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}> 
                <Text> Click History </Text>
                <Text> {`${JSON.stringify(data)}`}</Text> 
                <PrimaryChart
                    height={height}
                    width={width}
                    data={clickHistory}
                    margin
                />
            </Flex>
        </Box>
    )
}

export default ClickHistory






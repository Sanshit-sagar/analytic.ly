import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import Loading from '../Loading'
import { useClickHistoryForUser } from '../../hooks/useClicks'

export type TimeStamp = number;
export type ClickScore = number;

export interface ClickHistoryProps {
    quantity: string;
    timeAgo: string;
    tickSize: string;
}

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};


const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(quantity, timeAgo, tickSize)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    let data: [Date, ClickScore][] = [];
    clicks.map((click: GetClickHistory, _: number) => {
        let date: TimeStamp = new Date(parseInt(minTimestamp) + click.x);
        let clickscore: ClickScore = click.y 
        data.push([timestamp, clickscore]);
    });
    
    return (
        <Box>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}> 
                <Text> Click History </Text>
                <Text> {`${JSON.stringify(data)}`}</Text> 
            </Flex>
        </Box>
    )
}

export default ClickHistory






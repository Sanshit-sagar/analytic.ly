import React from 'react'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { useClickHistoryForUser } from '../../hooks/useClicks'


export type TimeStamp = number;
export type ClickScore = number;

interface ClickHistoryProps {
    quantity: string;
    timeAgo: string;
    tickSize: string;
}

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};

const CLICK_HISTORY_CHART_ID = 'CLICK_HISTORY'







const ClickHistory = ({ quantity, timeAgo, tickSize }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval)

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> Error {error.message} </Text> 

    clicks.map((click: { x: number, y: number }, _: number) => {
        let timestamp: TimeStamp = minTimestamp + click.x
        let clickscore: ClickScore = click.y 
        data.push([timestamp, clickscore]);
    });
    
    return (
        <>
            <Text> Click History </Text>
            <Text> {`${JSON.stringify(clicks)}`}</Text> 
        </>
    )
}








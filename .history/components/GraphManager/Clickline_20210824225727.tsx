import React from 'react'

import { useClickHistoryForUser } from '../../hooks/useClicks'


export type TimeStamp = number;
export type ClickScore = number;

interface ClickHistoryProps {
    amount: string;
    range: string;
    interval: string;
}

export interface GetClickHistory {
    clicks?: [TimeStamp, ClickScore][];
};

const CLICK_HISTORY_CHART_ID = 'CLICK_HISTORY'







const ClickHistory = ({ quantity, timeAgo, interval }: ClickHistoryProps) => {

    const { clicks, loading, error } = useClickHistoryForUser(amount, range, interval)

    if(loading) return <Text> loading... </Text>
    if(error) return <Text> Error {error.message} </Text> 
    
    return (
        <>
            <Text> Click History </Text>
            <Text> {`${JSON.stringify(clicks)}`}</Text> 
        </>
    )
}








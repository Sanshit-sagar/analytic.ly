import React from 'react'

import { Text } from '../../primitives/Text'

import Loading from '../Loading'
import { useClickHistoryForUser } from '../../hooks/useClicks'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { format } from '../../lib/utils/d3time'

import {
    Datum,
    ClickHistoryProps,
    TimeStamp,
    ClickScore,
    ClickDate
} from './interfaces'

import PrimaryChart from './PrimaryChart'


function formatClickDate(x: number, minTimestamp: number, interval: string): { timestamp: number, fmtTimestamp: string } {
    let x0: number = minTimestamp;
    
    if(interval==='sec') {
        x0 += 1000 * x; 
    } else if(interval==='min') {
        x0 += 60 * 1000 * x; 
    } else if(interval==='hour') {
        x0 += 60 * 60 * 1000 * x;
    } else {
        x0 += 24 * 60 * 60 * 1000 * x; 
    }

    return { 
        timestamp: parseInt(`${x0}`), 
        fmtTimestamp: `${format(new Date(x0), 'dayhourmin')}`
    };
}


const ClickHistory = ({ amount, range, interval }: ClickHistoryProps) => {

    const { clicks, minTimestamp, loading, error } = useClickHistoryForUser(amount, range, interval)

    if(loading) return <Loading />
    if(error) return <Text> Error {error.message} </Text> 

    const start: number = parseInt(minTimestamp)
    const mappedData: Datum[] = clicks.map((click: { x: number, y: number }, i: number) => {
        const fmtTimestampObj: { timestamp: number; fmtTimestamp: string } = formatClickDate(click.x, start, interval)
        const timestamp: TimeStamp = fmtTimestampObj.timestamp;
        const clickscore: ClickScore = click.y
        const clickdate: ClickDate = new Date(timestamp)
        const clickfmttime: ClickFmtTime = fmtTimestampObj.fmtTimestamp;
        return { index: i, timestamp, clickscore, clickfmttime, clickdate }
    });

    console.log(`DATA IS HERE: ${JSON.stringify(mappedData)}`); 
    
    return (
            <DashboardDisplayBox>    
                <Text> {JSON.stringify(mappedData)} </Text>
                <VisxParentSizeWrapper> 
                    <ParentSize> 
                        {({ height, width }: HeightProps) => {
                            return (
                                <PrimaryChart
                                    data={mappedData}
                                    height={600}
                                    width={1250}
                                    margin={{
                                        top: 16,
                                        right: 16,
                                        bottom: 40,
                                        left: 48,
                                    }}
                                />
                            );
                        }}
                    </ParentSize>
                </VisxParentSizeWrapper>
            </DashboardDisplayBox>
    );
}

export default ClickHistory






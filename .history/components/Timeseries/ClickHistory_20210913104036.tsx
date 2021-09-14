import React from 'react'

import { useClickHistoryForUser } from '../../hooks/useClicks'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { format } from '../../lib/utils/d3time'

import {
    Datum,
    GraphDetails,
    ClickHistoryProps,
    TimeStamp,
    ClickScore,
    ClickDate,
    ClickFmtTime,
    FormattedTimes
} from './interfaces'

import Brush from './Brush'

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

    const cummulativeClicks = 0
    const start: number = minTimestamp ? parseInt(minTimestamp) : new Date(1970,1,1).getTime(); 
    const now: number = new Date().getTime()
    const mappedData: Datum[] = clicks?.length ? clicks?.map((click: { x: number, y: number }, i: number) => {
        const fmtTimestampObj: FormattedTimes = formatClickDate(click.x, start, interval);
        const timestamp: TimeStamp = fmtTimestampObj.timestamp;
        const clickscore: ClickScore = click.y
        if(parseInt(`${click.y}`) > 0)  cummulativeClicks += click.y
        const clickdate: ClickDate = new Date(timestamp)
        const clickfmttime: ClickFmtTime = fmtTimestampObj.fmtTimestamp;
        return { index: i, timestamp, clickscore, clickfmttime, clickdate }
    }) : [];

    const graphDetails: GraphDetails = {
        start: new Date(start),
        end: new Date(now),
        durationInMs: (now-start),
        numIntervals: (now-start)/parseInt(interval),
        tickSizeInMs: parseInt(interval)
    }
    
    return (
       <>
            <ParentSize>
                {(_: { resize: (_: any) => void }) =>
                    <Brush 
                        mappedData={mappedData}
                        details={graphDetails}
                        loading={loading}
                        error={error}
                    /> 
                }
            </ParentSize> 
        </>
      
    );
}

export default ClickHistory






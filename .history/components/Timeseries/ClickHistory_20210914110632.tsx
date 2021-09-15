import React from 'react'

import { usePresetClickstream } from '../../hooks/useAtomicClicks'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Text } from '../../primitives/Text'
import { format } from '../../lib/utils/d3time'

import { useAtomValue } from 'jotai/utils'
import {
    amountAtom,
    rangeAtom,
    intervalAtom 
} from '../../hooks/useAtomicClicks'

import {
    Datum,
    GraphDetails,
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


const ClickHistory = () => {
    const amount = useAtomValue(amountAtom)
    const range = useAtomValue(rangeAtom)
    const interval = useAtomValue(intervalAtom)

    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    let cummulativeClicks: number = 0
    let nonEmptyDatums: number = 0
    let allDatums: number = 0
    let maxScore: number = 0
    let minScore: number = 0

    const start: number = minTimestamp ? parseInt(minTimestamp) : new Date(1970,1,1).getTime(); 
    const now: number = new Date().getTime()
    const mappedData: Datum[] = clicks?.length ? clicks?.map((click: { x: number, y: number }, i: number) => {
        const fmtTimestampObj: FormattedTimes = formatClickDate(click.x, start, interval);
        const timestamp: TimeStamp = fmtTimestampObj.timestamp;
        const clickscore: ClickScore = click.y
        
        if(parseInt(`${click.y}`) > 0)  {
            cummulativeClicks += click.y
            nonEmptyDatums += 1
            maxScore = Math.max(maxScore, click.y)
            minScore = Math.min(minScore, click.y)
        }
        allDatums += 1

        const clickdate: ClickDate = new Date(timestamp)
        const clickfmttime: ClickFmtTime = fmtTimestampObj.fmtTimestamp;
        return { index: i, timestamp, clickscore, clickfmttime, clickdate }
    }) : [];

    const graphDetails: GraphDetails = {
        start: new Date(start),
        end: new Date(now),
        durationInMs: (now-start),
        numIntervals: (now-start)/parseInt(interval),
        tickSizeInMs: parseInt(interval),
        maxScore,
        minScore,
        cummulativeClicks,
        nonEmptyDatums,
        allDatums,
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






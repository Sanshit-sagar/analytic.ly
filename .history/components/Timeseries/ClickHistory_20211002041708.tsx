import React from 'react'

import Brush from './Brush'
import { Datum } from './interfaces'
import { Text } from '../../primitives/Text'
import { formatClickDate } from '../../lib/utils/d3time'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'

interface Click {
    x: number;
    y: number;
};

function accumulate(data: Click[]) {
    let i
    let runningTotal = 0;
    let cummClicks = [];
    for(i=0; i<data.length; i++) {
        runningTotal += data.y;
        cummClicks[i] = {
            x: data.x,
            y: runningTotal,
        };
    }
    return cummClicks
}

const ClickHistory = ({ interval }: { interval: string }) => {
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading) return <Text> Loading... </Text>
    if(error || !clicks?.length) return <Text> Error! </Text> 

    const data: Datum[] = clicks.map((click: Click, index: number) => {
        let timestamp: number = formatClickDate(click.x, minTimestamp, interval).timestamp 
        let datestamp: Date = new Date(timestamp)
        return { index, timestamp, clickscore: click.y, clickdate: datestamp };
    })

    return (
        <Brush 
            data={data} 
            minTimestamp={minTimestamp} 
        />
    )
}

export default ClickHistory


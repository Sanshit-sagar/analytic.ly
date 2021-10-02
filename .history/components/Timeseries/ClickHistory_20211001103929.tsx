import React from 'react'

import Brush from './Brush'
import { Text } from '../../primitives/Text'

import { Datum } from './interfaces'
import { formatClickDate } from '../../lib/utils/d3time'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'

interface Click {
    x: number;
    y: number;
};

const ClickHistory = ({ interval }: { interval: string }) => {
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading) return <Text> Loading... </Text>
    if(error || !clicks?.length) return <Text> Error! </Text> 

    const data: Datum[] = clicks.map((click: Click, index: number) => {
        let timestamp: number = formatClickDate(click.x, minTimestamp, interval).timestamp 
        let datestamp: Date = new Date(timestamp)
        return {index,
            timestamp,
            clickscore: click.y,
            clickdate: new Date(timestamp)
        }
    }); 

    return (
        <Brush 
            data={data} 
            minTimestamp={minTimestamp} 
        />
    )
}

export default ClickHistory


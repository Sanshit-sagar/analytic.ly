import React from 'react'
import { Datum } from './interfaces'
import Brush from './Brush'
import { Text } from '../../primitives/Text'
import { formatClickDate } from '../../lib/utils/d3time'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'

import { useUpdateAtom } from 'jotai/utils'
import { updateTimeseriesAtom } from '../../atoms/timeseries'

interface Click {
    x: number;
    y: number;
}

// function accumulate(data: Click[]) {
//     let runningTotal = 0
//     let cummClicks: Click[] = []
//     let windowSize = data.length / 5

//     data.map((click: Click, i: number) => {
//         runningTotal += click.y
//         if(i >= windowSize) {
//             runningTotal -= cummClicks[i - windowSize].y
//         }
//         cummClicks.push({
//             x: click.x,
//             y: runningTotal/windowSize,
//         })
//     })

//     return cummClicks
// }

const ClickHistory = ({ interval }: { interval: string }) => {
    const updateTimeseries = useUpdateAtom(updateTimeseriesAtom)
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading) return <Text> Loading... </Text>
    if(error || !clicks?.length) return <Text> Error! </Text> 

    // let cummClicks = accumulate(clicks)
    if(clicks?.length)
    updateTimeseries(clicks)

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


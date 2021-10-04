import React from 'react'

import Brush from './Brush'
import { Text } from '../../primitives/Text'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'

import { useUpdateAtom, useAtomValue } from 'jotai/utils'
import { timeseriesAtom, updateTimeseriesAtom, cummulativeAtom } from '../../atoms/timeseries'

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
    const timeseries = useAtomValue(timeseriesAtom)

    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading) return <Text> Loading... </Text>
    if(error || !clicks?.length) return <Text> Error! </Text> 

    // let cummClicks = accumulate(clicks)
    if(clicks?.length) {
        updateTimeseries({
            data: clicks, 
            start: minTimestamp,
            tick: interval
        });
    }

    return (
        <Brush 
            data={timeseries} 
            minTimestamp={minTimestamp} 
        />
    )
}

export default ClickHistory

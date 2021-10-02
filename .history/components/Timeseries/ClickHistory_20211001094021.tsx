import React from 'react'

import { useAtomValue } from 'jotai/utils'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import Brush from './Brush'

import { intervalAtom } from '../../atoms/timeseries'
import { formatClickDate } from '../../lib/utils/d3time'
import { usePresetClickstream } from '../../hooks/useAtomicClicks'


const ClickHistory = () => {
    const { clicks, minTimestamp, loading, error } = usePresetClickstream()

    if(loading || error || !clicks?.length) return null

    const interval = useAtomValue(intervalAtom)
    const data: Datum[] = clicks.map((click: { 
        x: number; 
        y: number 
    }, index: number) => {
        
        let timestamp = formatClickDate(click.x, minTimestamp, interval).timestamp
        return {
            index,
            timestamp,
            clickscore: click.y,
            clickdate: new Date(timestamp)
        };
    });

    <ParentSize>
        {(_: { resize: (_: any) => void }) =>
            <Brush data={data} />
        }
    </ParentSize>  
    );
}


export default ClickHistory


// const start: number = minTimestamp ? parseInt(minTimestamp) : new Date(2021,6,1).getTime()
// const now: number = new Date().getTime()



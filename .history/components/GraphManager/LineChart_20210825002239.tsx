import React from 'react'

import { Datum } from './ClickHistory'

import { AxisLeft, AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'


const LineChart:React.FC<LineChartProps> = ({ 
    data,
    width,
    yMax,
    margin,
    xScale,
    yScale,
    hideBottomAxis = false,
    hideLeftAxis = false,
    stroke,
    top,
    left,
    yTickFormat,
    children
}) => {

    if(!data || width < 10) return null;

    const getDate = (d: Datum) => d.clickdate;
    const getTimestamp = (d: Datum) => d.timestamp; 
    const getClickScore = (d: Datum) => d.clickscore; 
    const getIndex = (d: Datum) => d.index; 


    return (
        <Group left={left || margin.left}

    );
}

export default LineChart 
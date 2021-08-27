import React from 'react'

import { 
    LineChartProps, 
    Datum 
} from './interfaces'

import { AxisLeft, AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import {
    AXIS_COLOR,
    AXIS_BOTTOM_TICK_LABEL_PROPS,
    AXIS_LEFT_TICK_LABEL_PROPS,
} from "./constants";

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
    xTickFormat,
    children
}) => {

    if(!data || width < 10) return null;

    const getDate = (d: Datum) => d.clickdate;
    const getClickScore = (d: Datum) => d.clickscore; 

    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <LinePath<Datum>
                data={data}
                x={(d) => xScale(getDate(d)) || 0}
                y={(d) => yScale(getClickScore(d))}
                strokeWidth={1.5}
                stroke={stroke}
            />
            {!hideBottomAxis &&
                <AxisBottom
                    top={yMax + margin.top}
                    scale={xScale}
                    numTicks={width > 520 ? 10 : 5}
                    stroke={AXIS_COLOR}
                    tickStroke={AXIS_COLOR}
                    tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                />
            }
            {!hideLeftAxis &&
                <AxisLeft
                    scale={yScale}
                    numTicks={5}
                    stroke={AXIS_COLOR}
                    tickStroke={AXIS_COLOR}
                    tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                    tickFormat={(d) => {
                        return xTickFormat ? xTickFormat(d) : d;
                    }}
                /> 
            }
            {children}
        </Group>
    );
}

export default LineChart 
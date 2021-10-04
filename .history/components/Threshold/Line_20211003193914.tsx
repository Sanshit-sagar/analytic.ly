import React from 'react'

import { Group } from '@visx/group'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { Threshold } from '@visx/threshold'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'

const BACKGROUND = '#f3f3f3'
const GRID_STROKE = '#e0e0e0'
const RADIUS = 14

interface ThresholdProps {
    height: number;
    width: number;
    margin?: { 
        top:number; 
        bottom: number; 
        left: number; 
        right:number;
    };
}

const DEFAULT_MARGIN = { top: 40, right: 30, bottom: 50, left: 40 };


export const AreaDifference = ({ height, width, margin = DEFAULT_MARGIN }: ThresholdProps) => {
    if(width < 10) return null

    const yMax = height - margin.top - margin.bottom 
    const xMax = width - margin.left - margin.right 

    const clicksScale = scaleLinear<number>({
        domain: [
            Math.min(...clicksGroupA.map(d => Math.min(groupA(d), groupB(d))
        ]
    })


    return (
        <div>
            <svg height={height} width={width}>
                <rect
                    x={0}
                    y={0}
                    height={height}
                    width={width}
                    fill={BACKGROUND}
                    rx={RADIUS}
                />
                <Group left={margin.left} top={margin.top}>
                    <GridRows 
                        scale={clicksScale} 
                        width={xMax} 
                        height={yMax} 
                        stroke={GRID_STROKE}
                    /> 
                    <GridColumns
                        scale={timeScale}
                        width={xMax}
                        height={yMax}
                        stroke={GRID_STROKE}
                    /> 
                     <line 
                        x1={xMax} 
                        x2={xMax} 
                        y1={0} 
                        y2={yMax} 
                        stroke="#e0e0e0" 
                    />
                    <AxisBottom 
                        scale={timeScale} 
                        top={yMax} 
                        numTicks={width > 520 ? 10 : 5} 
                    />
                    <AxisLeft
                        scale={clicksScale}
                    /> 

                </Group>
            </svg>
        </div>
    )
}
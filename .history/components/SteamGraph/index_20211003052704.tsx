import React from 'react'

import { transpose } from 'd3-array'

import { StackedSteams } from './Stack'
import generateData from './generateData'
import useForceUpdate from '../../hooks/useForceUpdate'

import { scaleLinear } from '@visx/scale'
import { PatternCircles, PatternWaves } from '@visx/pattern'


import { 
    NUM_LAYERS, 
    SAMPLES_PER_LAYER, 
    BUMPS_PER_LAYER, 
    BACKGROUND
} from './constants'

export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
}

const range = (n: number) => Array.from(Array(n), (_d, i) => i)
const keys = range(NUM_LAYERS)

function FunkyStreamgraph({ 
    width, 
    height, 
    animate = true 
}: StreamGraphProps) {
  
    const forceUpdate = useForceUpdate()
    const handlePress = () => forceUpdate()

    if (width < 10) return null;

    const xScale = scaleLinear({
        range: [0, width],
        domain: [0, SAMPLES_PER_LAYER - 1]
    })

    const yScale = scaleLinear({
        range: [height, 0],
        domain: [-30, 50]
    })

    const layers = transpose<number>(
        keys.map(() => generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)),
    )

    return (
        <svg width={width} height={height}>

            <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#9cfaff" complement />
            <PatternWaves id="cherry" height={12} width={12} fill="transparent" stroke="#d0ffff" strokeWidth={1} />
            <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
            <PatternCircles id="transparent" height={60} width={60} radius={10} fill="transparent" complement />

            <g onClick={handlePress} onTouchStart={handlePress}>
                <rect 
                    x={0} 
                    y={0} 
                    width={width} 
                    height={height} 
                    fill={BACKGROUND}  
                />
                <StackedSteams 
                    keys={keys}
                    layers={layers} 
                    xScale={xScale} 
                    yScale={yScale} 
                    animate={animate} 
                />
            </g>
        </svg>
    );
}

export const SteamGraph = () => {
    return (
        <ParentSize>
            {({ width, height }) => (
                <FunkyStreamgraph 
                    width={width} 
                    height={height} 
                />
            )}
        </ParentSize>
    )
}
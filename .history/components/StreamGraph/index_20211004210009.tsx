import React from 'react'

import { transpose } from 'd3-array'
import { scaleLinear, scaleOrdinal } from '@visx/scale'
import { PatternWaves, PatternCircles } from '@visx/pattern'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { StackedSteams } from './Stack'
import generateData from './generateData'
import useForceUpdate from '../../hooks/useForceUpdate'

export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
}

export const NUM_LAYERS = 20
export const SAMPLES_PER_LAYER = 25
export const BUMPS_PER_LAYER = 10

const range = (n: number) => Array.from(Array(n), (_d, i) => i)
const keys = range(NUM_LAYERS)

function FunkyStreamgraph({ 
    width, 
    height, 
    animate = true 
}: StreamGraphProps) {

    const colors = useGloballyConsistentColors()
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

    const colorScale = scaleOrdinal({
        domain: keys,
        range: [
            colors.neutral,
            colors.accent,
            colors.accentPressed,
            colors.border,
            colors.border3, 
            colors.funky, 
            colors.funkyText
        ]
    })

    return (
        <svg 
            width={width} 
            height={height}
        >
            <PatternWaves 
                id="cherry" 
                height={12} 
                width={12} 
                fill="transparent" 
                stroke='orange' 
                strokeWidth={1} 
            />
            <g 
                onClick={handlePress} 
                onTouchStart={handlePress}
            >
                <rect 
                    x={0} 
                    y={0} 
                    width={width} 
                    height={height} 
                    fill={colors.accent}  
                />
                <StackedSteams 
                    keys={keys}
                    layers={layers} 
                    xScale={xScale} 
                    yScale={yScale} 
                    colorScale={colorScale}
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
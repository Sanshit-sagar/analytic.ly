import React from 'react'
import { Stack } from '@visx/shape'
import { PatternCircles, PatternWaves } from '@visx/pattern'
import { scaleLinear } from '@visx/scale'
import { transpose } from 'd3-array'
import { animated, useSpring } from 'react-spring'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import useForceUpdate from '../../hooks/useForceUpdate'
import { colorScale, patternScale } from './constants'
import generateData from './generateData'
import { ScaleLinear } from 'd3'

type Datum = number[]

export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
}

export interface SteamerProps {
    layers: number[][];
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    animate: boolean;
}

const NUM_LAYERS = 20
const SAMPLES_PER_LAYER = 25
const BUMPS_PER_LAYER = 10
const BACKGROUND = '#000'

const range = (n: number) => Array.from(Array(n), (d, i) => i)
const keys = range(NUM_LAYERS)


const Steamer = ({ layers, xScale, yScale, animate }: SteamerProps) => {
    const getY0 = (d: Datum) => yScale(d[0]) ?? 0;
    const getY1 = (d: Datum) => yScale(d[1]) ?? 0;
    
    return (
        <Stack<number[], number>
            data={layers}
            keys={keys}
            offset="wiggle"
            color={colorScale}
            x={(_, i) => xScale(i) ?? 0}
            y0={getY0}
            y1={getY1}
        >
        {({ stacks, path }) =>
            stacks.map((stack) => {
                // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
                const pathString = path(stack) || '';
                const tweened = animate ? useSpring({ pathString }) : { pathString };
                const color = colorScale(stack.key);
                const pattern = patternScale(stack.key);
                
                return (
                    <g key={`series-${stack.key}`}>
                        <animated.path 
                            d={tweened.pathString} 
                            fill={color} 
                        />
                        <animated.path 
                            d={tweened.pathString} 
                            fill={`url(#${pattern})`} 
                        />
                    </g>
                );
            })
        }
    </Stack>
    )
}


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
            <rect x={0} y={0} width={width} height={height} fill={BACKGROUND}  />
            <Steamer 
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
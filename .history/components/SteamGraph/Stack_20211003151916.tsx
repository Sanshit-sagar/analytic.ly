
import React from 'react'

import { Stack } from '@visx/shape'
import { ScaleLinear, scaleOrdinal, ScaleOrdinal } from 'd3'
import { animated, useSpring } from 'react-spring'

type Datum = number[]

export interface SteamerProps {
    layers: number[][];
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
    animate: boolean;
    keys: number[];
}


export const StackedSteams = ({ layers, xScale, yScale, animate, keys }: SteamerProps) => {


    const colorScale: ScaleOrdinal<number, number, never> = scaleOrdinal({
        domain: keys,
        range: ['rgba(255,200,200,1.0)', '#fff', '#667', 'rgba(255,100,100,1.0)', 'hsl(252, 56%, 57%)']
    })

    const patternScale: ScaleOrdinal<number, number, never> = scaleOrdinal({
        domain: keys,
        range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
    })

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
                const pathString = path(stack) || ''
                const color = colorScale(stack.key)
                const pattern = patternScale(stack.key)

                const tweened = animate ? useSpring({ pathString }) : { pathString };
                
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

import React from 'react'
import { Stack } from '@visx/shape'
import { animated, useSpring } from 'react-spring'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import useForceUpdate from '../../hooks/useForceUpdate'
import { colorScale, patternScale } from './constants'
import generateData from './generateData'
import { ScaleLinear } from 'd3'


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
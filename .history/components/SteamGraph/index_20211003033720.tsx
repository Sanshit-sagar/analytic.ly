import React from 'react'
import { Stack } from '@visx/shape'
import { PatternCircles, PatternWaves } from '@visx/pattern'
import { scaleLinear, scaleOrdinal } from '@visx/scale'
import { transpose } from 'd3-array'
import { animated, useSpring } from 'react-spring'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import useForceUpdate from '../../hooks/useForceUpdate'
import generateData from './generateData'

type Datum = number[]
export type StreamGraphProps = {
    width: number;
    height: number;
    animate?: boolean;
}

const NUM_LAYERS = 20
const SAMPLES_PER_LAYER = 200
const BUMPS_PER_LAYER = 10
export const BACKGROUND = '#ffdede'

const range = (n: number) => Array.from(new Array(n), (_, i) => i)
const keys = range(NUM_LAYERS)

// scales
const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
})

const yScale = scaleLinear<number>({
  domain: [-30, 50],
})

const colorScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['#ffc409', '#f14702', '#262d97', 'white', '#036ecd', '#9ecadd', '#51666e'],
})

const patternScale = scaleOrdinal<number, string>({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'circles', 'circles', 'circles', 'circles'],
})

const getY0 = (d: Datum) => yScale(d[0]) ?? 0
const getY1 = (d: Datum) => yScale(d[1]) ?? 0


function FunkyStreamgraph({ 
    width, 
    height, 
    animate = true 
}: StreamGraphProps) {

  const forceUpdate = useForceUpdate();
  const handlePress = () => forceUpdate();

  if (width < 10) return null;

  xScale.range([ 0, width ])
  yScale.range([ height, 0 ])


  const layers = transpose<number>(
    keys.map(() => {
        generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER)
    });
  ); 

  return (
    <svg width={width} height={height}>
        <PatternCircles 
            id="mustard" 
            height={40} 
            width={40} 
            radius={5} 
            fill="#036ecf" 
            complement 
        />
        <PatternWaves
            id="cherry"
            height={12}
            width={12}
            fill="transparent"
            stroke="#232493"
            strokeWidth={1}
        />
        <PatternCircles 
            id="navy" 
            height={60} 
            width={60} 
            radius={10} 
            fill="white" 
            complement 
        />
        <PatternCircles
            complement
            id="circles"
            height={60}
            width={60}
            radius={10}
            fill="transparent"
        />

        <g onClick={handlePress} onTouchStart={handlePress}>
            <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14} />
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
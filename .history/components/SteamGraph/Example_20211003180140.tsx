import React, { TouchEventHandler, useState } from 'react'

import Spring from 'react-spring'
import { ScaleLinear } from 'd3'
import { transpose } from 'd3-array'

import { Stack } from '@visx/shape'
import { curveBasis } from '@visx/curve'
import { scaleLinear, scaleOrdinal } from '@visx/scale'
import { PatternCircles, PatternWaves } from '@visx/pattern'

import ParentSize from '@visx/responsive/lib/components/ParentSize'


interface ParentSizeProps { 
    height: number; 
    width: number; 
}


const range = n => Array.from(Array(n), (d, i) => i)

const numLayers = 5
const samplesPerLayer = 60
const bumpsPerLayer = 100

const keys = range(numLayers)

function bumps(n: number, m: number) {
  var a = [], 
      i

  for (i = 0; i < n; ++i) a[i] = 0
  for (i = 0; i < m; ++i) bump(a, n)
  return a
}

function bump(a, n) {
    var x = 1 / (0.1 + Math.random()),
        y = 2 * Math.random() - 0.5,
        z = 10 / (0.1 + Math.random())

    for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z
        a[i] += x * Math.exp(-w * w)
    }
}

function randomColor(alpha = 1) {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${alpha})`
}

const zScale = scaleOrdinal({
    domain: keys,
    range: [randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]
})
const patternScale = scaleOrdinal({
    domain: keys,
    range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent']
})

interface GraphProps {
    data: number[][]; 
    xScale: ScaleLinear<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
}

const Graph = ({ data, xScale, yScale }: GraphProps) => (
    <Stack
        curve={curveBasis}
        data={data}
        keys={keys}
        offset="wiggle"
        x={(d, i) => xScale(i)}
        y0={d => yScale(d[0])}
        y1={d => yScale(d[1])}
    >
        {({ seriesData, path }) => {
      
            return seriesData.map((series: SeriesPoint<unknown>[], _i: number) => {
                const d = path(series)

                return (
                    <g key={`series-${series.key}`}>
                        <Spring to={{ d }} config={{ tension: 200, friction: 5 }}>
                        {(tweened) => (
                            <React.Fragment>
                            <path d={tweened.d} fill={zScale(series.key)} />
                            <path d={tweened.d} fill={`url(#${patternScale(series.key)})`} />
                            </React.Fragment>
                        )}
                        </Spring>
                    </g>
                )
            });
        }}
    </Stack>
)

const SteamGraphExample = ({ height, width }: { height: number; width: number; }) => {

    const [toggle, setToggle] = useState(true)
    const handleToggle = () => setToggle(!toggle)


    const data = transpose(keys.map((d) => {
        bumps(samplesPerLayer, bumpsPerLayer)
    }))

    const xScale = scaleLinear({
      range: [0, width],
      domain: [0, samplesPerLayer - 1]
    })
    const yScale = scaleLinear({
      range: [height * 2, 0],
      domain: [-30, 30]
    })
    return (
     
        <div onClick={handleToggle}>
          <svg width={width - 15} height={height}>
            <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#9cfaff" complement />
            <PatternWaves id="cherry" height={12} width={12} fill="transparent" stroke="#d0ffff" strokeWidth={1} />
            <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
            <PatternCircles id="transparent" height={60} width={60} radius={10} fill="transparent" complement />
            
            <g 
                onClick={(_event: TouchEventHandler<SVGGElement>) => forceUpdate()} 
                onTouchStart={(_event: TouchEventHandler<SVGGElement>) => forceUpdate()}
            >
              <rect x={0} y={0} width={width} height={height} />
              <Graph data={data} xScale={xScale} yScale={yScale} />
            </g>
          </svg>
        </div>
      
    )
  }
}

const Example = () => (
    <ParentSize>
        {({ height, width }: ParentSizeProps) => (
            <SteamGraphExample
                height={height} 
                width={width}
            />
        )}
    </ParentSize>
)

export default Example


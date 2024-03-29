import React from 'react'

import { Group } from '@visx/group'
import { curveBasis } from '@visx/curve'
import { LinePath } from '@visx/shape'
import { Threshold } from '@visx/threshold'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'

import { AreaDifferenceProps } from './interfaces'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature'

const RADIUS = 14
const DEFAULT_MARGIN = { top: 40, right: 30, bottom: 50, left: 40 };

const date = (d: CityTemperature) => new Date(d.date).valueOf();
const ny = (d: CityTemperature) => Number(d['New York']);
const sf = (d: CityTemperature) => Number(d['San Francisco']);

export const TICK_LABEL_PROPS = {
    backgroundColor: 'red',
    color: 'green',
    fontSize: '$3',
}

export const AreaDifference = ({ height, width, margin = DEFAULT_MARGIN }: AreaDifferenceProps) => {

    if(width < 10) return null

    const colors = useGloballyConsistentColors()

    const yMax = height -   margin.top  -   margin.bottom 
    const xMax = width  -   margin.left -   margin.right 

    const temperatureScale = scaleLinear<number>({
        domain: [
            Math.min(...cityTemperature.map((d: CityTemperature) => Math.min(ny(d), sf(d)))),
            Math.max(...cityTemperature.map((d: CityTemperature) => Math.max(ny(d), sf(d)))),
        ],
        range: [yMax, 0],
        nice: true,
    })

    const timeScale = scaleTime<number>({
        domain: [
            Math.min(...cityTemperature.map(date)),
            Math.max(...cityTemperature.map(date))
        ],
        range: [0, xMax]
    })

    return (
        <div>
            <svg height={height} width={width}>
                <rect
                    x={0}
                    y={0}
                    height={height}
                    width={width}
                    fill={colors.loContrast}
                    rx={RADIUS}
                />
                <Group left={margin.left} top={margin.top}>
                    <GridRows 
                        scale={temperatureScale} 
                        width={xMax} 
                        height={yMax} 
                        stroke={colors.border}
                    /> 
                    <GridColumns
                        scale={timeScale}
                        width={xMax}
                        height={yMax}
                        stroke={colors.border}
                    /> 
                     <line 
                        x1={xMax} 
                        x2={xMax} 
                        y1={0} 
                        y2={yMax} 
                        stroke={colors.hiContrast}
                        strokeOpacity={0.4}
                    />
                    <AxisBottom 
                        scale={timeScale} 
                        top={yMax} 
                        numTicks={width > 520 ? 10 : 5}
                        stroke={colors.text} 
                        tickStroke={colors.text}
                    />
                    <AxisLeft
                        scale={temperatureScale}
                        stroke={colors.text}
                        tickStroke={colors.text}
                    /> 
                    <text x="-200" y="15" transform="rotate(-90)" fontSize={10}>
                        {JSON.stringify(Object.keys(cityTemperature[0]))}
                    </text>
                    <Threshold<CityTemperature>
                        id={`${Math.random()}`}
                        data={cityTemperature}
                        x={(d: CityTemperature) => timeScale(date(d)) ?? 0}
                        y0={(d: CityTemperature) => temperatureScale(ny(d)) ?? 0}
                        y1={(d: CityTemperature) => temperatureScale(sf(d)) ?? 0}
                        clipAboveTo={0}
                        clipBelowTo={yMax}
                        curve={curveBasis}
                        belowAreaProps={{
                            fill: colors.funkyText, 
                            fillOpacity: 0.4,
                        }}
                        aboveAreaProps={{
                            fill: colors.accent,
                            fillOpacity: 0.4,
                        }}
                    />
                    <LinePath
                        data={cityTemperature}
                        curve={curveBasis}
                        x={(d: CityTemperature) => timeScale(date(d)) ?? 0}
                        y={(d: CityTemperature) => temperatureScale(ny(d)) ?? 0}
                        stroke={colors.text}
                        strokeWidth={1.5}
                        strokeOpacity={0.8}
                        strokeDasharray="1,2"
                    />
                   <LinePath
                        data={cityTemperature}
                        curve={curveBasis}
                        x={(d: CityTemperature) => timeScale(date(d)) ?? 0}
                        y={(d: CityTemperature) => temperatureScale(sf(d)) ?? 0}
                        stroke={colors.text}
                        strokeWidth={1.5}
                    />
                </Group>
            </svg>
        </div>
    )
}
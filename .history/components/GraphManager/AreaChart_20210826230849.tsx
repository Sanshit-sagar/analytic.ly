import React from 'react'
import { 
    Datum,
    AreaChartProps,
    ClickDate,
    ClickScore
} from './interfaces'

import {
    AXIS_LEFT_TICK_LABEL_PROPS,
    AXIS_BOTTOM_TICK_LABEL_PROPS,
    AXIS_COLOR
} from './constants'

import { 
    AnimatedAxis, 
    AnimatedGridRows, 
    AnimatedGridColumns 
} from '@visx/react-spring'

import {
    AxisDirection,
    AnimationTrajectory,
    TickCount
} from './interfaces'

import { Orientation } from '@visx/axis'
import { AreaClosed } from '@visx/shape'
import { LinearGradient } from '@visx/gradient'
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group'

const AreaChart:React.FC<AreaChartProps> = ({
    data,
    width,
    yMax,
    margin,
    xScale,
    yScale,
    gradientColor,
    hideBottomAxis = false,
    hideLeftAxis = false,
    hideGrid = false,
    top,
    left,
    children
}) => {
    if(width < 10) return null; 

    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    
    const ANIMATION_TRAJECTORY: AnimationTrajectory = 'center'
    const LEFT: AxisDirection = Orientation.left
    const BOTTOM: AxisDirection = Orientation.bottom
    const NUM_TICKS: TickCount = { x: width > 520 ? 4 : 2, y: 5 }

    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <LinearGradient
                id="gradient"
                from={gradientColor}
                fromOpacity={1}
                to={gradientColor}
                toOpacity={0.2}
            />
            {!hideGrid && 
                <>
                    <AnimatedGridRows
                        key={`gridrows-${ANIMATION_TRAJECTORY}`}
                        scale={yScale}
                        stroke={'rgba(255,255,255,0.15)'}
                        width={width}
                        numTicks={2*NUM_TICKS.x}
                        animationTrajectory={ANIMATION_TRAJECTORY}
                    />
                    <AnimatedGridColumns
                       key={`gridcolumns-${ANIMATION_TRAJECTORY}`}
                       scale={xScale}
                       stroke={'rgba(255,255,255,0.15)'}
                       height={yMax}
                       numTicks={2*NUM_TICKS.y}
                       animationTrajectory={ANIMATION_TRAJECTORY}
                    />
                </>
            }
            <AreaClosed<Datum>
                data={data}
                x={(d: Datum) => xScale(getDate(d)) || 0}
                y={(d: Datum) => yScale(getClickScore(d)) || 0}
                yScale={yScale}
                strokeWidth={1}
                stroke='url(#gradient)'
                fill='url(#gradient)'
                curve={curveMonotoneX}
            />
            {!hideBottomAxis && (
                <AnimatedAxis
                    key={`axis_${BOTTOM}-animation_${ANIMATION_TRAJECTORY}`}
                    hideAxisLine
                    hideTicks
                    orientation={Orientation.bottom}
                    top={yMax}
                    scale={xScale}
                    stroke={AXIS_COLOR}
                    tickStroke={AXIS_COLOR}
                    numTicks={NUM_TICKS.x}
                    tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                    animationTrajectory={ANIMATION_TRAJECTORY}
                    label={'TIME'}
                    labelProps={{
                        x: width + 30,
                        y: -10,
                        fill: 'red',
                        fontSize: 18,
                        strokeWidth: 0,
                        stroke: '#fff',
                        paintOrder: 'stroke',
                        fontFamily: 'sans-serif',
                        textAnchor: 'start',
                    }}
                />
            )}
            {!hideLeftAxis && (
                <AnimatedAxis
                    key={`axis_${LEFT}-animation_${ANIMATION_TRAJECTORY}`}
                    hideAxisLine
                    hideTicks
                    hideZero
                    orientation={LEFT}
                    left={0}
                    scale={yScale}
                    stroke={AXIS_COLOR}
                    tickStroke={AXIS_COLOR}
                    numTicks={5}
                    tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
                    animationTrajectory={ANIMATION_TRAJECTORY}
                />
            )}
            {children}
        </Group>
    )
}

export default AreaChart
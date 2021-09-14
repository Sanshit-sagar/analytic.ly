import React from 'react'
import { 
    Datum,
    AreaChartProps,
    ClickDate,
    ClickScore
} from './interfaces'

import {
    AXIS_LEFT_TICK_LABEL_PROPS,
    AXIS_BOTTOM_TICK_LABEL_PROPS
} from './constants'

import { 
    AnimatedAxis, 
    AnimatedGridRows, 
    AnimatedGridColumns 
} from '@visx/react-spring'

import { Grid } from '@visx/grid'
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

import { Text } from '../../primitives/Text'

import { useAtomValue } from 'jotai/utils'

import { darkModeAtom } from '../../pages/index'

const AreaChart:React.FC<AreaChartProps> = ({
    data,
    loading, 
    error,
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

    const darkMode = useAtomValue(darkModeAtom)

    const LABEL_COLOR = 'red'
    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    
    const ANIMATION_TRAJECTORY: AnimationTrajectory = 'center'
    const LEFT: AxisDirection = Orientation.left
    const BOTTOM: AxisDirection = Orientation.bottom
    const NUM_TICKS: TickCount = { x: width > 520 ? 4 : 2, y: 5 }

    if(loading) return <Text> Loading... </Text>;
    if(error) return <Text> Error! </Text>;

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
                <Grid
                    top={0}
                    left={0}
                    xScale={xScale}
                    yScale={yScale}
                    width={width}
                    height={yMax}
                    stroke={!darkMode ? 'white' : 'black'}
                    strokeDasharray="5 5"
                    strokeOpacity={0.25}
                />
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
                    stroke={LABEL_COLOR}
                    tickStroke={LABEL_COLOR}
                    numTicks={NUM_TICKS.x}
                    tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                    animationTrajectory={ANIMATION_TRAJECTORY}
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
                    stroke={LABEL_COLOR}
                    tickStroke={LABEL_COLOR}
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


// {!hideGrid && 
    // <>
        {/* <AnimatedGridRows */}
            // key={`gridrows-${ANIMATION_TRAJECTORY}`}
            // scale={yScale}
            // stroke={darkMode ? 'black' :'white'}
            // width={width}
            // numTicks={3*NUM_TICKS.x}
            // animationTrajectory={ANIMATION_TRAJECTORY}
        // />
        {/* <AnimatedGridColumns */}
        //    key={`gridcolumns-${ANIMATION_TRAJECTORY}`}
        //    scale={xScale}
        //    stroke={darkMode ? 'black' :'white'}
        //    height={yMax}
        //    numTicks={3*NUM_TICKS.y}
        //    animationTrajectory={ANIMATION_TRAJECTORY}
        // />
    {/* </> */}
// }
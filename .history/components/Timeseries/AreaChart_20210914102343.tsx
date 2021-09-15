import React from 'react'

import { useAtomValue } from 'jotai/utils'

import { 
    Datum,
    AreaChartProps,
    ClickDate,
    ClickScore,
    AxisDirection,
    AnimationTrajectory,
    TickCount
} from './interfaces'

import { Orientation } from '@visx/axis'
import { AreaClosed } from '@visx/shape'
import { LinearGradient } from '@visx/gradient'
import { curveMonotoneX } from '@visx/curve';
import { Group } from '@visx/group'
import { Axis } from '@visx/axis'
import { Grid } from '@visx/grid'

import { Text } from '../../primitives/Text'
import { useGloballyConsistentColors } from '../../hooks/useColors'








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

    const colors = useGloballyConsistentColors()

    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    
    const ANIMATION_TRAJECTORY: AnimationTrajectory = 'center'
    const LEFT: AxisDirection = Orientation.left
    const BOTTOM: AxisDirection = Orientation.bottom
    const NUM_TICKS: TickCount = { x: width > 520 ? 4 : 2, y: 5 }
   
    const tickLabelProps = () =>
        ({
        fill: colors.text,
        fontSize: 10,
        textAnchor: 'middle'
    } as const);

    if(loading) return <Text> Loading... </Text>
    if(error) return <Text> Error! </Text>


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
                    width={width * 0.95}
                    height={yMax}
                    stroke={colors.funkyText}
                    strokeDasharray="2 4"
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
                <Axis
                    key={`axis_${BOTTOM}-animation_${ANIMATION_TRAJECTORY}`}
                    hideAxisLine
                    hideTicks
                    orientation={Orientation.bottom}
                    top={yMax}
                    scale={xScale}
                    stroke={'#fff'}
                    tickStroke={'#fff'}
                    tickLabelProps={tickLabelProps}
                    numTicks={NUM_TICKS.x}
                />
            )}
            {!hideLeftAxis && (
                <Axis
                    key={`axis_${LEFT}-animation_${ANIMATION_TRAJECTORY}`}
                    hideAxisLine
                    hideTicks
                    hideZero
                    orientation={LEFT}
                    left={0}
                    scale={yScale}
                    stroke={'#fff'}
                    tickStroke={'#fff'}
                    tickFormat={(value: string) => `${Math.round(parseInt(value))}`}
                    tickLabelProps={tickLabelProps}
                    numTicks={NUM_TICKS.y}
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
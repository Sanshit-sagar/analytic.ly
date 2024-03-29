import React from 'react'

import { 
    Datum,
    AreaChartProps,
    ClickDate,
    ClickScore,
    AxisDirection,
    AnimationTrajectory,
    TickCount
} from './interfaces'

import { Axis } from '@visx/axis'
import { Grid } from '@visx/grid'
import { Group } from '@visx/group'
import { Orientation } from '@visx/axis'
import { AreaClosed } from '@visx/shape'
import { curveLinear } from '@visx/curve'
import { LinearGradient } from '@visx/gradient'

import { useGloballyConsistentColors } from '../../hooks/useColors'

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

    const ANIMATION_TRAJECTORY: AnimationTrajectory = 'center'
    const LEFT: AxisDirection = Orientation.left
    const BOTTOM: AxisDirection = Orientation.bottom
    const NUM_TICKS: TickCount = { 
        x: width > 520 ? 4 : 2,
        y: 5 
    }

    const colors = useGloballyConsistentColors()
    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    
    if(width < 10) return null; 
       
    const tickLabelProps = () =>({
        fill: colors.text,
        fontSize: 10,
        textAnchor: 'middle'
    } as const);

    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <LinearGradient
                id="gradient"
                from={gradientColor}
                fromOpacity={0.4}
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
                curve={curveLinear}
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
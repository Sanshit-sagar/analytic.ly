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
import { AnimatedAxis } from '@visx/react-spring'
import { AxisLeft, AxisBottom, Orientation } from '@visx/axis'
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
    top,
    left,
    children
}) => {
    if(width < 10) return null; 

    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    
    const ANIMATION_TRAJECTORY:AnimationTrajectory = 'center'
    const LEFT: AxisDirection = Orientation.left;
    const BOTTOM: AxisDirection = Orientation.bottom;

    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <LinearGradient
                id="gradient"
                from={gradientColor}
                fromOpacity={1}
                to={gradientColor}
                toOpacity={0.2}
             />
            <AreaClosed<Datum>
                data={data}
                x={(d: Datum) => xScale(getDate(d)) || 0}
                y={(d: Datum) => yScale(getClickScore(d)) || 0}
                yScale={yScale}
                strokeWidth={1}
                stroke="url(#gradient)"
                fill="url(#gradient)"
                curve={curveMonotoneX}
            />
            {!hideBottomAxis && (
                // <AxisBottom
                    // top={yMax}
                    // scale={xScale}
                    // numTicks={width > 520 ? 10 : 5}
                    // stroke={AXIS_COLOR}
                    // tickStroke={AXIS_COLOR}
                    // tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                // />
                <AnimatedAxis
                    key={`axis-center`}
                    orientation={Orientation.bottom}
                    top={yMax}
                    scale={xScale}
                    stroke={AXIS_COLOR}
                    tickStroke={AXIS_COLOR}
                    numTicks={width > 520 ? 4 : 1}
                    tickLabelProps={() => AXIS_BOTTOM_TICK_LABEL_PROPS}
                    animationTrajectory={ANIMATION_TRAJECTORY}
                />
            )}
            {!hideLeftAxis && (
                // <AxisLeft
                    // scale={yScale}
                    // numTicks={5}
                    // stroke={AXIS_COLOR}
                    // tickStroke={AXIS_COLOR}
                    // tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
                // />
                    <AnimatedAxis
                        key={`axis_${LEFT}-animation_${ANIMATION_TRAJECTORY}`}
                        orientation={LEFT}
                        top={yMax}
                        scale={yScale}
                        stroke={AXIS_COLOR}
                        tickStroke={AXIS_COLOR}
                        numTicks={Y_AXIS_NUM_TICKS}
                        tickLabelProps={() => AXIS_LEFT_TICK_LABEL_PROPS}
                        animationTrajectory={ANIMATION_TRAJECTORY}
                    />
                )}
            {children}
        </Group>
    )
}

export default AreaChart
import React, { Fragment, useMemo, useCallback } from 'react'

import { Line, Bar } from '@visx/shape'
import { localPoint } from '@visx/event'
import { scaleLinear, scaleTime } from '@visx/scale'
import { extent, min, max, bisector } from 'd3-array'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { timeFormat } from 'd3-time-format'

import AreaChart from './AreaChart'
import { XAxisLabel } from './Annotation'
import { Box } from '../../primitives/Box'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { useAtomValue } from 'jotai/utils'
import { useFormattedDateRange } from '../../hooks/useDates'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import { filteredDataAtom, boundsAtom, activeFilteredDataAtom } from '../../atoms/timeseries'

import { Datum, PrimaryChartProps, ClickDate, ClickScore} from './interfaces'

interface LabelProps {
    stroke: string; 
    text: string;
}

const DEFAULT_MARGIN = { 
    top: 0, 
    left: 0,
    bottom: 20, 
    right: 0 
}

const tooltipStyles = {
    ...defaultStyles,
    border: '1px solid white',
    color: 'white',
};

const getDate = (d: Datum): ClickDate => d.clickdate 
const getClickScore = (d: Datum): ClickScore => d.clickscore
// const getFormatValue = (d: Datum): string =>  `${d.clickscore}`
const bisectDate = bisector<Datum, Date>((d: Datum) => new Date(d.clickdate)).left
const formatDate = timeFormat("%b %d, '%y");

const ClicksLabel = ({ 
    stroke = '#fff', 
    text 
}: LabelProps) => (
    <text 
        x="-70" 
        y="50" 
        transform="rotate(-90)" 
        fontSize={14} 
        stroke={stroke}
    >
        {text} 
    </text>
)

const FilteredDataView: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    margin = DEFAULT_MARGIN,
}) => {
    // const innerWidth  = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const {
        tooltipTop = 0,
        tooltipLeft = 0,
        tooltipData,
        showTooltip,
        hideTooltip
    } = useTooltip<Datum>();

    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = Math.max(height - margin.top - margin.bottom, 0);

    const data: Datum[] = useAtomValue(activeFilteredDataAtom)
    const dateScale = useMemo(() => {
        return scaleTime({
            range: [0, xMax],
            domain: extent(data, getDate) as [Date, Date],
        })
    }, [xMax, data]);

    const clickScale = useMemo(() => {
        return scaleLinear({
            range: [yMax + margin.top, margin.top],
            domain: [min(data, getClickScore) || 0, max(data, getClickScore) || 0],
            nice: true,
        })
    }, [margin.top, yMax, data]);

    const handleTooltip = useCallback((event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: 0 }
        const currX = x - margin.left
        const x0 = dateScale.invert(currX)
        const index = bisectDate(data, x0, 1)

        let d = data[index - 1]
        let d0 = data[index - 1]
        let d1 = data[index]
      
        if (d1 && getDate(d1))  {
            d = (x0.valueOf() - getDate(d0).valueOf()) > (getDate(d1).valueOf() - x0.valueOf()) ? d1 : d0
        }
       
        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: clickScale(getClickScore(d)),
        })
    }, [showTooltip, clickScale, dateScale, data, margin.left]);
    
    const bounds = useAtomValue(boundsAtom)
    const colors = useGloballyConsistentColors()
    const dates = useFormattedDateRange(bounds.x0, bounds.x1)

    if(width < 10) return null;
    
    return (
        <Fragment>
            <svg height={height} width={width}>
                <rect
                    fill='transparent' 
                    width={width} 
                    height={height} 
                    rx={5} 
                />
                <XAxisLabel
                    height={height}
                    width={width}
                    start={dates.start}
                    end={dates.end}
                /> 
                <ClicksLabel 
                    stroke={colors.text}
                    text={'CLICKS'}
                /> 
                <AreaChart
                    data={data}
                    width={width}
                    margin={{ ...margin }}
                    yMax={yMax}
                    xScale={dateScale}
                    yScale={clickScale}
                    top={margin.top}
                    left={margin.left}
                    gradientColor={colors.funky}
                />
                <Bar
                    x={margin.left}
                    y={margin.top * 2}
                    width={xMax}
                    height={yMax}
                    fill="transparent"
                    rx={14}
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={() => hideTooltip()}
                />
                {tooltipData && (
                <g>
                    <Line
                        from={{ 
                            x: tooltipLeft, 
                            y: margin.top * 2 
                        }}
                        to={{ 
                            x: tooltipLeft, 
                            y: yMax + margin.top * 2 
                        }}
                        stroke={colors.accent}
                        strokeWidth={2}
                        pointerEvents='none'
                        strokeDasharray='5,2'
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={tooltipTop + 1 + margin.top}
                        r={4}
                        fill={colors.loContrast}
                        fillOpacity={0.1}
                        stroke={colors.loContrast}
                        strokeOpacity={0.1}
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={tooltipTop + margin.top}
                        r={4}
                        fill={colors.accent} 
                        stroke={colors.hiContrast}
                        strokeWidth={2}
                        pointerEvents="none"
                    />
                </g>)}
            </svg>
            {tooltipData && (
                <div>
                    <TooltipWithBounds
                        key={`${Math.random()}`}
                        top={tooltipTop + 700}
                        left={tooltipLeft}
                        style={{ 
                            ...tooltipStyles, 
                            backgroundColor: colors.loContrast 
                        }}
                    >
                        {getClickScore(tooltipData)}
                    </TooltipWithBounds>
                    <TooltipWithBounds
                        key={`${Math.random()}`}
                        top={innerHeight + margin.top + 700}
                        left={tooltipLeft}
                        style={{
                            ...defaultStyles,
                            minWidth: 72,
                            textAlign: 'center'
                        }}
                    >
                        {formatDate(getDate(tooltipData))}
                    </TooltipWithBounds>
                </div>
            )}
        </Fragment>
    );
}

const PrimaryChart = ({ 
    height, 
    width, 
    margin 
}: PrimaryChartProps) => (
    <Box 
        css={{ 
            height: height, 
            width: width
        }}
    >
        <ParentSize> 
            {({ height, width }: { height: number; width: number; }) => (
                <FilteredDataView 
                    height={height} 
                    width={width} 
                    margin={margin}
                /> 
            )}
        </ParentSize>
    </Box>
)


export default PrimaryChart


{/* <TooltipWrapper>
    <Text size='2' css={{ color: '$funky'}}>{getFormatValue(tooltipData)} </Text>
    <Text size='1' css={{ color: '$text'}}>{tooltipData.clickfmttime}</Text>
</TooltipWrapper>    */}
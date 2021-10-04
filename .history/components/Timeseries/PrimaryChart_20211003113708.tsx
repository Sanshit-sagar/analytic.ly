import React, { Fragment, useMemo, useCallback } from 'react'

import { Line, Bar } from '@visx/shape'
import { localPoint } from '@visx/event'
import { scaleLinear, scaleTime } from '@visx/scale'
import { extent, min, max, bisector } from 'd3-array'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'

import AreaChart from './AreaChart'
import { XAxisLabel } from './Annotation'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { TooltipWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { useAtomValue } from 'jotai/utils'
import { useFormattedDateRange } from '../../hooks/useDates'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import { filteredDataAtom, boundsAtom } from '../../atoms/timeseries'

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
    background,
    border: '1px solid white',
    color: 'white',
};

const getDate = (d: Datum): ClickDate => d.clickdate 
const getClickScore = (d: Datum): ClickScore => d.clickscore
const getFormatValue = (d: Datum): string =>  `${d.clickscore}`
const bisectDate = bisector<Datum, Date>((d: Datum) => new Date(d.clickdate)).left

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
   
    if(width < 10) return null;

    const {
        tooltipTop = 0,
        tooltipLeft = 0,
        tooltipData,
        showTooltip,
        hideTooltip
    } = useTooltip<Datum>();

    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = Math.max(height - margin.top - margin.bottom, 0);

    const data = useAtomValue(filteredDataAtom)
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
            d = x0.valueOf()-getDate(d0).valueOf()>getDate(d1).valueOf()-x0.valueOf() ? d1 : d0
        }

        if(d && d!==undefined) {
            showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: clickScale(getClickScore(d)),
        })} 
    }, [showTooltip, clickScale, dateScale]);
    
    const bounds = useAtomValue(boundsAtom)
    const colors = useGloballyConsistentColors()
    const dates = useFormattedDateRange(bounds.x0, bounds.x1)
    
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
                        stroke={'white'}
                        strokeWidth={2.5}
                        opacity={1.0}
                        pointerEvents='none'
                        strokeDasharray='5,5'
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={tooltipTop + 1 + margin.top}
                        r={4}
                        fill="white"
                        fillOpacity={0.75}
                        stroke="white"
                        strokeOpacity={0.5}
                        strokeWidth={1}
                        pointerEvents="none"
                    />
                    <circle
                        cx={tooltipLeft}
                        cy={tooltipTop + margin.top}
                        r={4}
                        fill={'pink'} 
                        stroke="white"
                        strokeWidth={1}
                        pointerEvents="none"
                    />
                </g>)}
            </svg>
            {tooltipData && (
                <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop - 12}
                    left={tooltipLeft + 12}
                    style={tooltipStyles}
                >
                    {}
                </TooltipWithBounds>
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
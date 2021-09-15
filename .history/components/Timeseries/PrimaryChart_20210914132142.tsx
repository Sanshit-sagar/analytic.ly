import React, { useMemo, useCallback } from 'react'

import { extent, min, max, bisector } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'
import { localPoint } from '@visx/event'
import { Line, Bar } from '@visx/shape'

import { 
    Datum, 
    PrimaryChartProps, 
    ClickDate, 
    ClickScore
} from './interfaces'
import { 
    useTooltip, 
    TooltipWithBounds,
    defaultStyles as DEFAULT_TOOLTIP_STYLES 
} from '@visx/tooltip'

import { Text } from '../../primitives/Text'
import { XAxisLabel } from './Annotation'
import AreaChart from './AreaChart'

import { useAtomValue } from 'jotai/utils'
import { filteredDataAtom, boundsAtom } from '../../pages/index'

import { useGloballyConsistentColors } from '../../hooks/useColors'
import { useFormattedDateRange } from '../../hooks/useDates'
import { TooltipWrapper } from '../../primitives/Shared'

const getDate = (d: Datum): ClickDate => d.clickdate 
const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
const getFormatValue = (d: Datum): string => {return `${d.clickscore}`;}
const bisectDate = bisector<Datum, Date>((d: Datum) => new Date(d.clickdate)).left


export const accentColor = 'rgba(255,250,150,1.0)';
export const background2 = 'rgba(25,50,255,1.0)';


const PrimaryChart: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    loading,
    error,
    margin={ top: 0, left: 0, bottom: 20, right: 0 },
}) => {
    if(width < 10) return null;

    const data = useAtomValue(filteredDataAtom)
    const bounds = useAtomValue(boundsAtom)

    const {
        tooltipTop = 0,
        tooltipLeft = 0,
        tooltipData,
        showTooltip,
        hideTooltip
    } = useTooltip<Datum>();

    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = Math.max(height - margin.top - margin.bottom, 0);

    const dateScale = useMemo(() => {
      return scaleTime({
        range: [0, xMax],
        domain: extent(data, getDate) as [Date, Date],
        // domain: [new Date(new Date().getTime() - durationInMs),new Date()]
        // domain: [start, end] 
      });
    }, [xMax, data]);

    const clickScale = useMemo(() => {
      return scaleLinear({
        range: [yMax + margin.top, margin.top],
        domain: [min(data, getClickScore) || 0, max(data, getClickScore) || 0],
        nice: true,
      });
    }, [margin.top, yMax, data]);

    const handleTooltip = useCallback((event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: 0 };
        const currX = x - margin.left;
        const x0 = dateScale.invert(currX);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;

        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }

        if(d && d!==undefined) {
            showTooltip({
              tooltipData: { 
                    index: d?.index || -1,
                    clickscore: d?.clickscore || 0,
                    timestamp: d?.timestamp || new Date(1970,1,1).getTime(), 
                    clickfmttime: d?.clickfmttime || '-', 
                    clickdate: d?.clickdate || new Date(1970,1,1)
              },
              tooltipLeft: x,
              tooltipTop: clickScale(getClickScore(d)),
            });
          }
        }, [showTooltip, clickScale, dateScale, data, margin.left]);
    
    const colors = useGloballyConsistentColors()
    const dates = useFormattedDateRange(bounds.x0, bounds.x1)
    
    return (
    <>
        <svg height={height} width={width}>
            <rect
                fill='transparent' 
                width={width} 
                height={height} 
                rx={5} 
            />
            {/* <GraphDetailsAnnotation details={details} /> */}
            <XAxisLabel
                height={height}
                width={width}
                start={dates.start}
                end={dates.end}
            /> 
            <text x="-70" y="50" transform="rotate(-90)" fontSize={14} stroke={colors.text}>
                CLICKS 
            </text>
            <AreaChart
                data={data}
                loading={loading}
                error={error} 
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
                    from={{ x: tooltipLeft, y: margin.top * 2 }}
                    to={{ x: tooltipLeft, y: yMax + margin.top * 2 }}
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
                left={tooltipLeft}
                style={{
                    ...DEFAULT_TOOLTIP_STYLES,
                    minWidth: 175,
                    backgroundColor: '$neutral',
                    zIndex: 4 
                }}
            >
                <TooltipWrapper>
                    <Text size='1' css={{ color: '$text'}}> Clicks: {getFormatValue(tooltipData)} </Text>
                    <Text size='1' css={{ color: '$text'}}> Timestamp: {new Date(tooltipData.timestamp).toLocaleString()} </Text>
                    <Text size='1' css={{ color: '$text'}}> FmtTime: {tooltipData.clickfmttime} </Text>
                </TooltipWrapper>   
            </TooltipWithBounds>
        )}
        </>
    );
}


export default PrimaryChart
import React, { useMemo, useCallback } from 'react'

import { extent, min, max, bisector } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'
import { localPoint } from '@visx/event'
import { Line, Bar } from '@visx/shape'
import { LinearGradient } from '@visx/gradient'

import { 
    Datum, 
    PrimaryChartProps, 
    ClickDate, 
    ClickScore,
    GraphDetails
} from './interfaces'

import { 
    useTooltip, 
    TooltipWithBounds,
    defaultStyles as defaultToopTipStyles 
} from '@visx/tooltip'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import AreaChart from './AreaChart'
import {
    Connector,
    Annotation,
    Label
} from '@visx/annotation'
import { animated } from  'react-spring'

const getDate = (d: Datum): ClickDate => d.clickdate 
const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
const getFormatValue = (d: Datum): string => {return `${d.clickscore}`;}
const bisectDate = bisector<Datum, Date>((d: Datum) => new Date(d.clickdate)).left


const GRADIENT_ID = 'brush_gradient';
export const accentColor = 'rgba(50,250,150,1.0)';
export const background = '#04002b';
export const background2 = 'rgba(50,250,150,1.0)';

const PrimaryChart: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    data,
    details,
    margin={ top: 0, left: 0, bottom: 20, right: 0 },
}) => {
    if(width < 10) return null;

    // const { 
        // start, 
        // end, 
        // durationInMs, 
        // numIntervals, 
        // tickSizeInMs 
    // }: GraphDetails = details;

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
    },
    [showTooltip, clickScale, dateScale, data, margin.left]
  );
  
    
    return (
    <>
        <svg height={height} width={width}>
            <LinearGradient 
                id={GRADIENT_ID} 
                from={background} 
                to={background2} 
                rotate={45} 
            />
            <rect 
                fill='#04002b' 
                width={width} 
                height={height} 
                rx={14} 
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
                 gradientColor={background2}
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
                    strokeWidth={1}
                    opacity={0.8}
                    pointerEvents='none'
                    strokeDasharray='5,2'
                />
                <circle
                    cx={tooltipLeft}
                    cy={tooltipTop + 1 + margin.top}
                    r={4}
                    fill="white"
                    fillOpacity={0.5}
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
                        ...defaultToopTipStyles,
                        borderRadius: '5px',
                        border: 'thin solid black'
                    }}
                >
                    <Box css={{ padding: '$1', height: '50px', width: '175px', br: '$1', bc: 'white'}}>
                        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1'}}>
                            <Text size='1'> Clicks: {getFormatValue(tooltipData)} </Text>
                            <Text size='1'> Timestamp: {tooltipData.timestamp} </Text>
                            <Text size='1'> FmtTime: {tooltipData.clickfmttime} </Text>
                        </Flex>        
                    </Box>
                </TooltipWithBounds>
            )}
        </>
    );
}


export default PrimaryChart
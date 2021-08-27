import React, { useMemo, useCallback } from 'react'

import { extent, min, max, bisector } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'
import { localPoint } from '@visx/event'
import { Bar } from '@visx/shape'

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

import { format as customDateFormat } from '../../lib/utils/d3time'
import LineChart from './LineChart'

type TooltipEvent = React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>

const getDate = (d: Datum): ClickDate => d.clickdate
const getClickScore = (d: Datum): ClickScore => d.clickscore
const getFormatValue = (d: Datum): ClickScore => parseInt(`${d.clickscore}`)
const bisectDate = bisector<Datum, Date>((d: Datum) => new Date(d.clickdate)).left

const PrimaryChart: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    data,
    margin={ top: 0, left: 0, bottom: 0, right: 0 },
}) => {
    if(width < 10) return null;

    const {
        tooltipTop = 0,
        tooltipLeft = 0,
        tooltipData,
        showTooltip,
        hideTooltip
    } = useTooltip<Datum>();

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right 

    const dateScale = useMemo(() => {
        return scaleTime({
            range: [0, xMax],
            domain: extent(data, getDate) as [Date, Date],
        });
    }, [xMax, data]);

    const clickScale = useMemo(() => {
        return scaleLinear({
            range: [yMax + margin.top, margin.top],
            domain: [min(data, getClickScore) || 0, max(data, getClickScore) || 0],
            nice: true
        });
    }, [margin.top, yMax, data]);

    const handleTooltip = useCallback((event: TooltipEvent) => {
        const { x } = localPoint(event) || { x: 0 };
        const currX = x - margin.left;
        const x0 = dateScale.invert(currX);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;

        if (d1 && getDate(d1)) {
            d = 
                x0.valueOf() - getDate(d0).valueOf() > 
                getDate(d1).valueOf() - x0.valueOf() 
                ? d1 
                : d0 
        }

        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: clickScale(getClickScore(d)),
        });
    }, [showTooltip, clickScale, dateScale, data, margin.left]);
    
    return (
    <>
        <p> {JSON.stringify(data)} </p>
        <div style={{ position: 'relative', margin: '0 0 1rem'}}>
            <svg height={height} width={width}>
                <LineChart
                    data={data}
                    width={width}
                    margin={{ ...margin }}
                    yMax={yMax}
                    xScale={dateScale}
                    yScale={clickScale}
                    stroke={'black'}
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
              stroke={theme.colors.primary}
              strokeWidth={2}
              opacity={0.5}
              pointerEvents="none"
              strokeDasharray="5,2"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + 1 + margin.top}
              r={4}
              fill="black"
              fillOpacity={0.1}
              stroke="black"
              strokeOpacity={0.1}
              strokeWidth={2}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop + margin.top}
              r={4}
              fill={theme.colors.lapislazuli}
              stroke="white"
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
            {tooltipData && (
                <div>
                  <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop - 12}
                    left={tooltipLeft}
                    style={{
                        ...DEFAULT_TOOLTIP_STYLES,
                        background: 'black',
                        padding: '0.5rem',
                        border: '1px solid white',
                        color: 'white',
                    }}
                  >
                    <ul style={{ padding: '0', margin: '0', listStyle: 'none' }}>
                      <li style={{ paddingBottom: "0.25rem" }}>
                        <b>{JSON.stringify(tooltipData).length}</b>
                      </li>
                      <li>
                        Score: <b>{`${getFormatValue(tooltipData)}`}</b>
                      </li>
                    </ul>
                  </TooltipWithBounds>
                </div>
            )}
        </div>
    </>
    );
}


export default PrimaryChart
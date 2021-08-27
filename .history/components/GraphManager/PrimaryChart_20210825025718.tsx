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
        const localPt = localPoint(event) || { x: 0 };
        if(!localPt || localPt===undefined) return;

        const x = localPt.x;
        const y = localPt.y;
        showTooltip({
            tooltipData: { x: `X is ${x}`, y: `Y is ${y}`},
            tooltipLeft: x,
            tooltipTop: clickScale(getClickScore(d)),
        });
    }, [showTooltip, clickScale, dateScale, data, margin.left]);
    
    return (
        <div style={{ position: 'relative', margin: '0 0 1rem'}}>
            <svg height={height} width={width}>
                <LineChart
                    data={data}
                    width={width}
                    margin={{ ...margin }}
                    yMax={yMax}
                    xScale={dateScale}
                    yScale={clickScale}
                    xTickFormat={(d: Datum) =>  `${d.clickscore} clicks`}
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
                        <b>{JSON.stringify(tooltipData)}</b>
                      </li>
                    </ul>
                  </TooltipWithBounds>
                </div>
            )}
        </div>
    );
}


export default PrimaryChart
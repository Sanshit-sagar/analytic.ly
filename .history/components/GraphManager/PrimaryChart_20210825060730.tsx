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
    defaultStyles as defaultToopTipStyles 
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

  
  

  
  
  
  
  
  

  
  
  
  re) || 0],
  
  
  

  
  
  
  
  
  
  
  

  
  
  
  
  
  
  

  
  
  
  
  
  
    
    return (
    <>
        {/* <p> {JSON.stringify(data)} </p> */}
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
                   stroke={'black'}
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
                   fill={'black'} 
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
                         ...defaultToopTipStyles,
                         background: 'black',
                         padding: "0.5rem",
                         border: "1px solid white",
                         color: "white",
                       }}
                     >
                       <ul style={{ padding: "0", margin: "0", listStyle: "none" }}>
                         <li style={{ paddingBottom: "0.25rem" }}>
                           <b>{JSON.stringify(tooltipData)}</b>
                         </li>
                         <li>
                           Price: <b>{`${getFormatValue(tooltipData)}`}</b>
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
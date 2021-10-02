import React, { useEffect, useMemo, useRef } from 'react'

import {
    SecondaryChartProps,
    ClickDate,
    ClickScore,
    Datum
} from './interfaces'

import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Brush } from '@visx/brush'
import { PatternLines } from '@visx/pattern'
import { Bounds } from '@visx/brush/lib/types'
import BaseBrush from '@visx/brush/lib/BaseBrush'
import { scaleLinear, scaleTime } from '@visx/scale'

import AreaChart from './AreaChart' 
import { XAxisLabel } from './Annotation'
import { min, max, extent } from 'd3-array'

import { useFormattedDateRange } from '../../hooks/useDates'
import { useGloballyConsistentColors } from '../../hooks/useColors'
import { mappedDataAtom, mappedRangeAtom, filteredDataAtom, boundsAtom } from '../../atoms/timeseries'

export const PATTERN_ID = 'brush_pattern'
export const background = '#04002b'
const DEFAULT_MARGIN = { top: 0, right: 20, bottom: 0, left: 0 }
const selectedBrushStyle = { fill: `url(#${PATTERN_ID})`, stroke: background }

const SecondaryChart: React.FC<SecondaryChartProps> = ({
    width=10,
    height,
    margin=DEFAULT_MARGIN,
}) => {

    const mappedData: Datum[] = useAtomValue(mappedDataAtom)
    const { start, end } = useAtomValue(mappedRangeAtom) 
    if(width < 10 || !mappedData?.length) return null
    
    if(!end) end = new Date();
    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right
    const data = [...mappedData]

    let getDate = (d: Datum): ClickDate => d.clickdate
    let getClickScore = (d: Datum): ClickScore => d.clickscore

    const brushRef = useRef<BaseBrush | null>(null); 

    const dateScale = useMemo(() => {
        return scaleTime({
            range: [0, xMax],
            domain: extent(data, getDate) as [Date, Date]
        });
    }, [xMax, data])

    const clickScale = useMemo(() => {
        return scaleLinear({
            range: [yMax + margin.top, margin.top],
            domain: [min(data, getClickScore) || 0, max(data, getClickScore) || 0],
            nice: true,
        })
    }, [margin.top, yMax, data])


    const [filteredData, setFilteredData] = useAtom(filteredDataAtom)
    const setBounds = useUpdateAtom(boundsAtom)

    const initialBrushPosition = useMemo(() => ({
        start: { x: dateScale(getDate(data[0])) },
        end: { x: dateScale(getDate(data[data.length - 1])) },
    }), [dateScale, data])

    useEffect(() => {
        if (data.length) {
            setFilteredData([...data])
            setBounds({ 
                x0: getDate(filteredData[0]).getTime(), 
                y0: getClickScore(filteredData[0]), 
                x1: getDate(filteredData[filteredData.length-1]).getTime(), 
                y1: getClickScore(filteredData[filteredData.length-1]),
            })
        }
    }, [data, setFilteredData])

    const onBrushChange = (domain: Bounds | null) => {
        if (!domain) return;
        const { x0, x1, y0, y1 } = domain;
     
        const filteredData = data.filter((s) => {
            const x = getDate(s).getTime();
            const y = getClickScore(s);
            return x > x0 && x < x1 && y > y0 && y < y1;
        })
        setBounds({...domain})
        setFilteredData(filteredData);
    };

    const colors = useGloballyConsistentColors()
    const dates = useFormattedDateRange(start, end)

    return (
        <div style={{ position: "relative" }}>
            <svg width={width} height={height}>
                <XAxisLabel 
                     height={height} 
                     width={width} 
                     start={dates.start}
                     end={dates.end}
                />          
                <AreaChart
                     hideLeftAxis
                     hideGrid
                     data={data}
                     width={width}
                     margin={{...margin}}
                     yMax={yMax}
                     xScale={dateScale}
                     yScale={clickScale}
                     gradientColor={colors.accent}
                >
                    <PatternLines
                        id={PATTERN_ID}
                        height={7}
                        width={8}
                        stroke={colors.text}
                        strokeWidth={0.5}
                        orientation={['diagonal']}
                    />
                    {/* reset the xmax, ymax below to brushxmax, brushymax */}
                    <Brush
                        innerRef={brushRef}
                        xScale={dateScale}
                        yScale={clickScale}
                        width={xMax}
                        height={yMax}
                        margin={{ ...margin }}
                        handleSize={5}
                        resizeTriggerAreas={["left", "right"]}
                        brushDirection="horizontal"
                        initialBrushPosition={initialBrushPosition}
                        onChange={onBrushChange}
                        onClick={() => setFilteredData(data)}
                        selectedBoxStyle={selectedBrushStyle}
                    />
                </AreaChart>
            </svg>
        </div>
    )

}


export default SecondaryChart
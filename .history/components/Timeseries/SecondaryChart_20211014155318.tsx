import React, { useEffect, useMemo, useRef } from 'react'

import {
    SecondaryChartProps,
    ClickDate,
    ClickScore,
    Datum
} from './interfaces'

import { useUpdateAtom } from 'jotai/utils'

import { Brush } from '@visx/brush'
import { min, max, extent } from 'd3-array'
import { PatternLines } from '@visx/pattern'
import { Bounds } from '@visx/brush/lib/types'
import BaseBrush from '@visx/brush/lib/BaseBrush'
import { scaleLinear, scaleTime } from '@visx/scale'

import AreaChart from './AreaChart' 
import { XAxisLabel } from './Annotation'
import { recalcDataAtom } from '../../atoms/timeseries'
import { useFormattedDateRange } from '../../hooks/useDates'
import { useGloballyConsistentColors } from '../../hooks/useColors'

const PATTERN_ID = 'brush_pattern'
const background = '#04002b'

const DEFAULT_MARGIN = { 
    top: 0, 
    right: 20, 
    bottom: 0, 
    left: 0 
};

const selectedBrushStyle = { 
    fill: `url(#${PATTERN_ID})`, 
    stroke: background 
};

const getTimestampAtStartOfYear = () => {
    return new Date(new Date().getFullYear(), 1, 1).getTime()
}

const SecondaryChart: React.FC<SecondaryChartProps> = ({
    data,
    minTimestamp,
    width=10,
    height,
    margin=DEFAULT_MARGIN,
}) => { 

    let { start, end }:{ start: number; end: number; } = { 
        start: minTimestamp || getTimestampAtStartOfYear(), 
        end: new Date().getTime() 
    };

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right

    let getDate = (d: Datum): ClickDate => d.clickdate
    let getClickScore = (d: Datum): ClickScore => d.clickscore

    const brushRef = useRef<BaseBrush | null>(null); 

    const dateScale =  useMemo(() => {
        return scaleTime({
            range: [0, xMax],
            domain: extent(data, getDate) as [Date, Date]
        })
    }, [xMax, data])

    const clickScale = useMemo(() => {
        return scaleLinear({
            range: [yMax + margin.top, margin.top],
            domain: [min(data, getClickScore) || 0, max(data, getClickScore) || 0],
            nice: true,
        })
    }, [margin.top, yMax, data])


    const updateFilteredData = useUpdateAtom(recalcDataAtom)

    const initialBrushPosition = useMemo(() => ({
        start: { x: dateScale(getDate(data[0])) },
        end: { x: dateScale(getDate(data[data.length - 1])) },
    }), [dateScale, data])

    useEffect(() => {
        updateFilteredData([...data])
    }, [data, updateFilteredData])

    const onBrushChange = (domain: Bounds | null) => {
        if (!domain) return;
        const { x0, x1, y0, y1 } = domain;
     
        const filteredData = data.filter((s) => {
            const x = getDate(s).getTime()
            const y = getClickScore(s)
            return x > x0 && x < x1 && y > y0 && y < y1
        })
        updateFilteredData(filteredData);
    };

    const colors = useGloballyConsistentColors()
    const dates = useFormattedDateRange(start, end)

    if(width < 10) return null

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
                    onClick={() => updateFilteredData(data)}
                    selectedBoxStyle={selectedBrushStyle}
                />
                </AreaChart>
            </svg>
        </div>
    )
}


export default SecondaryChart
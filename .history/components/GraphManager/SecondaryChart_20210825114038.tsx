import React, { useMemo, useRef, useContext } from 'react'

import {
    Datum,
    SecondaryChartProps,
    ClickDate,
    ClickScore,
    Datum
} from './interfaces'

import { extent, min, max } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'

import { Brush } from "@visx/brush"
import BaseBrush from "@visx/brush/lib/BaseBrush"
import { Bounds } from "@visx/brush/lib/types"

// import FilterContext from '../../'

const DEFAULT_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 },

const SecondaryChart: React.FC<SecondaryChartProps> = ({
    data,
    width=10,
    height,
    margin=DEFAULT_MARGIN,
}) => {
    const yMax = height - margin.top - margin.bottom
const xMax = width - margin.left - margin.right

    const filteredDataState: { setFilteredData } = useContext(FilterContext);
    const brushRef = useRef<BrushRef | null>(null); 

    
    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    const getFormatValue = (d: Datum): string => {
        return `${d.clickscore}`;
    }
    const bisectDate = bisector<Datum, Date>((d: Datum) => new Date(d.clickdate)).left

    const dateScale = useMemo(() => {
        return scaleTime({
          range: [0, xMax],
          domain: extent(data, getDate) as [Date, Date]
        });
      }, [xMax, data]);

    const clickScale = useMemo(() => {
    return scaleLinear({
        range: [yMax + margin.top, margin.top],
        domain: [min(data, getClickScore) || 0, max(data, getClickScore) || 0],
        nice: true,
    });
    }, [margin.top, yMax, data]);

    const initialBrushPosition = React.useMemo(() => ({
        start: { x: dateScale(getDate(data[0])) },
        end: { x: dateScale(getDate(data[data.length - 1])) },
    }), [dateScale, data]);
}
import React, { 
    useMemo, 
    useRef, 
    useContext,
    useEffect
} from 'react'

import {
    SecondaryChartProps,
    ClickDate,
    ClickScore,
    Datum
} from './interfaces'

import { extent, min, max } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'
import { PatternLines } from '@visx/pattern';
import { Brush } from "@visx/brush"
import { Bounds } from "@visx/brush/lib/types"
import BaseBrush from "@visx/brush/lib/BaseBrush"

import { MarketContext } from '../../store/MarketProvider' 
import AreaChart from './AreaChart' 

const DEFAULT_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };
export const background = '#04002b';
const PATTERN_ID = 'brush_pattern';
const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: background,
};

export const accentColor = 'rgba(50,250,150,1.0)';

const SecondaryChart: React.FC<SecondaryChartProps> = ({
    data,
    details,
    loading, 
    error,
    width=10,
    height,
    margin=DEFAULT_MARGIN,
}) => {

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right

    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0

    const { filteredDataState: { setFilteredData } } = useContext(MarketContext);
    const brushRef = useRef<BaseBrush | null>(null); 

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
    
    useEffect(() => {
        if (data.length) setFilteredData([...data]);
    }, [data, setFilteredData]);
    
    const onBrushChange = (domain: Bounds | null) => {
        if (!domain) return;
        const { x0, x1, y0, y1 } = domain;
     
        const filteredData = data.filter((s) => {
            const x = getDate(s).getTime();
            const y = getClickScore(s);
            return x > x0 && x < x1 && y > y0 && y < y1;
        });
        setFilteredData(filteredData);
    };

    return (
        <div style={{ position: "relative" }}>
            <svg width={width} height={height}>

                <AreaChart
                     hideLeftAxis
                     hideGrid
                     data={data}
                     loading={loading}
                     error={error}
                     width={width}
                     margin={{ ...margin }}
                     yMax={yMax}
                     xScale={dateScale}
                     yScale={clickScale}
                     gradientColor={'rgba(50,250,150,1.0)'}
                >
                    <PatternLines
                        id={PATTERN_ID}
                        height={7}
                        width={8}
                        stroke={accentColor}
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
                        onClick={() => setFilteredData(data)}
                        selectedBoxStyle={selectedBrushStyle}
                    />
                </AreaChart>
            </svg>
        </div>
    )

}


export default SecondaryChart
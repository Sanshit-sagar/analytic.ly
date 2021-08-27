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

import { Text } from '../../primitives/Text'

import { extent, min, max } from 'd3-array'
import { scaleLinear, scaleTime } from '@visx/scale'
import { LinearGradient } from '@visx/gradient'
import { Brush } from "@visx/brush"
import BaseBrush from "@visx/brush/lib/BaseBrush"
import { Bounds } from "@visx/brush/lib/types"

import { MarketContext } from '../../store/MarketProvider' 
import AreaChart from './AreaChart' 

const DEFAULT_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };

const SecondaryChart: React.FC<SecondaryChartProps> = ({
    data,
    width=10,
    height,
    margin=DEFAULT_MARGIN,
}) => {

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right

    const getDate = (d: Datum): ClickDate => d.clickdate 
    const getClickScore = (d: Datum): ClickScore => d?.clickscore || 0
    // const getFormatValue = (d: Datum): string => `${d.clickscore}`;

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
        if (data.length) setFilteredData(data);
    }, [data, setFilteredData]);
    
    const onBrushChange = (domain: Bounds | null) => {
        if (!domain) return;
        const { x0, x1, y0, y1 } = domain;
        alert(`${x0} | x1: ${x1} | x2: ${x2} | `)
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
                     data={data}
                     width={width}
                     margin={{ ...margin }}
                     yMax={yMax}
                     xScale={dateScale}
                     yScale={clickScale}
                     gradientColor={'green'}
                >
                    <LinearGradient
                         id="brush-gradient"
                         from={'rgba(50,255,150,0.8)'}
                         fromOpacity={0.3}
                         to={'rgba(255,255,255,0.8)'}
                         toOpacity={0.3}
                    />
                    <Brush
                         innerRef={brushRef}
                         xScale={dateScale}
                         yScale={clickScale}
                         width={xMax}
                         height={yMax}
                         margin={{ ...margin }}
                         handleSize={8}
                         resizeTriggerAreas={["left", "right"]}
                         brushDirection="horizontal"
                         initialBrushPosition={initialBrushPosition}
                         onChange={onBrushChange}
                         onClick={() => {
                           setFilteredData(data);
                         }}
                         selectedBoxStyle={{
                           fill: `url(#brush-gradient)`,
                           stroke: 'rgba(50,255,150,1.0)'
                         }}
                    />
                </AreaChart>
                <Text> {JSON.stringify(data)} </Text>
            </svg>
        </div>
    )

}


export default SecondaryChart
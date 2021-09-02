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
    Datum,
    GraphDetails
} from './interfaces'

import { scaleLinear, scaleTime } from '@visx/scale'
import { min, max } from 'd3-array'
import { PatternLines } from '@visx/pattern';
import { Bounds } from "@visx/brush/lib/types"
import { Brush } from "@visx/brush"

import { MarketContext } from '../../store/MarketProvider' 
import { Text } from '../../primitives/Text'
import { XAxisLabel } from './Annotation'

import BaseBrush from "@visx/brush/lib/BaseBrush"
import AreaChart from './AreaChart' 



const DEFAULT_MARGIN = { top: 0, right: 0, bottom: 0, left: 0 };
export const background = '#04002b';
const PATTERN_ID = 'brush_pattern';
const selectedBrushStyle = { fill: `url(#${PATTERN_ID})`, stroke: background };

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
    let { start, end }: GraphDetails = details;
    if(!end || end===undefined) {
        end = new Date();
    }

    if(loading) return <Text> Loading </Text>
    if(error) return <Text> Error! </Text>

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right

    let getDate = (d: Datum): ClickDate => !loading && !error ? d?.clickdate : new Date()
    let getClickScore = (d: Datum): ClickScore => !loading && !error ? d?.clickscore : 0

    const { filteredDataState: { setFilteredData, setBounds, setLastUpdatedAt } } = useContext(MarketContext);
    const brushRef = useRef<BaseBrush | null>(null); 

    const dateScale = useMemo(() => {
        return scaleTime({
            range: [0, xMax],
            domain: [new Date(start), new Date(end)],
            // domain: extent(data, getDate) as [Date, Date]
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
        if (data.length) {
            setFilteredData([...data]);
            setBounds({ 
                x0: getDate(data[0]).getTime(), 
                y0: getClickScore(data[0]), 
                x1: getDate(data[data.length-1]).getTime(), 
                y1: getClickScore(data[data.length-1]),
            });
            setLastUpdatedAt(new Date().getTime());
        }
    }, [data, setFilteredData]);
    
    const onBrushChange = (domain: Bounds | null) => {
        if (!domain) return;
        const { x0, x1, y0, y1 } = domain;
     
        const filteredData = data.filter((s) => {
            const x = getDate(s).getTime();
            const y = getClickScore(s);
            return x > x0 && x < x1 && y > y0 && y < y1;
        });
        setBounds({...domain});
        setFilteredData(filteredData);
    };

    return (
        <div style={{ position: "relative" }}>
            <svg width={width} height={height}>
            <XAxisLabel 
                 height={height} 
                 width={width} 
                 start={new Date(details.start).toLocaleDateString()}
                 end={new Date(details.end).toLocaleDateString()}
            />          
                <AreaChart
                     hideLeftAxis
                     hideGrid
                     data={data}
                     loading={loading}
                     error={error}
                     width={width}
                     margin={{...margin}}
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
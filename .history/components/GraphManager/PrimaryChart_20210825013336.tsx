import React, { useMemo } from 'react'
import { scaleLinear, scaleTime } from '@visx/scale'
import { extent, min, max } from '@d3-array'
import { 
    Datum, 
    PrimaryChartProps, 
    ClickDate, 
    ClickScore 
} from './interfaces'

const getDate = (d: Datum): ClickDate => d.clickdate;
const getClickScore = (d: Datum): ClickScore => d.clickscore; 

const PrimaryChart: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    data,
    margin={ top: 0, left: 0, bottom: 0, right: 0 },
}) => {
    if(width < 10) return null;

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
                    yTickFormat={(d: Datum) =>  `${d.clickscore} views`
                />
            </svg>
        </div>
    );
}


export default PrimaryChart
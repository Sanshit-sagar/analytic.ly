import React from 'react'
import { Datum, PrimaryChartProps } from './interfaces'

const PrimaryChart: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    data,
    margin={ top: 0, left: 0, bottom: 0, right: 0 },
}) => {

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right 

    const dateScale = useMemo(() => {
        return scaleTime({
            range: [0, xMax],
            domain: extent(data, getDate) as [Date, Date],
        });
    }), [xMax, data]);

    
    
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
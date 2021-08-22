import React, { useRef } from 'react'
import { scaleLinear, scaleBand } from '@visx/scale'
import { LinearGradient } from '@visx/gradient'
import { Group } from '@visx/group'
import { AxisLeft, AxisBottom } from '@visx/axis'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import Bar from './Bar'
import Loading from '../Loading'

import { Box } from '../../primitives/Box'
import { useUniques } from '../../hooks/useClicks'

const DEFAULT_MARGIN  = {
    top: 25, bottom: 25, left: 25, right: 25
};

// interface Datum {
//     title: string;
//     freq: number;
//     rank: number;
//     normal: number; 
// }


const CustomChart = ({ 
    height, 
    width,
    colorMultiplier,
    margin={DEFAULT_MARGIN}
}) => {
    const wrapRef = useRef(null);
    // const { width, height } = useDims(wrapRef);

    const { uniques, loading, error } = useUniques(); 

    const slug = (d) => d.title; 
    const freq = (d) => d.score;
    const rank = (d) => d.rank; 
    const normal = (d) => d.normalizedFreq; 
    const xMax = width;
    const yMax = height;

    if(!uniques) return <p> No data to show! </p> 

    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: uniques.map(slug),
        padding: 0.2
    });
    const yScale = scaleLinear({
        rangeRound: [0, yMax],
        domain: [Math.max(...uniques.map(freq)), 0]

    });

    if(error) return <p> error! </p>
    if(width < 10) return null;
    

    return (
    <div 
        style={{ width: "100%", height: "100%" }} 
        ref={wrapRef}
    >
        <svg 
            width={width}
            height={height}
        >
        <LinearGradient
            from={`#fff`}
            to={`#eee`}
            id={`gradient${colorMultiplier}`}
        />
        <rect
            width={width}
            height={height}
            fill={`url(#gradient${colorMultiplier})`}
            rx={5}
        />
        {loading || !uniques?.length ? <Loading /> : (
            <Group 
                top={25} 
                left={25}
            >
                <AxisLeft 
                    left={10} 
                    scale={yScale} 
                    numTicks={4} 
                    label="Times" 
                />
                {uniques.map((d, i) => {
                    const label = `${slug(d)}-Rank:${rank(d)}--Normal:${normal(d)}`; 
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - yScale(freq(d));
                    const barX = xScale(label);
                    const barY = yMax - barHeight;
                    return (
                        <Bar
                            key={`bar-${label}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                        />
                    );
                })}
                <AxisBottom
                    scale={xScale}
                    label="Slugs"
                    labelOffset={15}
                    top={yMax}
                />
            </Group>
        )}
        </svg>
    </div>

    );
}

const UniqueBars = () => {

    return (
        <Box css={{ height: '500px', width: '500px' }}>
            <ParentSize>
                {({ width, height }) => (
                    <CustomChart 
                        height={height}
                        width={width}
                        colorMultiplier={1}
                    /> 
                )}
            </ParentSize>
        </Box>
    )
}

export default UniqueBars
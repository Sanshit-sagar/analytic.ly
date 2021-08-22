import React, { useState, useEffect, useMemo, useRef } from 'react'

import Loading from '../Loading'
import { Text } from '../../primitives/Text'

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
    margin={DEFAULT_MARGIN}
}) => {
    const wrapRef = useRef(null);
    const { width, height } = useDims(wrapRef);


    const { uniques, loading, error } = useUniques(); 

    
    const slug = (d) => d.title; 
    const freq = (d) => d.score;
    const rank = (d) => d.rank; 
    const normal = (d) => d.normalizedFreq; 
    const xMax = width - 80;
    const yMax = height - 80;

    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: uniques.map(slug),
        padding: 0.2
    });
    const yScale = scaleLinear({
        rangeRound: [0, yMax],
        domain: [Math.max(...uniques.map(freq)), 0],

    });

    if(error) return <p> error! </p>
    if(width < 10) return null;

    return (
    <div style={{ width: "100%", height: "100%" }} ref={wrapRef}>
        <svg 
            width={width}
            height={height}
        >
        <LinearGradient
            from={`#222`}
            to={`#111`}
            id={`gradient${colorMultiplier}`}
        />
        <rect
            width={width}
            height={height}
            fill={`url(#gradient${colorMultiplier})`}
            rx={5}
        />
        {loading 
        ? <Loading /> (
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
                {data.map((d, i) => {
                    const label = x(d);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - yScale(y(d));
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
};


export default CustomChart
import React from 'react'
import { scaleLinear, scaleBand } from '@visx/scale'
import { Group } from '@visx/group'
import { AxisLeft, AxisBottom } from '@visx/axis'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import Loading from '../Loading'
import { Box } from '../../primitives/Box'
import { useUniques } from '../../hooks/useClicks'

const DEFAULT_MARGIN  = { top: 40, bottom: 0, left: 0, right: 0 };
const GRAY = "#9e9e9e";
const BACKGROUND = "rgb(46, 46, 46)";
const BLUE = "hsla(200,67%,50%,1)";

export type BarStackProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    events?: boolean;
    loading: boolean;
    uniques: any;
    firsts: any; 
};

interface Datum {
    title: string;
    freq: number;
    rank: number;
    normal: number; 
}

 
const CustomChart = ({  width, height, margin = DEFAULT_MARGIN, events }: BarStackProps) => {
   

    const slug = (d) => d.title; 
    const freq = (d) => d.score;
    const rank = (d) => d.rank; 
    const normal = (d) => d.normalizedFreq; 

    if(!uniques) return <p> No data to show! </p> 

    const maxFrequency = uniques.reduce(
        (subtotal, entry) => Math.max(subtotal, entry.score),
        0
    );

    const slugScale = scaleBand<string>({
        domain: uniques.map(slug),
        padding: 0.2
      });
    const frequencyScale = scaleLinear<number>({
        domain: [0, maxFrequency],
        nice: true
    });

 
    if(width < 10) return null;

    const xMax = width;
    const yMax = height - margin.top - 100;
    slugScale.rangeRound([0, xMax]);
    frequencyScale.range([yMax, 0]);

    return (
        <div 
            style={{ position: "relative" }}>
            ref={wrapRef}
        >
            <svg 
                width={width}
                height={height}
            >
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={background}
                rx={14}
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

    const { uniques, firsts, loading, error } = useUniques(); 

    if(error) return <p> error! </p>

    return (
        <Box css={{ height: '500px', width: '500px' }}>
            <ParentSize>
                {({ width, height }) => (
                    <CustomChart 
                        height={height}
                        width={width}
                        events={true}
                        loading={loading}
                        uniques={uniques}
                        firsts={firsts}
                    /> 
                )}
            </ParentSize>
        </Box>
    )
}

export default UniqueBars
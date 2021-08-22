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

interface MarginProps {
    top: number; 
    right: number; 
    bottom: number; 
    left: number;
}

export type BarStackProps = {
    width: number;
    height: number;
    margin?: MarginProps;
    events?: boolean;
    loading: boolean;
    uniques: any;
    firsts: any; 
};

interface Datum {
    title: string;
    score: number;
    rank: number;
    normalizedFreq: number; 
}

const CustomChart = ({  
    width = 300, 
    height = 300, 
    margin = DEFAULT_MARGIN, 
    events = false,
    loading,
    uniques,
    firsts
}: BarStackProps) => {

    const slug: (d: Datum) => string = (d: Datum) => d.title; 
    const freq: (d: Datum) => number = (d: Datum) => d.score;
    const rank: (d: Datum) => number = (d: Datum) => d.rank; 
    const normal: (d: Datum) => number = (d: Datum) => d.normalizedFreq; 

    if(!uniques) return <p> No data to show! </p> 

    const xMax = width;
    const yMax = height - margin.top - 100;

    const slugScale = scaleBand<string>({
        domain: uniques.map(slug),
        padding: 0.2,
    });
    slugScale.rangeRound([0, xMax]);
    
    const frequencyScale = scaleLinear<number>({
        domain: [0, 1],
        nice: true,
        range: [yMax, 0]
    });

    const formatSlug = (slug: string) => `/${slug}`
    
    if(width < 10) return null;

    return (
        <div style={{ position: "relative" }}>
            <svg ref={containerRef} width={width} height={height}>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={background}
                rx={14}
            />
            <Grid
                top={margin.top}
                left={margin.left}
                xScale={slugScale}
                yScale={frequencyScale}
                width={xMax}
                height={yMax}
                stroke={GRAY}
                strokeDasharray="1 1"
                strokeOpacity={0.1}
                xOffset={slugScale.bandwidth() / 2}
            />
            <Group top={margin.top}>
                {uniques.map((unique: Datum, _: number) => {
                    const barWidth = slugScale.bandwidth();
                    const barHeight = yMax - frequencyScale(unique.score);
                    const barX = slugScale(unique.title);
                    const barY = yMax - barHeight;
                    return (
                        <Bar
                            key={`bar-${unique.slug}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={BLUE}
                        />
                    );
                })}
            </Group>
            <AxisBottom
                top={yMax + margin.top}
                scale={slugScale}
                tickFormat={formatSlug}
                stroke={GRAY}
                tickStroke={GRAY}
                tickLabelProps={() => ({
                    fill: GRAY,
                    fontSize: 11,
                    textAnchor: "middle"
                })}
            />
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


{/* <AxisLeft 
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
/> */}
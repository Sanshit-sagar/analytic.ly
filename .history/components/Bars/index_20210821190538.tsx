import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Grid } from '@visx/grid'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleLinear, scaleBand } from '@visx/scale'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { localPoint } from '@visx/event'
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";

import Loading from '../Loading'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { VisxParentSizeWrapper } from '../../primitives/Shared'

import { useUniques } from '../../hooks/useClicks'
import { format } from '../../lib/utils/d3time'

const DEFAULT_MARGIN  = { top: 20, bottom: 50, left: 30, right: 50 };
const colors: string[] = ['#33ffaa', '#109CF1', '#a12' ]
const BLACK = 'rgba(50,50,50, 1.0)'
const WHITE = 'rgba(255,255,255,1.0)'
const GREEN = colors[0]
// const BLUE = colors[1]
// const RED = colors[2] 

const animationTrajectory = 'center'

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 175,
    backgroundColor: WHITE,
    color: BLACK
};

interface MarginProps {
    top: number; 
    right: number; 
    bottom: number; 
    left: number;
}

type BarStackProps = {
    width: number;
    height: number;
    margin?: MarginProps;
    uniques: any;
    darkMode: boolean; 
    firsts: any; 
};

type TooltipData = {
    slug: string;
    rank: number;
    frequency: number;
    normal: number;
};

interface Datum {
    title: string;
    score: number;
    rank: number;
    normalizedFreq: number; 
}


let tooltipTimeout: number;

const CustomChart = ({  
    width = 300, 
    height = 300, 
    margin = DEFAULT_MARGIN, 
    uniques,
    darkMode,
    firsts
}: BarStackProps) => {
    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    } = useTooltip<TooltipData>();
    
    if(width < 10) return null;

    const xMax = width;
    const yMax = height - margin.top - margin.bottom
    const BACKGROUND = darkMode ? 'rgba(255,255,255,1.0)' : 'rgba(50,50,50,1.0)'

    const { containerRef, TooltipInPortal } = useTooltipInPortal({ scroll: true });

    const slug: (d: Datum) => string = (d: Datum) => d.title; 
    const freq: (d: Datum) => number = (d: Datum) => d.score;
    const rank: (d: Datum) => number = (d: Datum) => d.rank; 
    const normal: (d: Datum) => number = (d: Datum) => d.normalizedFreq;

    const maxFreq = uniques[0].score
    const formatSlug = (slug: string, _: number) => `${slug.split('-')[0].substring(0,8)}`
    const formatFrequency = (frequency: number) => Math.round(frequency * maxFreq)

    // const firstSeens = [...Object.entries(firsts)]
    // const numUnique = firstSeens.length
   

    const slugScale = scaleBand<string>({
        domain: uniques.map(slug),
        padding: 0.2,
    });
    slugScale.rangeRound([0, xMax]);
    
    const frequencyScale = scaleLinear<number>({
        domain: [0, 1],
        range: [yMax, 0],
        nice: true
    });
    

    return (
        <div style={{ position: "relative" }}>
            <svg ref={containerRef} width={width} height={height}>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={BACKGROUND}
                rx={5}
            />
            <Grid
                top={0}
                left={0}
                xScale={slugScale}
                yScale={frequencyScale}
                width={xMax}
                height={yMax}
                stroke={WHITE}
                strokeDasharray="5 5"
                strokeOpacity={0.1}
            />
            <Group top={margin.top}>
                {uniques.map((unique: Datum, _: number) => {
                    const barWidth: number = slugScale.bandwidth()/2;
                    const barHeight: number = yMax - frequencyScale(unique.normalizedFreq);
                    const barX: number = slugScale(unique.title) || 0;
                    const barY: number = yMax - barHeight;
                    
                    return (
                        <Bar
                            key={`bar-${unique.title}`}
                            x={barX + margin.left/2}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={GREEN}
                            fillOpacity={0.4}
                            onMouseMove={(event) => {
                                if(tooltipTimeout) clearTimeout(tooltipTimeout); 
                                const coords = localPoint(event);
                                if(!coords) return; 
                    
                                const top: number = coords?.y || 0
                                const left: number = (barX || 0) + barWidth / 2
                                showTooltip({
                                  tooltipData: {
                                    slug: unique.title,
                                    frequency: freq(unique),
                                    rank: rank(unique),
                                    normal: normal(unique) 
                                  },
                                  tooltipTop: top,
                                  tooltipLeft: left
                                });
                            }}
                            onMouseLeave={() => {
                                tooltipTimeout = window.setTimeout(() => {
                                hideTooltip();
                                }, 300);
                            }}
                        />
                    );
                })}
            </Group>
            <AxisBottom
                top={yMax + margin.top}
                scale={slugScale}
                tickFormat={formatSlug}
                stroke={WHITE}
                tickStroke={WHITE}
                label={'Slugs'}
                tickLabelProps={() => ({
                    fill: WHITE,
                    fontSize: 10,
                    fontStyle: "light",
                    textAnchor: 'middle',
                    lineHeight: 10,
                    textTransform: "lowercase",
                    opacity: 0.5
                })}
            />
            <AxisLeft
                left={margin.left / 2}
                scale={frequencyScale}
                tickFormat={formatFrequency}
                stroke={WHITE}
                tickStroke={WHITE}
                label={'Freqs'}
                hideAxisLine 
                hideTicks
                tickLabelProps={() => ({
                    fontSize: 12,
                    fontStyle: "light",
                    fontWeight: 200,
                    lineHeight: 19,
                    textTransform: "uppercase",
                    fill: WHITE
                })}
                animationTrajectory={animationTrajectory}
            />
            </svg>

            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                > 
                    <Box css={{ minWidth: '175px', maxWidth: '225px', bc: 'white', br: '$1', padding: '$1' }}>
                        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
                            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$2' }}>
                                <Text size='1'> 
                                    {tooltipData.slug.substring(0,15)}{tooltipData.slug.length > 15 ? '..' : ''} 
                                </Text>
                                <Text size='1'> 
                                    Unique Visits: {tooltipData.frequency} 
                                </Text> 
                            </Flex>
                            <Text size='1'> 
                                First View: {format(firsts[tooltipData.slug], 'hourdaymin')} 
                            </Text>
                        </Flex>
                    </Box>
                </TooltipInPortal>
            )}
        </div>
    );
}

const UniqueBars = ({ darkMode }: { darkMode: boolean }) => {

    const { uniques, firsts, loading, error } = useUniques(); 

    if(loading) return <Loading /> 
    if(!uniques) return <p> No data to show! </p> 
    if(error) return <p> error! </p>

    let topUniques: any[] = uniques?.length ? uniques.slice(0,8) : []
    return (
        <VisxParentSizeWrapper>
            <ParentSize>
                {({ width, height }) => (
                    <CustomChart 
                        height={height}
                        width={width}
                        uniques={topUniques}
                        darkMode={darkMode}
                        firsts={firsts}
                    /> 
                )}
            </ParentSize>
        </VisxParentSizeWrapper>
    )
}

export default UniqueBars

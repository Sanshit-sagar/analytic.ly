import React from 'react'
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

const DEFAULT_MARGIN  = { top: 20, bottom: 0, left: 50, right: 50 };

const BACKGROUND = "rgb(46, 46, 46)"
const BLACK = 'rgba(50,50,50, 1.0)'
const WHITE = 'rgba(255,255,255,1.0)'
const BLUE = "hsla(200,67%,50%,1)"
const YELLOW = 'rgba(255,255,0,1.0)'
const GREEN = 'rgba(0, 255, 0, 1.0)'
const GRAY = "#9e9e9e"

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
    loading: boolean;
    uniques: any;
    firsts: any; 
};
type Accessor = (d: Datum) => string | number;

interface Accessors {
    'slug': Accessor;
    'freq': Accessor;
    'rank': Accessor;
    'normal': Accessor; 
}

type DataKey = keyof Accessors;

type TooltipData = {
    unique: Datum;
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
    loading,
    uniques,
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
    
    const { containerRef, TooltipInPortal } = useTooltipInPortal({ scroll: true });
    
    if(width < 10) return null;
    if(loading) return <Loading /> 
    if(!uniques) return <p> No data to show! </p> 

    const slug: (d: Datum) => string = (d: Datum) => d.title; 
    const freq: (d: Datum) => number = (d: Datum) => d.score;
    const rank: (d: Datum) => number = (d: Datum) => d.rank; 
    const normal: (d: Datum) => number = (d: Datum) => d.normalizedFreq;
    
    const xMax = width;
    const yMax = height - margin.top - 80

    const firstSeens = [...Object.entries(firsts)]
    const numUnique = firstSeens.length
    const maxFreq = uniques[0].score

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
    const tooltipStyles = {
        ...defaultStyles,
        minWidth: 175,
        backgroundColor: "rgba(255,255,255,1.0)",
        color: BLACK
      };

    const animationTrajectory = 'center'
    const formatSlug = (slug: string, _: number) => `${slug.split('-')[0].substring(0,8)}`
    const formatFrequency = (frequency: number) => Math.round(frequency * maxFreq)

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
                top={margin.top}
                left={margin.left}
                xScale={slugScale}
                yScale={frequencyScale}
                width={xMax}
                height={yMax}
                stroke={GRAY}
                strokeDasharray="1 1"
                strokeOpacity={0.7}
                columns={true}
                rows={true}
                xOffset={slugScale.bandwidth() / 2}
            />
            <Group top={margin.top}>
                {uniques.map((unique: Datum, _: number) => {
                    const barWidth = slugScale.bandwidth();
                    const barHeight = yMax - frequencyScale(unique.normalizedFreq);
                    const barX = slugScale(unique.title);
                    const barY = yMax - barHeight;
                    
                    return (
                        <Bar
                            key={`bar-${unique.title}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={BLUE}
                            fillOpacity={0.4}
                            onMouseMove={(event) => {
                                const coords = localPoint(event);
                                showTooltip({
                                  tooltipData: { unique },
                                  tooltipTop: coords?.y || 0,
                                  tooltipLeft: (barX || 0) + barWidth / 2
                                });
                            }}
                            onMouseLeave={(event) => {
                                setTimeout(() => {
                                    tooltipTimeout=1500
                                })
                            }}
                        />
                    );
                })}
            </Group>
            <AxisBottom
                top={yMax + margin.top}
                scale={slugScale}
                tickFormat={formatSlug}
                stroke={YELLOW}
                tickStroke={GREEN}
                label={'Slugs'}
                tickLabelProps={() => ({
                    fill: WHITE,
                    fontSize: 16,
                    textAnchor: "middle",
                    lineHeight: 20,
                    textTransform: "lowercase"
                })}
                animationTrajectory={animationTrajectory}
            />
            <AxisLeft
                left={xMax - margin.left}
                scale={frequencyScale}
                tickFormat={formatFrequency}
                stroke={YELLOW}
                tickStroke={GREEN}
                label={'Freqs'}
                hideAxisLine
                hideZero
                hideTicks
                tickLabelProps={() => ({
                    fontSize: 16,
                    fontStyle: "normal",
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
                                <Text size='1'> {slug(tooltipData.unique).substring(0,15)}{slug(tooltipData.unique).length > 15 ? '..' : ''} </Text>
                                <Text size='1'> Unique Visits: {tooltipData.unique.score} </Text> 
                            </Flex>
                            <Text size='1'> First View: {format(firsts[slug(tooltipData.unique)], 'hourdaymin')} </Text>
                        </Flex>
                    </Box>
                </TooltipInPortal>
            )}
        </div>
    );
}

const UniqueBars = () => {

    const { uniques, firsts, loading, error } = useUniques(); 

    if(error) return <p> error! </p>

    return (
        <VisxParentSizeWrapper>
            <ParentSize>
                {({ width, height }) => (
                    <CustomChart 
                        height={height}
                        width={width}
                        loading={loading}
                        uniques={uniques?.length ? uniques.slice(0,10) : []}
                        firsts={firsts}
                    /> 
                )}
            </ParentSize>
        </VisxParentSizeWrapper>
    )
}

export default UniqueBars

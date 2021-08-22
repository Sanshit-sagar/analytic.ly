import React, { useRef, useMemo, useCallback } from 'react'
import { Bar } from '@visx/shape'
import { Grid } from '@visx/grid'
import { Group } from '@visx/group'
import { AxisBottom } from '@visx/axis'
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

const DEFAULT_MARGIN  = { top: 20, bottom: 0, left: 0, right: 0 };

const BACKGROUND = "rgb(46, 46, 46)";
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
        minWidth: 60,
        backgroundColor: "rgba(0,0,0,0.9)",
        color: "white"
      };

    const formatSlug = (slug: string, _: number) => `${slug.split('-')[0].substring(0,8)}`
    

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
                strokeOpacity={0.1}
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
                tickLabelProps={() => ({
                    fill: WHITE,
                    fontSize: 15,
                    textAnchor: "middle"
                })}
                label={'Slugs'}
            />
            </svg>

            {tooltipOpen && tooltipData && (
                <TooltipInPortal
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                > 
                    <Box css={{ bc: BLUE }}>
                        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'center', gap: '$1' }}>
                            <Text size='2'> Unique Visits </Text>
                            <Text size='1'>{tooltipData.unique.score}</Text>
                            <Text size='1'> {formatSlug(slug(tooltipData.unique), 0)} </Text>
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

import React from 'react'

import { Bar } from '@visx/shape'
import { Grid } from '@visx/grid'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleLinear, scaleBand } from '@visx/scale'
import { localPoint } from '@visx/event'

import Loading from '../Loading'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { VisxParentSizeWrapper, TooltipWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { 
    useTooltip, 
    useTooltipInPortal, 
    defaultStyles 
} from "@visx/tooltip"

import { useUserRankings } from '../../hooks/useClicks'
import { useGloballyConsistentColors } from '../../hooks/useColors'

const DEFAULT_MARGIN  = { top: 20, bottom: 50, left: 30, right: 50 }

const animationTrajectory = 'center'
const TRANSPARENT =  'transparent'

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 175,
    backgroundColor: '$canvas',
    zIndex: 4 
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
    freqs: any[];
    uniques: any[];
};

type TooltipData = {
    slug: string;
    rank: number;
    frequency: number;
    uniques?: string;
    normal: number;
    category?: string; 
    visitorIps?: string[]; 
};

interface Datum {
    title: string;
    score: number;
    rank: number;
    normalizedFreq: number; 
}

let tooltipTimeout: number;

const BarChart = ({  
    width = 300, 
    height = 300, 
    margin = DEFAULT_MARGIN, 
    freqs,
    uniques,
}: BarStackProps) => {
    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    } = useTooltip<TooltipData>();
    
   

    const colors = useGloballyConsistentColors()
    const { containerRef, TooltipInPortal } = useTooltipInPortal({ scroll: true });
    
    if(width < 10) return null;

    let uniquesArr = Object.entries(uniques)
    const xMax = width;
    const yMax = height - margin.top - margin.bottom
    const maxFreq = freqs[0].score
    const maxUnique = uniquesArr[uniquesArr.length - 1][1].max

    const barType = (i: number) => i%2===0 ? 'Frequency' : 'Unique'
    const slug: (d: Datum) => string = (d: Datum) => d.title
    const freq: (d: Datum) => number = (d: Datum) => d.score
    const rank: (d: Datum) => number = (d: Datum) => d.rank
    const normal: (d: Datum) => number = (d: Datum) => d.normalizedFreq
    const unique = (d: Datum) => uniques[slug(d)].rankings.length
    const uniqueNormal = (d: Datum) => `${Math.round((unique(d)/Math.max(maxFreq, maxUnique))*100)}%`;
    const uniqueRank = (i: number) => (i-1)/2 + 1

    const slugScale = scaleBand<string>({
        domain: freqs.map(slug),
        padding: 0.2,
    });
    slugScale.rangeRound([0, xMax]);
    
    const frequencyScale = scaleLinear<number>({
        domain: [0, 1],
        range: [yMax, 0],
        nice: true
    });

    const uniquesScale = scaleLinear<number>({
        domain: [0, 1],
        range: [yMax, 0],
        nice: true
    });
    
    
    const formatSlug = (slug: string, _: number) => `${slug.split('-')[0].substring(0,8)}`
    // const formatFrequency = (frequency: number) => Math.round(frequency * maxFreq)

    let freqsBg: typeof freqs = []
    freqs.map((f) => {
        freqsBg.push(f);
        freqsBg.push(f); 
    }); 

    function formatTooltipProps(d: any, i: number) {
        const isFreq: boolean = barType(i)==='Frequency';
        const viewCount: string = isFreq ? `${freq(d)} Clicks` : `${unique(d)} Uniques`
        const slugName: string = slug(d).substring(0,20)
        // const normalizedScore: string = isFreq ? `${Math.round(normal(d)*100)}%` : uniqueNormal(d)
        const slugRank: number = isFreq ? rank(d) : uniqueRank(i)

        let tooltipData = {
            slug: slugName,
            rank = slugRank,
            slugAndViews = viewCount,
        };
        return tooltipData; 
    }
    

    return (
        <Box css={{ mr: '$3', width: '95%' }}>
            <svg 
                ref={containerRef} 
                width={width} 
                height={height}
            >
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={TRANSPARENT}
                rx={5}
            />
            <Grid
                top={0}
                left={0}
                xScale={slugScale}
                yScale={frequencyScale}
                width={width}
                height={height}
                stroke={colors.funky}
                strokeDasharray="5 5"
                strokeOpacity={0.25}
            />
            <Group 
                top={margin.top} 
                left={margin.left}
            >
                {freqsBg.map((d: Datum, i: number) => {
                    const gap: number = 2.5;
                    const barWidth: number = 20;
                    const freqBarHeight: number = yMax - frequencyScale(d.normalizedFreq);
                    const uniqBarHeight: number = yMax - uniquesScale(unique(d)/maxFreq); 
                    const freqBarX: number = slugScale(d.title) || 0;
                    const uniqBarX: number = freqBarX + barWidth + gap
                    const freqBarY: number = yMax - freqBarHeight;
                    const uniqBarY: number = yMax - uniqBarHeight;

                    const barHeight = i%2===0 ? freqBarHeight : uniqBarHeight
                    const barX = i%2===0 ? freqBarX : uniqBarX
                    const barY = i%2===0 ? freqBarY : uniqBarY
                    const fill = i%2===0 ? colors.funky : colors.accent
                    
                    return (
                        <Bar
                            key={`freq-bar-${d.title}`}
                            x={barX - margin.left/2}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={fill}
                            fillOpacity={0.7}
                            onMouseMove={(event) => {
                                if(tooltipTimeout) clearTimeout(tooltipTimeout); 
                                const coords = localPoint(event);
                                if(!coords) return; 
                    
                                const top: number = coords?.y || 0
                                const left: number = barX + barWidth / 2
                                showTooltip({
                                    tooltipTop: top,
                                    tooltipLeft: left,
                                    tooltipData: formatTooltipProps(d,i)
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
                stroke='transparent'
                label={'Slugs'}
                hideTicks
                tickLabelProps={() => ({
                    fill: colors.text,
                    fontSize: 12,
                    fontStyle: "light",
                    textAnchor: 'middle',
                    lineHeight: 10,
                    textTransform: "lowercase",
                    opacity: 1.0
                })}
            />
            <AxisLeft
                left={margin.left / 2}
                scale={frequencyScale}
                tickFormat={(value: number) => Math.round(value * maxFreq).valueOf()}
                stroke={colors.text}
                tickStroke={colors.text}
                label={'Freqs'}
                hideAxisLine 
                hideTicks
                tickLabelProps={() => ({
                    fontSize: 12,
                    fontStyle: "light",
                    fontWeight: 200,
                    lineHeight: 19,
                    textTransform: "uppercase",
                    fill: colors.text
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
                    <TooltipWrapper>
                        {Object.entries(tooltipData).map((d: [string, string | number | string[]], i: number) => {
                            return (
                             <Flex key={i} css={{ width: '100%', fd: 'row', jc: 'flex-end', ai: 'flex-start' }}> 
                                 {i===0 ?

                                    <Text 
                                        css={{ 
                                         color: colors.funky, textDecoration: 'underline', 
                                         textDecorationColor: '$funky', fontWeight: '400', mb: '$1' 
                                        }}
                                    >  
                                        {d[1]} 
                                    </Text> 
                                :   <Text css={{ color: colors.text }}> 
                                        {d[1]} 
                                    </Text>
                                }
                             </Flex>
                            );
                        })}
                    </TooltipWrapper>
                </TooltipInPortal>
            )}
        </Box>
    );
}

const GroupedBars = () => {
    const { views, vloading, vError } = useUserRankings('freqs'); 
    const { uniques, uloading, uError } = useUserRankings('uniques')

    if(uloading || vloading) return <Loading />  
    if(uError || vError) return <p> error! </p>
    if(!views && !uniques) return <p> No data to show! </p>

    let freqs: Datum[] = views.frequency?.length ? views.frequency.sort((a: Datum,b: Datum)=>b.score-a.score).slice(0,8) : []

   
    return (
        <VisxParentSizeWrapper>
            <ParentSize>
                {({ width, height }) => (
                    <BarChart 
                        height={height}
                        width={width}
                        freqs={freqs}
                        uniques={uniques}
                    /> 
                )}
            </ParentSize>
        </VisxParentSizeWrapper>
    )
}

export default GroupedBars

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
import { VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { 
    useTooltip, 
    useTooltipInPortal, 
    defaultStyles 
} from "@visx/tooltip"

import { useUserRankings } from '../../hooks/useClicks'

const DEFAULT_MARGIN  = { top: 20, bottom: 50, left: 30, right: 50 };
const colors: string[] = ['#33ffaa', '#109CF1', '#a12' ]
const BLACK = 'rgba(50,50,50, 1.0)'
const WHITE = 'rgba(255,255,255,1.0)'
const GREEN = colors[0]

const animationTrajectory = 'center'

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 175,
    backgroundColor: WHITE,
    color: BLACK
};
const tooltipLabels = {
    category: 'Category',
    barType: 'Bar Type',
    freq: 'Total Pageviews',
    uniques: 'Unique Views',
    rank: 'Rank',
    normal: 'Normalized Score',
    visitorIps: 'Visitor IPs'
}

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

interface VipsListProps {
    uniques: string[]; 
    ips: string[]; 
    slug: string;
};

const VisitorIpsList: React.FC<VipsListProps> = ({ uniques, ips, slug }) => {

    return (
        <Box>

            <Text size='1' css={{ textDecoration: 'underline', textDecorationColor: GREEN}}> Visitor IPs: </Text>
            <Flex css={{ fd: 'column', jc: 'flex-end', ai: 'flex-start' }}>
                {ips.map((ip,_) => {
                    return (
                        <Flex>
                            <Text size='1'> {ip.substring(0,25)} </Text> 
                            <Text size='1'> {JSON.stringify(uniques[slug])} </Text>
                        </Flex>
                    );
                })}
            </Flex> 
        </Box>
    )
}

const BarChart = ({  
    width = 300, 
    height = 300, 
    margin = DEFAULT_MARGIN, 
    freqs,
    uniques
}: BarStackProps) => {
    const {
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        hideTooltip,
        showTooltip
    } = useTooltip<TooltipData>();
    
    const BACKGROUND =  'transparent'

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
    const uniqueRank = (i: number) => (i-1)/2;
    const visitorIps = (d: Datum) => uniques[slug(d)].rankings.map((ranking, _) => ranking.slug)
    // const tooltipContent = (i: number, td: any) => i%2===0 ? td.frequencyProps : td.uniqueProps

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
    const formatFrequency = (frequency: number) => Math.round(frequency * maxFreq)

    let freqsBg: typeof freqs = []
    freqs.map((f) => {
        freqsBg.push(f);
        freqsBg.push(f); 
    }); 

    function formatTooltipProps(d: any, i: number) {
        const isFreq: boolean = barType(i)==='Frequency';

        let tooltipData = {
            category: barType(i),
            slug: slug(d),
            frequency: isFreq ? freq(d) : '',
            uniques: isFreq ? '' : unique(d),
            rank: isFreq ? rank(d) : uniqueRank(i),
            normal: isFreq ? `${Math.round(normal(d)*100)}%` : uniqueNormal(d),
            visitorIps: isFreq ? [] : visitorIps(d),
        };
        return tooltipData; 
    }
    

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
                width={width}
                height={height}
                stroke={WHITE}
                strokeDasharray="5 5"
                strokeOpacity={0.1}
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
                    const fill = i%2===0 ? GREEN : WHITE
                    return (
                        <Bar
                            key={`freq-bar-${d.title}`}
                            x={barX - margin.left/2}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={fill}
                            fillOpacity={0.4}
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
                    fill: WHITE,
                    fontSize: 10,
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
                    <Box css={{ width: '225px', height: '150px', br: '$1', padding: '$1' }}>
                        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
                            {Object.entries(tooltipData).map((d: Datum, i: number) => {
                                if(!d[1]) return null; 
                                if(d[0]==='visitorIps') return <VisitorIpsList uniques={uniques} ips={d[1]} slug={slug(d)} /> 
                            
                                return (
                                
                                    <Flex key={i} css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1' }}> 
                                        <Text size='1' css={{ mb: i===0? '$2' : 0}}> 
                                            {i===0 || !tooltipLabels[d[0]] ? '' : `${tooltipLabels[d[0]]}`} 
                                        </Text>
                                        <Text size='1'> {d[1]} </Text>
                                    </Flex>
                                );
                            })}
                        </Flex>
                    </Box>
                </TooltipInPortal>
            )}
        </div>
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

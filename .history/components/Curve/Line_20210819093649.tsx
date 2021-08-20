import React, { useState, useCallback, useMemo, useRef } from 'react'

import { scaleLinear } from '@visx/scale'
import { curveLinear } from "@visx/curve"
import { Group } from '@visx/group';
import { LinePath, AreaClosed } from "@visx/shape"
import { AxisLeft, AxisBottom } from "@visx/axis"
import { GridColumns, GridRows } from '@visx/grid'

import { Point } from '@visx/point'
import { voronoi } from '@visx/voronoi'
import { localPoint } from '@visx/event'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'

import NoDataPlaceholder from './NoData'

const BACKGROUND = '#f3f3f3'
const GRID_STROKE = "#e0e0e0"
const DEFAULT_MARGIN = { top: 25, left: 20, bottom: 25, right: 20 }; 
const DEFAULT_TOOLTIP_STYLES = defaultStyles;
const TRANSPARENT = 0.0
const OPAQUE = 1.0
const INVISIBLE = 0
const THICK = 2

interface IMarginProps {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

interface ILineChartProps {
    intervals: any;
    details: any; 
    bounds: any;
    numClicks: number;
    height: number;
    width: number;
    margin: IMarginProps;
}

interface IDatum {
    x: string;
    y: number; 
}


const LineChart = ({
    intervals,
    details,
    bounds,
    numClicks,
    height,
    width,
    margin = DEFAULT_MARGIN,
}: ILineChartProps) => {
    if(!numClicks || numClicks===0) {
        return (
            <NoDataPlaceholder 
                height={height} 
                width={width} 
                margin={margin} 
            />
        ); 
    }

    const innerWidth  = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xAccessor = (d: IDatum) => parseInt(`${d.x}`);
    const yAccessor = (d: IDatum) => d.y;
    const detailsAccessor = (d: IDatum) => {
        if(!d || d===undefined || d===null) return {};
        if(!details[parseInt(`${d.x}`)] || details[parseInt(`${d.x}`)]===undefined) return {details: 'none', cfRay: 'n/a'};
        return {
            'time': parseInt(d.x),
            'clickIds': details[parseInt(`${d.x}`)].map((click: any, _: number) => click.cfRay)
        }
    }
    const ys = intervals?.map((d: IDatum) => yAccessor(d)) || [];
    const yMin = 0;
    const yMax = Math.max(...ys);

    let tooltipTimeout: number = 0;
    const svgRef = useRef<SVGSVGElement>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    
    const xScale = scaleLinear({
        range: [margin.left, innerWidth + margin.left],
        domain: [bounds[0], bounds[1] + 2],
        nice: true,
    });
      
    const yScale = scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [yMin, yMax],
        nice: true,
    });

    const voronoiLayout = useMemo(() =>
        voronoi({
            x: (d: IDatum) => xScale(xAccessor(d)) ?? 0,
            y: (d: IDatum) => yScale(yAccessor(d)) ?? 0,
            width,
            height
        })(intervals),
    [intervals, width, height, xScale, yScale]);

    const {
        tooltipOpen,
        showTooltip,
        hideTooltip,
        tooltipData,
        tooltipLeft = 0,
        tooltipTop = 0,
    } = useTooltip();
      
    const handleMouseMove = useCallback((event) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        if (!svgRef.current) return;

        let point: Point | null = localPoint(event);
        point = localPoint(svgRef.current, event);
        if (!point) return;

        let neighborRadius = 100
        const closest = voronoiLayout.find(point.x, point.y, neighborRadius);

        if (closest) {
            setHoveredId(closest.data.x);
            showTooltip({
                tooltipLeft: xScale(xAccessor(closest.data)),
                tooltipTop: yScale(yAccessor(closest.data)),
                tooltipData: { 
                    loc: {
                        x: closest.data.x, 
                        y: closest.data.y
                    },
                    details: detailsAccessor(closest.data) 
                }
            });
        }
    }, [intervals, showTooltip, yScale, xScale])
 
    const handleMouseLeave = useCallback(() => {
        setHoveredId(null);
        tooltipTimeout = window.setTimeout(() => hideTooltip(), 1500);
    }, [hideTooltip]);

    return (
        <>
            <svg width={width} height={height} ref={svgRef}>
                <rect
                    x={margin.left}
                    y={margin.top}
                    width={innerWidth}
                    height={innerHeight}
                    fill={BACKGROUND}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseLeave}
                />
                <AreaClosed
                    data={intervals}
                    x={(d: IDatum) => xScale(xAccessor(d))}
                    y={(d: IDatum) => yScale(yAccessor(d))}
                    yScale={yScale}
                    curve={curveLinear}
                    fill={'green'}
                    fillOpacity={0.4}
                />
                <LinePath
                    data={intervals}
                    x={(d: IDatum) => xScale(xAccessor(d))}
                    y={(d: IDatum) => yScale(yAccessor(d))}
                    curve={curveLinear}
                    stroke="#222"
                    strokeWidth={1.5}
                    strokeOpacity={0.8}
                />
                <AxisBottom
                    scale={xScale}
                    top={innerHeight + margin.top}
                    numTicks={4}
                />
                <AxisLeft
                    scale={yScale}
                    left={margin.left}
                    numTicks={8}
                />
                <GridColumns
                    top={margin.top}
                    scale={xScale}
                    height={innerHeight}
                    stroke={GRID_STROKE}
                    strokeOpacity={1}
                    pointerEvents="none"
                    numTicks={4}
                />
                <GridRows
                    left={margin.left}
                    scale={yScale}
                    width={innerWidth}
                    stroke={GRID_STROKE} 
                    strokeOpacity={1}
                    pointerEvents="none"
                    numTicks={10}
                />
                <Group>
                    {intervals?.map((interval: IDatum, _: number) => {
                        const hoveredAndFocused: boolean = (hoveredId && interval && interval?.x && interval.x===hoveredId) ? true : false;

                        return (
                            <circle
                                cx={xScale(xAccessor(interval))}
                                cy={yScale(yAccessor(interval))}
                                r={5}
                                stroke="black"
                                fill="violet"
                                strokeWidth={hoveredAndFocused ? THICK  : INVISIBLE   }
                                fillOpacity={hoveredAndFocused ? OPAQUE : TRANSPARENT }
                                pointerEvents="none"
                            />  
                        );
                    })}
                </Group>
            </svg>
            {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
                <TooltipWithBounds
                    left={tooltipLeft - margin.left}
                    top={tooltipTop + margin.top + margin.bottom + 15}
                    style={DEFAULT_TOOLTIP_STYLES}
                >
                    <div> {JSON.stringify(tooltipData?.details)} </div>
                </TooltipWithBounds>
            )}
        </>
    );
}

export default LineChart 

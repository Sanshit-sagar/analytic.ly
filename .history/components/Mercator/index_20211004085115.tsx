import React from 'react'

import { geoMercator } from 'd3-geo'
import { scaleQuantize } from '@visx/scale'
import { Mercator, Graticule } from '@visx/geo'

import topology from './world-topo.json'
import * as topojson from 'topojson-client'

import { FeatureShape } from './interfaces'
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern'

import { TooltipWrapper } from '../../primitives/Shared'
import { Text } from '../../primitives/Text' 
import { Flex } from '../../primitives/Flex'
import { useGeodata } from '../../hooks/useClicks'

import { useAtomValue } from 'jotai/utils'
import { darkModeAtom } from '../../pages/index'
import { useGloballyConsistentColors } from '../../hooks/useColors'

import {
    useTooltip,
    defaultStyles,
    TooltipWithBounds
} from '@visx/tooltip'
import { localPoint } from '@visx/event'

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
  type: "FeatureCollection";
  features: FeatureShape[];
};

interface ICustomMercator {
    height: number;
    width: number; 
    markers: any[];
}

interface TooltipData {
    longitude: number;
    latitude: number; 
    city: string;
    country: string; 
    clicks: number; 
    x: number;
    y: number; 
}

const CustomMercator = React.memo(function CustomMercator({ height, width, markers }: ICustomMercator) {
    const darkMode = useAtomValue(darkModeAtom)
    const colors = useGloballyConsistentColors()
    const {
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        hideTooltip,
        showTooltip,
        tooltipData
    } = useTooltip<TooltipData>()
    
    if(width < 10) return null;

    const color = scaleQuantize({
        domain: [
            Math.min(...world.features.map(f => f.geometry.coordinates.length)),
            Math.max(...world.features.map(f => f.geometry.coordinates.length)),
        ],
        range: [
            colors.funky, 
            colors.funkyText, 
            colors.text,
            colors.hiContrast, 
            colors.accentHover, 
            colors.accentPressed, 
        ],
    });

    const handleTooltip = (event: React.MouseEvent<SVGCircleElement>, marker: any) => {
        const coords = localPoint(event);
        if(!coords) return null;

        const top: number = coords.y
        const left: number = coords.x
        showTooltip({
            tooltipTop: top,
            tooltipLeft: left,
            tooltipData: {
                latitude: left,
                longitude: top,
                city: marker.city,
                country: marker.country,
                clicks: parseInt(marker.clicks),
                x: parseFloat(marker.x),
                y: parseFloat(marker.y)
            }
        })
    }
    
    const BACKGROUND = 'transparent'
    const GRATICULE_STROKE = darkMode ? 'rgba(10,10,10,0.1)' : 'rgba(255,255,255,0.1)'

    const scale = (width / 630) * 100;
    const translate: [number, number] = [width/2, (height/2) + 70]
    const projection = geoMercator().translate(translate).scale(scale)

    return (
        <>
            <svg 
                height={height} 
                width={width} 
            >
                <rect 
                    x={0} 
                    y={0} 
                    width={width} 
                    height={height} 
                    fill={BACKGROUND} 
                    opacity={0.2}
                    rx={15} 
                    ry={15}
                />
                <Mercator<FeatureShape>
                    data={world.features}
                    scale={scale}
                    translate={translate}
                >
                    {(mercator) => (
                        <g>
                            <Graticule 
                                graticule={g => mercator.path(g) || ''} 
                                stroke={GRATICULE_STROKE}
                            />
                            {mercator.features.map(({ feature, path }, i) => {
                                return (
                                    <path
                                        key={`map-feature-${i}`}
                                        d={path || ''}
                                        fill={color(feature.geometry.coordinates.length)}
                                        stroke={BACKGROUND}
                                        strokeWidth={0.5}
                                    />
                                );
                            })}
                        </g>
                    )}
                </Mercator>
                <g>
                    {markers.map((marker, markerIndex: number) => (
                        <circle
                            key={`marker-${markerIndex}`}
                            r={4}
                            fill="red"
                            stroke="#333"
                            strokeWidth={3}
                            transform={`translate(${projection([
                                parseFloat(marker.y),
                                parseFloat(marker.x)
                            ])})`}
                            style={{ zIndex: 7 }}
                            onMouseMove={(event: React.MouseEvent<SVGCircleElement>) => handleTooltip(event, marker)}
                            onMouseLeave={() => hideTooltip()}
                        />
                    ))}
                </g>
            </svg>
            {tooltipOpen && tooltipTop && tooltipLeft && tooltipData && (
                <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop - 12}
                    left={tooltipLeft}
                    style={{
                        ...defaultStyles,
                        minWidth: 175,
                        zIndex: 4 
                    }}
                >
                    <TooltipWrapper> 
                        {Object.keys(tooltipData).map((key: string, i: number) => {
                            if(key==='latitude' || key==='longitude') return null; 
                            
                            const td: { [key: string]: any } = {...tooltipData};
                            return (
                                <Flex key={i} css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2' }}>
                                    <Text size='1'> {key} </Text>
                                    <Text size='1'> {td[key]} </Text>
                                </Flex>
                            );
                        })}
                    </TooltipWrapper>
                </TooltipWithBounds>
            )}
        </>
    );
});

const GlobalMercator = () => {
    const { geodata, loading, error } = useGeodata(false, 'less')

    if(loading) return <Text size='1'> Loading... </Text>
    if(error) return <Text size='1'> Error: {error.message} </Text>

    let markers: any[] = []; 
    Object.entries(geodata).splice(0, 10).map((value: any, _: number) => {
        markers.push({
            hash: value[0],
            cfRay: value[1].cfRay,
            city: value[1].city,
            country: value[1].country,
            clicks: value[1].count,
            x: value[1].coordinate.latitude,
            y: value[1].coordinate.longitude
        })
    });

    return (
        <ParentSize>
            {({ height, width }) => {
                return (
                    <CustomMercator 
                        height={0.925*height} 
                        width={width} 
                        markers={markers}
                    /> 
                )
            }}
        </ParentSize>
    );
}

export default GlobalMercator 
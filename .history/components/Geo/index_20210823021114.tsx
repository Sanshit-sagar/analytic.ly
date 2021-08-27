import React, { useState, useMemo } from 'react'

import topology from './world-topo.json'
import { scaleQuantize } from '@visx/scale'
import * as topojson from 'topojson-client';
import { Mercator, Graticule } from '@visx/geo'

import { Point } from '@visx/point'
import { voronoi } from '@visx/voronoi'
import { localPoint } from '@visx/event'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'

import { VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Text } from '../../primitives/Text'

import { useGeodata } from '../../hooks/useClicks'

const BACKGROUND = 'rgba(50,50,50,1.0)'
const WHITE = 'rgba(255,255,255,1.0)'
const neighborRadius = 75
export type VoronoiProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

export type GeoMercatorProps = {
    width: number;
    height: number;
    data: GeoDatum[]; 
    markers: any[];
}

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map(f => f.geometry.coordinates.length)),
    Math.max(...world.features.map(f => f.geometry.coordinates.length)),
  ],
  range: [
    'rgba(100,255,165,1.0)',
    'rgba(100,255,165,0.8)',
    'rgba(100,255,165,0.6)',
    'rgba(100,255,165,0.4)',
    'rgba(100,255,165,0.2)',
    'rgba(100,255,165,0.1)',
  ],
});

const CustomMercator  = ({ width, height, data, markers }: GeoMercatorProps) => {
    if(width < 10) return null;

    const innerWidth = width - 10 - 10
    const innerHeight = height - 10 - 10

    const voronoiLayout = useMemo(() =>
        voronoi<Datum>({
                x: d => d.x * innerWidth,
                y: d => d.y * innerHeight,
                width: innerWidth,
                height: inner,
    })(data), [innerWidth, innerHeight]);

    const polygons = voronoiLayout.polygons()
    const svgRef = useRef<SVGSVGElement>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [neighborIds, setNeighborIds] = useState<Set<string>>(new Set())

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / 630) * 100;

    return (
    <svg width={width} height={height}>
        <RectClipPath id="voronoi_clip" width={innerWidth} height={innerHeight} rx={14} />
        <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14} />
        <p>{JSON.stringify(markers)} </p> 
        <Mercator<FeatureShape>
             data={world.features}
             scale={scale}
             translate={[centerX, centerY + 50]}
        >
            {mercator => (
            <g>
                <Graticule graticule={g => mercator.path(g) || ''} stroke="rgba(33,33,33,0.05)" />
                    {mercator.features.map(({ feature, path }, i) => (
                        <path
                             key={`map-feature-${i}`}
                             d={path || ''}
                             fill={color(feature.geometry.coordinates.length)}
                             stroke={BACKGROUND}
                             strokeWidth={1.0}
                        />
                    ))}
          </g>
        )}
      </Mercator>
    </svg>
  );
};


// (x,y) are rounded to closest ints,
// (lng,lat) have up to three decimal places
interface Coordinate {
    longitude: number;
    latitude: number;
    x: number;
    y: number; 
}

interface GeoDatum {
    hash: string;
    cfRay: string; 
    city: string; 
    country: string;
    postalCode: number;
    metroCode: number;
    timezone: string;
    timestamp: number;
    count: number;
    coordinate: Coordinate;
}

const HeatedGeo = () => {
    const [fetchStats, setFetchStats] = useState(false)
    const [mode, setMode] = useState('less')

    const toggleMode = () => setMode(mode==='less' ? 'more' : 'less');
    const toggleStats = () => setFetchStats(!fetchStats);

    const { geodata, loading, error } = useGeodata(false, 'less');
    if(loading) return <Text> loading.. </Text>
    if(error) return <Text> error! </Text> 

    let markers: Coordinate[] = [];
    let data: GeoDatum[] = [];
    
    Object.entries(geodata).splice(0, 10).map((value: [string, any], _: number) => {
        let currGeoDatum: GeoDatum = {
            hash: value[0],
            cfRay: value[1].cfRay,
            city: value[1].city,
            country: value[1].country,
            postalCode: value[1].postalCode,
            metroCode: value[1].metroCode,
            timestamp: value[1].timestamp,
            timezone: value[1].timezone,
            count: value[1].count,
            coordinate: {...value[1].coordinate}
        }; 
        data = data?.length ?  [...data, {...currGeoDatum}] : [{...currGeoDatum}]
        markers = markers?.length ? [...markers, {...currGeoDatum.coordinate}] : [{...currGeoDatum.coordinate}];
    });

    return (
          <VisxParentSizeWrapper>
             <ParentSize>
                 {({ width, height }) => {
                     return (
                         <CustomMercator 
                            height={height} 
                            width={width} 
                            data={data} 
                            markers={markers}
                        />
                     );
                 }}
             </ParentSize>
          </VisxParentSizeWrapper>
    );
}

export default HeatedGeo



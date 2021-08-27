import React, { useState } from 'react'

import topology from './world-topo.json'
import { scaleQuantize } from '@visx/scale'
import * as topojson from 'topojson-client';
import { Mercator, Graticule } from '@visx/geo'

import { VisxParentSizeWrapper } from '../../primitives/Shared'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'

import { useGeodata } from '../../hooks/useClicks'

const BACKGROUND = 'rgba(50,50,50,1.0)'
const WHITE = 'rgba(255,255,255,1.0)'

export type GeoMercatorProps = {
    width: number;
    height: number
    toggleMode: any;
    toggleStats: any;
    markers: any;
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

const CustomMercator  = ({ width, height, events = false }: GeoMercatorProps) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 630) * 100;

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={BACKGROUND} rx={14} />
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
    cfRay: string; 
    city: string; 
    country: string;
    postalCode: number;
    metroCode: number;
    timezone: string;
    timestamp: number;
    hash: string;
    count: number;
    coordinate: Coordinate;
}

const HeatedGeo = () => {
    const [fetchStats, setFetchStats] = useState(false)
    const [mode, setMode] = useState('less')

    const toggleMode = () => {
        setMode(mode==='less' ? 'more' : 'less');
    }
    const toggleStats = () => {
        setFetchStats(!fetchStats);
    }

    const { geodata, loading, error } = useGeodata(false, 'less');

    if(loading) return <Text> loading.. </Text>
    if(error) return <Text> error! </Text> 

    let data: [string, GeoDatum][] = Object.entries(geodata).splice(0, 10); 

    return (
          <VisxParentSizeWrapper>
             <ParentSize
          </VisxParentSizeWrapper>
    );
}

export default HeatedGeo



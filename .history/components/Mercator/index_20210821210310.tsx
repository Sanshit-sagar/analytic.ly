import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from './world-topo.json';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { VisxParentSizeWrapper } from '../../primitives/Shared'

export const background = '#f9f7e8';

export type GeoMercatorProps = {
  width: number;
  height: number;
  events?: boolean;
};

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
    "#019ece",
    "#f4448b",
    "#fccf35",
    "#82b75d",
    "#b33c88",
    "#fc5e2f",
    "#f94b3a",
    "#f63a48",
    "#dde1fe",
    "#8993f9",
    "#b6c8fb",
    "#65fe8d"
  ],
});

const WorldMap = ({ width, height, events = true }: GeoMercatorProps) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 630) * 100;

  const markers = {
    berlin: { lat: 52.518611, lng: 13.408333 },
    paris: { lat: 48.856613, lng: 2.352222 },
    london: { lat: 51.507222, lng: -0.1275 }
  } as { [key: string]: { 
      lat: number; 
      lng: number 
  } 
};

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
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
                stroke={background}
                strokeWidth={0.5}
                onClick={() => {
                  if (events) alert(`Clicked: ${feature.properties.name} (${feature.id})`);
                }}
              />
            ))}
          </g>
        )}
      </Mercator>
      <g>
          {Object.keys(markers).map((city) => (
            <circle
              r={4}
              fill="none"
              stroke="#333"
              strokeWidth={3}
              transform={`translate(${projection([
                markers[city].lng,
                markers[city].lat
              ])})`}
            />
          ))}
      </g>
    </svg>
  );
};

const GeoHeatmap = () => {

  return (
    <VisxParentSizeWrapper> 
      <ParentSize>{({ width, height }) => <WorldMap width={width} height={height} />}</ParentSize>
    </VisxParentSizeWrapper>
  )
}

export default GeoHeatmap
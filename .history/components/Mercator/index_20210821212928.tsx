import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from './world-topo.json';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { VisxParentSizeWrapper } from '../../primitives/Shared'
import { geoMercator } from "d3-geo";

export const background = 'rgba(50,50,50,1.0)';

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
    'rgba(0,255,165,1.0)',
    'rgba(0,255,165,0.8)',
    'rgba(0,255,165,0.6)',
    'rgba(0,255,165,0.4)',
    'rgba(0,255,165,0.2)',
    'rgba(0,255,200,1.0)',
  ],
});

const WorldMap = ({ width, height, events = true }: GeoMercatorProps) => {
  if(width < 10) return null;

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 630) * 100;
  const translate: [number, number] = [centerX, centerY + 50];

  const markers = {
    berlin: { lat: 52.518611, lng: 13.408333 },
    paris: { lat: 48.856613, lng: 2.352222 },
    london: { lat: 51.507222, lng: -0.1275 }
  } as { [key: string]: { 
      lat: number; 
      lng: number 
    } 
  };

  const projection = geoMercator().translate(translate).scale(scale);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Mercator<FeatureShape>
        data={world.features}
        scale={scale}
        translate={translate}
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
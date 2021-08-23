import React, { useState } from 'react';


import { scaleLinear } from '@visx/scale';
import { geoCentroid } from 'd3-geo';
import { AlbersUsa } from '@visx/geo';
import topology from './usa-topo.json';
import stateAbbrs from './us-abbr.json';
import * as topojson from 'topojson-client';
import { GeoProjection } from 'd3';

export const background = 'rgba(50,50,50,1.0)';
const sizeScale = scaleLinear<number>({ domain: [0, 600], range: [0.5, 8] });

const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: -211.62,
  translateY: 162.59,
  skewX: 0,
  skewY: 0,
};

export type ZoomIProps = {
  width: number;
  height: number;
};

export type GeoAlbersUsaProps = {
  width: number;
  height: number;
  fullSize?: boolean;
};

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

interface IFeaturesProps {
  feature: FeatureShape;
  path: string | null;
  projection: GeoProjection;
}

// @ts-ignore
const { features: unitedStates } = topojson.feature(topology, topology.objects.states) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

export const colors: string[] = ['#744DCA', '#3D009C', '#9020FF', '#C630FD'];

// X and Y adjustments to individual states
const coordOffsets: Record<string, number[]> = {
  FL: [11, 3],
  AK: [0, -4],
  CA: [-7, 0],
  NY: [5, 0],
  MI: [13, 20],
  LA: [-10, -3],
  HI: [-10, 10],
  ID: [0, 10],
  WV: [-2, 4],
  KY: [10, 0],
  TN: [0, 4],
};

const ignoredStates = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD'];

export default function GeoAlbersUsa({ width, height, fullSize = true }: GeoAlbersUsaProps) {
  const [displayLabels, setDisplayLabels] = useState<boolean>(fullSize);

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width + height) / 1.55;

  return width < 10 ? null : (
    <>
      <svg width={width} height={height} style={{ background, borderRadius: '14px' }}>
        <AlbersUsa<FeatureShape>
          data={unitedStates}
          scale={scale}
          translate={[centerX, centerY - 25]}
        >
          {({ features }) =>
            features.map(({ feature, path, projection }: IFeaturesProps, i: number) => {
              const coords: [number, number] | null = projection(geoCentroid(feature));
              const abbr: string = stateAbbrs[feature.id];

              if (coordOffsets[abbr] && coords) {
                coords[0] += coordOffsets[abbr][0];
                coords[1] += coordOffsets[abbr][1];
              }

              const stylesObj = {
                fill: '#FFF',
                fontFamily: 'sans-serif',
                cursor: 'default',
              };

              if (abbr === 'HI') {
                stylesObj.fill = 'rgba(50,100,255,1.0)'
              }

              if (ignoredStates.includes(abbr)) {
                return (
                  <path
                    key={`map-feature-${i}`}
                    d={path || ''}
                    fill={colors[i % 4]}
                    stroke={background}
                    strokeWidth={0.5}
                  />
                );
              }

              return (
                <React.Fragment key={`map-feature-${i}`}>
                  <path
                    key={`map-feature-${i}`}
                    d={path || ''}
                    fill={colors[i % 4]}
                    stroke={background}
                    strokeWidth={0.5}
                  />
                  {displayLabels && (
                    <text
                      transform={`translate(${coords})`}
                      fontSize={Math.max(width / 75, 9)}
                      style={stylesObj}
                      textAnchor="middle"
                    >
                      {abbr}
                    </text>
                  )}
                </React.Fragment>
              );
            })
          }
        </AlbersUsa>
      </svg>
      {fullSize && (
        <label
          style={{
            position: 'relative',
            left: '20px',
            top: '-60px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type="checkbox"
            checked={displayLabels}
            onChange={() => {
              setDisplayLabels(!displayLabels);
            }}
          />
          &nbsp;Display labels
        </label>
      )}
    </>
  );
}

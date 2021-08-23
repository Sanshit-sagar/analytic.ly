import React, { useState } from 'react';

import * as topojson from 'topojson-client';
import { geoCentroid } from 'd3-geo';
import { AlbersUsa } from '@visx/geo';
import { GeoProjection } from 'd3';

import topology from '../AlbersUsa/usa-topo.json'
import stateAbbrs from '../AlbersUsa/us-abbr.json'

import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { 
    DashboardDisplayBox, 
    VisxParentSizeWrapper 
} from '../../primitives/Shared'

export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

const BACKGROUND = 'rgba(50,50,50,1.0)';

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

export const colors: string[] = [
  'rgba(100,255,165,1.0)', 
  'rgba(100,255,165,0.8)', 
  'rgba(100,255,165,0.6)',
  'rgba(100,255,165,0.4)',  
  'rgba(100,255,165,0.2)',
  'rgba(100,255,165,0.1)'
];

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

const GeoAlbersUsa = ({ width, height }: GeoAlbersUsaProps) => {
  if(width < 10) return null;

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width + height) / 1.55;


  return (
    <>
        <AlbersUsa<FeatureShape>
          data={unitedStates}
          scale={scale}
          translate={[centerX, centerY - 25]}
        >
          {({ features }) =>
            features.map(({ feature, path, projection }: IFeaturesProps, i: number) => {
              const coords: [number, number] | null = projection(geoCentroid(feature));
              const abbr = stateAbbrs[feature.id];

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
                    stroke={BACKGROUND}
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
                    stroke={BACKGROUND}
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
    </>
  );
}

lbersUsaMap = () => {      





urn (
 <DashboardDisplayBox>
     <Toolbar /> 
      <VisxParentSizeWrapper>
          <ParentSize>
              {({ height, width }) => {
                  return (
                     <AlbersUsa
                          height={height}
                          width={width}
                     />
                  );
              }}
          </ParentSize>
      </VisxParentSizeWrapper>
 </DashboardDisplayBox>



export default AlbersUsaMap
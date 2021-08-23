import React, { useState } from 'react';

import { geoCentroid } from 'd3-geo';
import { AlbersUsa } from '@visx/geo';
import topology from './usa-topo.json';
import stateAbbrs from './us-abbr.json';
import * as topojson from 'topojson-client';
import { GeoProjection } from 'd3';

import { Label, Connector, CircleSubject, LineSubject, Annotation, EditableAnnotation } from '@visx/annotation';
import { LinePath } from '@visx/shape';
export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

type AnnotationPosition = { x: number; y: number; dx: number; dy: number };

type ProvidedProps = {
  AnnotationComponent: typeof Annotation | typeof EditableAnnotation;
  anchorLinePosition?: 'auto' | 'all' | 'none';
  annotationPosition: AnnotationPosition;
};

export const orange = '#ff7e67';
export const greens = ['#ecf4f3', '#68b0ab', '#006a71'];
export const background = 'rgba(50,50,50,1.0)';


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
  if(width < 10) return null;
  
  const [displayLabels, setDisplayLabels] = useState<boolean>(fullSize);

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width + height) / 1.55;

  return (
    <>
      <svg width={width} height={height} style={{ background, borderRadius: '14px' }}>
        <AnnotationComponent
          width={width}
          height={height}
          x={annotationPosition.x}
          y={annotationPosition.y}
          dx={annotationPosition.dx}
          dy={annotationPosition.dy}
       >
         <Label
            backgroundFill="white"
            showAnchorLine={true}
            anchorLineStroke={greens[2]}
            backgroundProps={{ stroke: greens[1] }}
            fontColor={greens[2]}
            horizontalAnchor={'middle'}
            subtitle={'Subtitle goes here'}
            title={'Title goes here'}
            verticalAnchor={'middle'}
            width={250}
          />
          <CircleSubject stroke={orange} />

       
    

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
    </>
  );
}

import React, { useState } from 'react'

import topology from './world-topo.json'
import * as topojson from 'topojson-client'

import { geoMercator } from 'd3-geo'
import { localPoint } from '@visx/event'
import { scaleQuantize } from '@visx/scale'
import { Mercator, Graticule } from '@visx/geo'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { useTooltip, useTooltipInPortal } from '@visx/tooltip'

import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { DashboardDisplayBox, VisxParentSizeWrapper } from '../../primitives/Shared'
import { useGeodata } from '../../hooks/useClicks'

import { GeoMercatorProps, FeatureShape, Datum } from '@visx/'

import Toolbar from './Toolbar' 
import GeoAlbersUsa from './AlbersUsa'

const BACKGROUND = 'rgba(50,50,50,1.0)';
const SILVER = '#d9d9d9'
let TOOLTIP_TIMEOUT: number = 1500;




const SANITIZED_KEYS: any = {
  'lat': 'Latitude',
  'lng': 'Longitude',
  'hash': 'Hash',
  'city': 'City',
  'country': 'Country',
  'postalCode': 'Postal Code',
  'metroCode': 'Metro Code',
  'timezone': 'Timezone',
  'count': 'Clicks/Views'
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
    'rgba(0,255,165,0.1)',
  ],
});

export type VoronoiProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const WorldMap:React.FC<GeoMercatorProps> = ({ 
  width, 
  height, 
  markers,
  events = false
}) => {

  if(width < 10) return null;

  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData
  } = useTooltip<any>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({ detectBounds: true, scroll: true });
    
  const centerX = width / 2
  const centerY = height / 2
  const scale = (width / 630) * 100
  const translate: [number, number] = [centerX, centerY + 50]
  const projection = geoMercator().translate(translate).scale(scale);
  
  return (
    <>
      <svg 
        ref={containerRef}
        width={width} 
        height={height}
      >
        <rect 
          x={0} 
          y={0} 
          width={width} 
          height={height} 
          fill={BACKGROUND} 
          rx={5} 
        />
        <Mercator<FeatureShape>
          data={world.features}
          scale={scale}
          translate={translate}
        >
          {mercator => (
            <g>
              <Graticule graticule={g => mercator.path(g) || ''} stroke="rgba(33,33,33,0.05)" />
                {mercator.features.map(({ feature, path }, i) => {
                  return (
                    <path
                      key={`map-feature-${i}`}
                      d={path || ''}
                      fill={feature.id !== 'USA' ? SILVER : color(feature.geometry.coordinates.length)}
                      stroke={BACKGROUND}
                      strokeWidth={0.5}
                      onClick={() => {
                        if (events) alert(`Clicked: ${feature.properties.name} (${feature.id})`);
                      }}
                      onMouseMove={(event) => {
                        const coords = localPoint(event.target.ownerSVGElement, event);
                        if(!coords) return; 
                        if(feature.id!=='USA') return; 
            
                        const top: number = coords.y
                        const left: number = coords.x
                        showTooltip({
                          tooltipData: { 
                            location: feature.properties.name,
                            id: feature.id,
                            x: top,
                            y: left,
                            data: feature.properties
                          },
                          tooltipTop: top,
                          tooltipLeft: left
                        });
                      }}
                      onMouseOut={() => {
                        TOOLTIP_TIMEOUT = window.setTimeout(() => {
                          hideTooltip();
                        }, 3000);
                      }}
                    />
                  );
                })}
            </g>
          )}
        </Mercator>
        <g>
          {Object.keys(markers).map((city: string) => (
            <circle
              r={4} 
              fill={'fuchsia'}
              transform={`translate(${projection([
                markers[city].lng,
                markers[city].lat
              ])})`}
              onMouseMove={(event) => {
                const coords = localPoint(event.target.ownerSVGElement, event);
                if(!coords) return; 
    
                const top: number = coords.y
                const left: number = coords.x
                showTooltip({
                  tooltipData: { 
                    key: `coordinate-${top},${left}`,
                    x: top,
                    y: left,
                    data: {...markers[city]}
                  }
                })
              }}
              onMouseLeave={hideTooltip}
            />
          ))}
        </g>
      </svg>
      {tooltipOpen && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <Box css={{ height: '150px', width: '200px' }}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1', mt: '$1' }}>
              {Object.entries(tooltipData.data).map((datum, i) => {
                return (          
                  <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start'}}> 
                    <Text size='1' css={{ textDecoration: 'underline', textDecorationColor: '$green' }}> 
                      {SANITIZED_KEYS[datum[0]]} 
                    </Text>
                    <Text size='1'> {datum[1]} </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Box>
        </TooltipInPortal>
      )}
    </>
  );
};


  interface MarkerProps { 
    [key: string]: { 
      rankedSlug: RankedSlug 
    }
  };

  interface Coordinate {
    x: number;
    y: number; 
    latitude: number; 
    longitude: number; 
    hash: string; 
  }

  interface RankedSlug {
    lat?: number | 0;
    lng?: number | 0;
    count?: number | 0;
    metroCode?: string | 0;
    postalCode?: number | 0;
    hash?: string | '';
    city?: string | '';
    timezone?: string | '';    
    country?: string | '';
    coordinate?: Coordinate;
  }


const HeatedGeo = () => {
  const [mode, setMode] = useState<string>('less')
  const [fetchStats, setFetchStats] = useState<boolean>(false);
  const [map, setMap] = useState<string>('0');
  
  const handleMapChange = (e: React.MouseEvent<HTMLButtonElement>) => {
      setMap(e.currentTarget.value); 
  }
  
  const { geodata, loading, error } = useGeodata(fetchStats, mode);

  if(loading) return <Text size='1'> loading... </Text> 
  if(error) return <Text size='1'> Error: {error.message} </Text>
  if(!geodata) return <Text size='1'> No data to show </Text>

  let data: [string, RankedSlug][] = Object.entries(geodata)
  let markers: MarkerProps = {};

  data.map((d, i: number) => {

    if(data[i] && data[i][0] && data[i][1]) {

      const rankedSlug: RankedSlug = {
          lat: data[i][1].coordinate?.latitude || 0,
          lng: data[i][1].coordinate?.longitude || 0,
          hash: data[i][1].hash || '',
          count: data[i][1].count || 0,
          city: data[i][1].city || '',
          country: data[i][1].country || '',
          postalCode: data[i][1].postalCode || 0,
          metroCode: data[i][1].metroCode || 0,
          timezone: data[i][1].timezone || '',
          coordinate: {
            x: parseInt(`${data[i][1].coordinate?.latitude || 0}`),
            y: parseInt(`${data[i][1].coordinate?.longitude || 0}`),
            latitude: parseFloat(`${data[i][1].coordinate?.latitude || 0}`),
            longitude: parseFloat(`${data[i][1].coordinate?.latitude || 0}`),
            hash: `(${data[i][1].coordinate?.latitude || 0},${data[i][1].coordinate?.longitude || 0})`
          }
      }
      markers[`${data[i][1].hash}`] = { rankedSlug }
  }});

  return (
    <DashboardDisplayBox> 
      <Toolbar map={map} updateMap={handleMapChange} />
      <VisxParentSizeWrapper> 
        <ParentSize>{({ width, height }) => {
          if(map==="0") return <WorldMap width={width} height={height} markers={markers} />;
          else return <GeoAlbersUsa width={width} height={height} markers={markers} />;
        }}
        </ParentSize>
      </VisxParentSizeWrapper>
    </DashboardDisplayBox>
  )
}

export default HeatedGeo


  
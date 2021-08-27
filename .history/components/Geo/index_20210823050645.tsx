import React from 'react'

import topology from './world-topo.json'
import { scaleQuantize } from '@visx/scale'
import * as topojson from 'topojson-client'
import { Mercator, Graticule } from '@visx/geo'
import { geoMercator } from 'd3-geo'
import { localPoint } from '@visx/event'
import { useTooltip, useTooltipInPortal } from '@visx/tooltip'


import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { VisxParentSizeWrapper } from '../../primitives/Shared'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { Flex } from '../../primitives/Flex'
import { useGeodata } from '../../hooks/useClicks'


type Datum = {
    x: number;
    y: number;
    id: string;
};

const BACKGROUND = 'rgba(50,50,50,1.0)'
const SILVER = 'silver'


export type GeoMercatorProps = {
    width: number;
    height: number;
    data: Datum[];
    moreData: GeoDatum[]; 
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

const CustomMercator:React.FC<GeoMercatorProps> = ({ 
    width, 
    height,
    data, 
    markers
  }) => {
  
    if(width < 10) return null;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert(`Clicked! ${event.currentTarget.value}`); 
    }
  
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
                        onClick={handleClick}
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
                        onMouseLeave={() => hideTooltip()}
                      />
                    );
                  })}
              </g>
            )}
          </Mercator>
          <g>
            {Object.keys(markers).map((city) => {
              <circle
                r={10} 
                fill={'fuchsia'}
                transform={`translate(${projection([
                  markers[city].lng,
                  markers[city].lat
                ])})`}
                onMouseMove={(event) => {
                  const coords = localPoint(event.currentTarget.ownerSVGElement, event);
                  if(!coords) return; 
      
                  const top: number = coords.y
                  const left: number = coords.x
                  showTooltip({
                    tooltipData: { 
                      key: `coordinate-${top},${left}`,
                      x: top,
                      y: left,
                      data: markers[city],
                    }
                  })
                }}
                onMouseLeave={() => hideTooltip()}
              />
            ))}
          </g>
        </svg>
        {tooltipOpen && tooltipLeft &&  tooltipTop && tooltipData &&   (   
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <Box css={{ height: '200px', width: '250px' }}>
              <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1', mt: '$1' }}>
                {Object.entries(tooltipData.data).map((datum, i) => {
                    return(
                        <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'flex-start', }}>
                            <Text> {JSON.stringify(data)} </Text>
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



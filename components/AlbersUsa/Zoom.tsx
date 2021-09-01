import React from 'react'
import { Zoom } from '@visx/zoom'
import { Mercator, Graticule } from '@visx/geo'
// import { geoMercator } from 'd3-geo'
import * as topojson from 'topojson-client'
import topology from './world-topo.json'

import { Flex } from '../../primitives/Flex'
import { Button } from '../../primitives/Button'

interface GeoMercatorProps {
    width: number;
    height: number;
    events: boolean;
    children: React.ReactNode; 
}

interface FeatureShape {
    type: 'Feature';
    id: string;
    geometry: { 
        coordinates: [number, number][][]; 
        type: 'Polygon' 
    };
    properties: { 
        name: string 
    };
}

const BACKGROUND = 'transparent'

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
    type: "FeatureCollection";
    features: FeatureShape[];
}
// const simpleWorld = simplify(world)

const Map = React.memo(function Map({ translateX, translateY }) {
    const scale = 10000;
    const center: [number,number] = [-2.2518, 53.8642];
    // const projection = geoMercator()
    //   .center(center)
    //   .translate([translateX, translateY])
    //   .scale(scale); // scale is off?

    return (
        <>
            <Mercator<FeatureShape>
               data={world.features}
               scale={scale}
               center={center}
             >
                 {(mercator) => (
                    <g>
                        <Graticule 
                            graticule={g => mercator.path(g) || ''} 
                            stroke="rgba(250,250,250,0.8)" 
                        />
                        {mercator.features.map(({ feature, path, centroid }, i) => {
                            return (
                                <React.Fragment key={i}>
                                     <path
                                         key={`map-feature-${i}`}
                                         d={path || ''}
                                         fill={feature.id !== 'USA' ? 'blue' : 'rgba(50,255,150, 1.0)'}
                                         stroke={'rgba(0,0,0,1.0)'}
                                         strokeWidth={0.5}
                                     />
                                </React.Fragment>
                            );
                        })}
                     </g>
                 )}
            </Mercator>
        </>
    ); 
});

const ZoomView = ({ width, height, events = false, children }: GeoMercatorProps) => {

    if(width < 10) return null;

    const centerX: number = width / 2;
    const centerY: number = height / 2;
    const scale = 0.8;
  
    return width < 10 ? null : (
    <>
      <Zoom
        width={width}
        height={height}
        scaleXMin={0.2}
        scaleXMax={5}
        scaleYMin={0.2}
        scaleYMax={5}
        transformMatrix={{
          scaleX: scale,
          scaleY: scale,
          translateX: centerX,
          translateY: centerY,
          skewX: 0,
          skewY: 0
        }}
      >
        {(zoom) => {
          return (
        <>
            <svg 
                width={width} 
                height={height}
            >
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={BACKGROUND}
                rx={14}
              />
            
              <g
                transform={`translate(${zoom.transformMatrix.translateX}, ${zoom.transformMatrix.translateY})scale(${zoom.transformMatrix.scaleX}, ${zoom.transformMatrix.scaleY})`}
              >
                <rect 
                    width={10} 
                    height={10} 
                    fill="rgba(255,255,255,0.8)" 
                />
                {children}
              </g>
            
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
              />
  
            </svg>
            <div>
                <button type="button" className="btn btn-zoom" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
                    <p> Zoom In </p>
                </button>
                <button type="button" className="btn btn-zoom btn-bottom" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>
                    <p> Zoom Out </p>
                </button>
            </div>
        </>
          );
        }}
      </Zoom>
       <style jsx>{`
       .btn {
         margin: 0;
         text-align: center;
         border: none;
         background: #2f2f2f;
         color: #888;
         padding: 0 4px;
         border-top: 1px solid #0a0a0a;
       }
       .btn-lg {
         font-size: 12px;
         line-height: 1;
         padding: 4px;
       }
       .btn-zoom {
         width: 26px;
         font-size: 22px;
       }
       .btn-bottom {
         margin-bottom: 1rem;
       }
       .description {
         font-size: 12px;
         margin-right: 0.25rem;
       }
       .controls {
         position: absolute;
         top: 15px;
         right: 15px;
         display: flex;
         flex-direction: column;
         align-items: flex-end;
       }
       `}</style>
    </>
    );
};

export default ZoomView

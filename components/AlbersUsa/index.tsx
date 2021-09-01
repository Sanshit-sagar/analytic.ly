import React, { useCallback } from 'react'

import * as topojson from 'topojson-client';
import topology from './usa-topo.json';
import stateAbbrs from './us-abbr.json';
import { geoCentroid } from 'd3-geo';

import { AlbersUsa as VisxAlbersUsa } from '@visx/geo';
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { localPoint } from '@visx/event'
import { Text } from '../../primitives/Text'
import {
    TooltipWrapper 
} from '../../primitives/Shared'

import {
    useTooltip,
    defaultStyles,
    TooltipWithBounds
  } from '@visx/tooltip';

import {
    GeoAlbersUsaProps, 
    FeatureShape
} from './interfaces'

import {
    COLORS,
    COORD_OFFSETS,
} from './constants'

// @ts-ignore
const { features: unitedStates } = topojson.feature(topology, topology.objects.states) as {
    type: 'FeatureCollection';
    features: FeatureShape[];
};

type TooltipData = {
    x: number;
    y: number;
    stateAbbreviation: string; 
};

let tooltipTimeout: number = 1500; 

const GeoAlbersUsa = ({ width, height }: GeoAlbersUsaProps) => {
    if(width < 10) return null;

    const {
        showTooltip,
        hideTooltip,
        tooltipOpen,
        tooltipData,
        tooltipLeft = 0,
        tooltipTop = 0,
    } = useTooltip<TooltipData>();

    const handleMouseMove = useCallback((event: React.MouseEvent<SVGPathElement>, abbr: string) => {
        if(tooltipTimeout) clearTimeout(tooltipTimeout);

        const coords = localPoint(event)
        if(!coords) return;

        const top = coords.y
        const left = coords.x 
        showTooltip({
            tooltipLeft: left,
            tooltipTop: top,
            tooltipData: {
                x: left, 
                y: top,
                stateAbbreviation: `${abbr}`,
            }
        });
    }, [tooltipTimeout, localPoint, tooltipTop, tooltipLeft, tooltipData]);

    const handleMouseLeave = useCallback(() => {
        tooltipTimeout = window.setTimeout(() => {
            hideTooltip();
        }, 1500);
    }, [tooltipTimeout]);

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width + height) / 1.55;

    return  (
       <div style={{ position: "relative" }}>
           <svg 
                width={width} 
                height={height} 
                rx={15}
                ry={15}
           >    
               <VisxAlbersUsa<FeatureShape>
                 data={unitedStates}
                 scale={scale}
                 translate={[centerX, centerY - 25]}
               >
                    {({ features }) =>
                       features.map(({ feature, path, projection }, i) => {
                            const coords: [number, number] | null = projection(geoCentroid(feature));
                            const abbr: string = stateAbbrs[feature.id];

                            if (COORD_OFFSETS[abbr] && coords) {
                                coords[0] += COORD_OFFSETS[abbr][0];
                                coords[1] += COORD_OFFSETS[abbr][1];
                            }
                        
                            return (
                               <React.Fragment key={`map-feature-${i}`}>
                                 <path
                                    key={`map-feature-${i}`}
                                    d={path || ''}
                                    fill={COLORS[i % 4]}
                                    stroke={'purple'}
                                    strokeWidth={0.5}
                                    onMouseMove={(event) => handleMouseMove(event, abbr)}
                                    onMouseLeave={handleMouseLeave}
                                 />
                               </React.Fragment>
                             );
                           }
                       )
                   }
               </VisxAlbersUsa>
             </svg>

             {tooltipOpen && tooltipData && (
                <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop - 12}
                    left={tooltipLeft}
                    style={{
                        ...defaultStyles,
                        minWidth: 175,
                        backgroundColor: '$canvas',
                        zIndex: 4 
                    }}
                >
                    <TooltipWrapper>
                        <Text size='1'> State: {tooltipData?.stateAbbreviation}</Text>
                    </TooltipWrapper>
                 </TooltipWithBounds>
            )}
        </div>
    );
}

const AlbersUsa = () => {

    return (
        <ParentSize>
            {({ width, height }) => {
                return (
                    <GeoAlbersUsa 
                        height={height}
                        width={width}
                    />
                );
            }}
        </ParentSize>
    );
}

export default AlbersUsa
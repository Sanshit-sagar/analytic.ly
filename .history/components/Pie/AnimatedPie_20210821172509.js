import React from 'react'
import { Arc } from '@visx/shape'
import { animated, useTransition, interpolate, TransitionKeyProps } from "react-spring"
import { Annotation, Label, Connector } from "@visx/annotation";

import { scaleLinear, scaleBand } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'

const fromLeaveTransition = ({ endAngle }) => ({
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0
});

const enterUpdateTransition = ({ startAngle, endAngle }) => ({
  startAngle,
  endAngle,
  opacity: 1
});
  
function AnimatedPie({ feats, frequencyStr, height, width, animate, arcs, rank, path, getKey, getColor, onClickDatum }) {
  const transitions = useTransition(arcs, getKey, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition
  });


  const xMax = width + 500; 
  const yMax = height + 100; 

  const {
    containerRef, 
    TooltipInPortal 
  } = useTooltipInPortal({ scroll: true });

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 100,
    backgroundColor: 'rgba(245,243,226,1)',
    color: 'rgba(245,243,226,1)',
};


const xScale = scaleBand({
  range: [0, xMax],
  round: true,
  domain: [...feats],
  padding: 0.4,
});
const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, 500],
});

const boxWidth = xScale.bandwidth();
const constrainedWidth = Math.min(40, boxWidth);


let tooltipTimeout = 0;
const targetLabelOffset = (width / 2) * 0.6;
  
return (
    <>
      {transitions.map(({ item: arc, props, key }) => {
        const [centroidX, centroidY] = path.centroid(arc);
        const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
        return (
          <g key={key}>
            <animated.path
              d={interpolate(
                [props.startAngle, props.endAngle],
                (startAngle, endAngle) =>
                  path({
                    ...arc,
                    startAngle,
                    endAngle
                  })
              )}
              fill={getColor(arc)}
              onMouseLeave={() => {
                tooltipTimeout = window.setTimeout(() => {
                  hideTooltip();
                }, 300);
              }}
              onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const eventSvgCoords = localPoint(event);
                  showTooltip({
                      tooltipData: { 
                          key:`${key}`,
                          value: `${arc.data}`,
                          height: height / 2,
                          width: width / 2,
                          index: rank ,
                          x: width + 600,
                          y: height + 400,
                          color: 'rgba(255,255,255,1)',
                      },
                      tooltipTop: eventSvgCoords?.y,
                      tooltipLeft: 0,
                  })
              }}
            />
            {hasSpaceForLabel && (
              <animated.g style={{ opacity: props.opacity }}>
                <Annotation
                  x={centroidX}
                  y={centroidY}
                  dx={(centroidX < 0 ? -targetLabelOffset : targetLabelOffset) - centroidX}
                  dy={centroidY < 0 ? -50 : 50}
                >
                  <Label
                    showAnchorLine
                    anchorLineStroke="rgba(255,255,255,1.0)"
                    showBackground={false}
                    title={getKey(arc)}
                    subtitle={`${arc.value.toFixed(1)}%`}
                    fontColor="rgba(250,255,200,1.0)"
                    width={100}
                    horizontalAnchor={centroidX < 0 ? 'end' : 'start'}
                    backgroundPadding={{
                      left: 8,
                      right: 8,
                      top: 0,
                      bottom: 0
                    }}
                  />
                  <Connector stroke="rgba(255,255,255,1.0)" />
                </Annotation>
              </animated.g>
            )}
          </g>
        );
      })}
       {tooltipOpen && tooltipData && (
          <TooltipInPortal 
            top={tooltipTop} 
            left={tooltipLeft} 
            style={tooltipStyles}
          >
          <div style={{ color: 'red' }}>
            <strong>
              {tooltipData.key}
            </strong>
            <p> hello, can you see this? </p> 
          </div>
          </TooltipInPortal>
      )}
    </>
  );
}

export default AnimatedPie



// interface TooltipData {
//   key: string;
//   value: string;
//   height: number;
//   weight: number;
//   index: number; 
//   x: any; 
//   y: any;
//   color: string; 
// }
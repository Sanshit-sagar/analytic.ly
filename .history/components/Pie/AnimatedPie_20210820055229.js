import React from 'react'
import { Arc } from '@visx/shape'
import { animated, useTransition, interpolate, TransitionKeyProps } from "react-spring"
import { Annotation, Label, Connector } from "@visx/annotation";


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
  
function AnimatedPie({ height, width, animate, arcs, path, getKey, getColor, onClickDatum }) {
  const transitions = useTransition(arcs, getKey, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition
  });

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
              onClick={() => onClickDatum(arc)}
              onTouchStart={() => onClickDatum(arc)}
            />
            {hasSpaceForLabel && (
              <animated.g style={{ opacity: props.opacity }}>
                <Annotation
                  x={centroidX}
                  y={centroidY}
                  dx={(centroidX < 0 ? -targetLabelOffset : targetLabelOffset) - centroid}
                  dy={centroidY < 0 ? -50 : 50}
                >
                  <Label
                    showAnchorLine
                    anchorLineStroke="#eaeaea"
                    showBackground={false}
                    title={getKey(arc)}
                    subtitle={`${arc.value.toFixed(1)}%`}
                    fontColor="#fff"
                    width={100}
                    horizontalAnchor={centroidX < 0 ? 'end' : 'start'}
                    backgroundPadding={{
                      left: 8,
                      right: 8,
                      top: 0,
                      bottom: 0
                    }}
                  />
                  <Connector stroke="#fff" />
                </Annotation>
              </animated.g>
            )}
          </g>
        );
      })}
    </>
  );
}

export default AnimatedPie



// interface ArcEndProps {
//     endAngle: any;
// }

// interface ArcProps {
//     startAngle: any;
//     endAngle: any;
// }

// interface AnimatedPieProps {
//     animate: boolean;
//     arcs: ArcProps;  
//     centroidX: number;
//     centroidY: number; 
//     path: (...args: number[]) => any;
//     getKey: (arc: ArcProps) => TransitionKeyProps; 
//     getColor: ((a: {startAngle: any, endAngle: any}) => string);
//     onClickDatum: any;
// }

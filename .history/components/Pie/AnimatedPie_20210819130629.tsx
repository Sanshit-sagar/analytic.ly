import React from 'react'
import { Arc } from '@visx/shape'
import { animated, useTransition, interpolate, TransitionKeyProps } from "react-spring"

const fromLeaveTransition = ({ endAngle }: ArcEndProps) => ({
    startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
    endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
    opacity: 0
});

const enterUpdateTransition = ({ startAngle, endAngle }: ArcProps) => ({
    startAngle,
    endAngle,
    opacity: 1
});

interface ArcEndProps {
    endAngle: any;
}

interface ArcProps {
    startAngle: any;
    endAngle: any;
}

interface AnimatedPieProps {
    animate: boolean;
    arcs: ArcProps;  
    centroidX: number;
    centroidY: number; 
    path: Arc<Datum>;
    getKey: (arc: ArcProps) => TransitionKeyProps; 
    getColor: ((a: {startAngle: any, endAngle: any}) => string);
    onClickDatum: any;
}

function AnimatedPie({ animate, arcs, path, centroidX, centroidY, getKey, getColor, onClickDatum }: AnimatedPieProps) {
    const transitions = useTransition(arcs, getKey, {
      from: animate ? fromLeaveTransition : enterUpdateTransition,
      enter: enterUpdateTransition,
      update: enterUpdateTransition,
      leave: animate ? fromLeaveTransition : enterUpdateTransition
    });
    return (
      <>
        {transitions.map(({ item: arc, props, key }) => {
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
                  <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={9}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {getKey(arc)}
                  </text>
                </animated.g>
              )}
            </g>
          );
        })}
      </>
    );
}

export default AnimatedPie
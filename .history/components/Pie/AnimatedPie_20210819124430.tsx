import React from "react"
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
    path: Arc<any, Datum>;
    getKey: (arc: ArcProps) => TransitionKeyProps; 
    getColor: ((a: {startAngle: any, endAngle: any}) => string);
    onClickDatum: any;
}
  

function AnimatedPie({ animate, arcs, path, getKey, getColor, onClickDatum }: AnimatedPieProps) {
    const transitions = useTransition(arcs, getKey, {
      from: animate ? fromLeaveTransition : enterUpdateTransition,
      enter: enterUpdateTransition,
      update: enterUpdateTransition,
      leave: animate ? fromLeaveTransition : enterUpdateTransition
    });
    return (
      <>
        {transitions.map(({ item: arc, props, key }) => {
          const [centroidX, centroidY]: number[] = path.centroid(arc);
          const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
          return (
            <g key={key}>
              <animated.path
                d={interpolate(
                  [arcs.startAngle, arcs.endAngle],
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
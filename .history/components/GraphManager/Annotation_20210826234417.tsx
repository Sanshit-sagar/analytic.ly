
import {
    Annotation,
    Label
} from '@visx/annotation'
import { animated } from  'react-spring'

export interface AxisLabelProps {
    height: number;
    width: number;
}

const LABEL_OPACITY = 0.7

const XAxisLabel = ({ height, width }: AxisLabelProps) => {

    return (
        <animated.g style={{ opacity: LABEL_OPACITY }}>
            <Annotation
                x={width - 75}
                y={height - 75}
                dx={50}
                dy={25}
            >
                <Label
                    showBackground={false}
                    title={'TIME'}
                    subtitle={''}
                    fontColor="rgba(250,255,200,0.75)"
                    width={100}
                    horizontalAnchor={'middle'}
                    backgroundPadding={{
                        left: 0,
                        right: 8,
                        top: 0,
                        bottom: 10
                    }}
                />
            </Annotation>
        </animated.g>
    );
}

export default XAxisLabel
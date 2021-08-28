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
const LABEL_WIDTH = 50
const LABEL_HEIGHT = 25
const BOTTOM_LABEL_BACKGROUND_PADDING = {ckgroundPadding={{
    left: 0,
    right: 8,
    top: 0,
    bottom: 10
                      }}}

const XAxisLabel = ({ height, width }: AxisLabelProps) => {

    const labelStartX = width - 75
    const labelStartY = height - 75

    return (
        <animated.g style={{ opacity: LABEL_OPACITY }}>
            <Annotation
                x={labelStartX}
                y={labelStartY}
                dx={LABEL_WIDTH}
                dy={LABEL_HEIGHT}
            >
                <Label
                    showBackground={false}
                    title={'TIME'}
                    subtitle={''}
                    fontColor="rgba(250,255,200,0.75)"
                    width={100}
                    horizontalAnchor={'middle'}
                    backgroundPadding={BOTTOM_LABEL_BACKGROUND_PADDING}                            
                />
            </Annotation>
        </animated.g>
    );
}

export default XAxisLabel
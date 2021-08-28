import {
    Annotation,
    Label
} from '@visx/annotation'
import { animated } from  'react-spring'
import { Text } from '@visx/text'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

export interface AxisLabelProps {
    height: number;
    width: number;
}

const LABEL_OPACITY = 0.5
const LABEL_WIDTH = 50
const LABEL_HEIGHT = 25
const LABEL_COLOR = "#a00fff"
const BOTTOM_LABEL_BACKGROUND_PADDING = { left: 0, right: 8, top: 0, bottom: 10 };

export const XAxisLabel = ({ height, width }: AxisLabelProps) => {

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
                    fontColor={LABEL_COLOR}
                    width={100}
                    horizontalAnchor={'middle'}
                    backgroundPadding={BOTTOM_LABEL_BACKGROUND_PADDING}                            
                />
            </Annotation>
        </animated.g>
    );
}


export const YAxisLabel = ({ height, width }: AxisLabelProps) => {

    const labelStartX = 120
    const labelStartY = 50

    return (
        <div style={{ width: width, height:height }}>
            <svg height={height} width={width}>
                {({ height, width }) => {
                    return (
                        <Text 
                            x={labelStartX}
                            y={labelStartY}
                            verticalAnchor='start' 
                            textAnchor='middle'  
                            fontSize={24} 
                            fill={'white'}   
                            width={100}
                            height={100} 
                            style={{ fontSize: '1.5em' }}
                        />  

                    );
                }}
            </svg>
        </div>
    );
}

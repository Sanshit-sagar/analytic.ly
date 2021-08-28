import {
    Annotation,
    Label
} from '@visx/annotation'
import { animated } from  'react-spring'
import { Text } from '@visx/text'

export type AxisLabelProps = {
    height: number;
    width: number;
    start: number | string;
    end: number | string;
}

const LABEL_OPACITY = 0.5
const LABEL_WIDTH = 50
const LABEL_HEIGHT = 25
const BOTTOM_LABEL_BACKGROUND_PADDING = { left: 0, right: 8, top: 0, bottom: 10 };

export const XAxisLabel = ({ height, width, start, end }: AxisLabelProps) => {
    const LABEL_COLOR = 
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
                    subtitle={`${start} - ${end}`}
                    fontColor={LABEL_COLOR}
                    width={100}
                    horizontalAnchor={'middle'}
                    backgroundPadding={BOTTOM_LABEL_BACKGROUND_PADDING}                            
                />
            </Annotation>
        </animated.g>
    );
}


export const YAxisLabel = ({ height, width, start, end }: AxisLabelProps) => {

    const labelStartX = 50
    const labelStartY = 40

    return (
        <animated.g style={{ opacity: LABEL_OPACITY }}>
            <Annotation
               x={labelStartX}
               y={labelStartY}
               dx={LABEL_WIDTH}
               dy={LABEL_HEIGHT}
            >
                <Text 
                    x={labelStartX}
                    y={labelStartY}
                    verticalAnchor='start' 
                    textAnchor='middle'  
                    fontSize={24} 
                    fill={LABEL_COLOR}   
                    width={width}
                    height={height} 
                    style={{ 
                        fontSize: '1.5em', 
                        writingMode: 'vertical-lr', 
                        fontVariantNumeric: 'tabular-nums' 
                    }}
                >
                    hihihi
                </Text>             
            </Annotation>
        </animated.g>
    );
}
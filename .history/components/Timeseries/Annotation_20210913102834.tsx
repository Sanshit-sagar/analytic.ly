import {
    Annotation,
    Label
} from '@visx/annotation'
import { animated } from  'react-spring'
import { Text } from '@visx/text'

import { darkModeAtom } from '../../pages/index'
import { useAtom } from 'jotai'


export type AxisLabelProps = {
    height: number;
    width: number;
    start: number | string;
    end: number | string;
}

const LABEL_OPACITY = 0.8
const LABEL_WIDTH = 50
const LABEL_HEIGHT = 25
const BOTTOM_LABEL_BACKGROUND_PADDING = { left: 0, right: 8, top: 0, bottom: 10 };

export const XAxisLabel = ({ height, width, start, end }: AxisLabelProps) => {
    const [darkMode] = useAtom(darkModeAtom);

    const LABEL_COLOR = !darkMode ? 'rgba(255,255,255,1.0)' :'rgba(0,0,0,1.0)'
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
                    width={150}
                    horizontalAnchor={'middle'}
                    backgroundPadding={BOTTOM_LABEL_BACKGROUND_PADDING}                            
                />
            </Annotation>
        </animated.g>
    );
}


export const YAxisLabel = ({ height, width, start, end }: AxisLabelProps) => {
    const [darkMode] = useAtom(darkModeAtom);
    const LABEL_COLOR = !darkMode ? 'rgba(255,255,255,1.0)' :'rgba(0,0,0,1.0)'

    const labelStartX = 65
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
                    fill={LABEL_COLOR}   
                    width={width}
                    height={height} 
                    style={{ 
                        fontSize: '1.2em', 
                        writingMode: 'vertical-lr',
                        fontFamily: 'Arial',
                        color: !darkMode ? 'rgba(255,255,255,1.0)' :'rgba(0,0,0,1.0)'
                    }}
                >
                    CLICKS
                </Text>             
            </Annotation>
        </animated.g>
    );
}

interface IGraphDetailsProps {
    start: Date; 
    end: Date;
    duration: number;
    durationInMs: number;
    tickSizeInM 
}

export const GraphDetailsAnnotation = ({ details }: { details: IGraphDetailsProps }) => {


    return (

    )
}
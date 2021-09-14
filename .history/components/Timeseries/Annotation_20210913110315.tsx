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
    durationInMs: number;
    numIntervals: number; 
    tickSizeInMs: number; 
    cummulativeClicks: number;
    nonEmptyDatums: number;
    allDatums: number; 
}

export const GraphDetailsAnnotation = ({ details }: { details: IGraphDetailsProps }) => {

    const { 
        start, end, 
        durationInMs, 
        numIntervals, 
        tickSizeInMs, 
        cummulativeClicks, 
        nonEmptyDatums, 
        allDatums
    }: IGraphDetailsProps = details;

    const durationStr = `${durationInMs/(1000*60*60*24)} days`
    const intervalLenStr = `${tickSizeInMs/(1000*60*60*24)} days`
    const globalMean = `${cummulativeClicks/allDatums} clicks/day`
    const cherryPickedMean = `${cummulativeClicks/nonEmptyDatums} clicks/day`

    const detailedStats = [
        { id: 0, name: 'Earliest Datum', value: start },
        { id: 1, name: 'Latest Datum', value: end },
        { id: 2, name: 'Duration', value: durationStr },
        { id: 3, name: '# Intervals', value: numIntervals },
        { id: 4, name: 'Interval Length', value: intervalLenStr },
        { id: 5, name: 'Global Mean', value: globalMean },
        { id: 6: name: 'Cherry Picked Mean', value: cherryPickedMean },
        { id: 7: name: 'Max Score', value: maxScore },
        { id: 8,}
    ]; 

    const subtitle = `Showing data for ${detailedStats[0]} to ${detailedStats[1]} (~${duration} days).`
    const subtitle2 = `Your slugs averaged ${globalMean} during this, with a high of ${}

    return (
        <Annotation
            x={labelStartX}
            y={labelStartY}
            dx={LABEL_WIDTH}
            dy={LABEL_HEIGHT}
        >

            <Connector 
                stroke={orange} 
                type={connectorType} 
            />
            <Label
                showBackground={false}
                title={'Statistics'}
                subtitle={`Key features of this dataset`}
                fontColor={'indigo'}
                width={150}
                horizontalAnchor={'middle'}
                backgroundPadding={BOTTOM_LABEL_BACKGROUND_PADDING}  
            />
        </Annotation>
    )
}
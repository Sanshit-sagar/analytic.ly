import {
    Annotation,
    Label,
    Connector,

} from '@visx/annotation'
import { animated } from  'react-spring'
import { Text } from '@visx/text'

import { darkModeAtom } from '../../pages/index'
import { useAtomValue } from 'jotai/utils'
import { useDateFormatter } from '@react-aria/i18n'

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
    const darkMode = useAtomValue(darkModeAtom);

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
    const darkMode = useAtomValue(darkModeAtom);
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
    maxScore: number | number
    minScore: number | null
}

export const GraphDetailsAnnotation = ({ details }: { details: IGraphDetailsProps }) => {
    const darkMode  = useAtomValue(darkModeAtom);
    const formatter = useDateFormatter({ dateStyle: 'short', timeStyle: 'short' })

    const getDate = (time: number | undefined | null | Date) => !time ? null :                                                                    ? time : new Date(time)
    const formattedDate = (date: Date) => formatter.format(date)

    const labelStartX = 100
    const labelStartY = 35

    const { 
        start, end, 
        durationInMs, 
        numIntervals, 
        tickSizeInMs, 
        cummulativeClicks, 
        nonEmptyDatums, 
        allDatums,
        maxScore,
        minScore
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
        { id: 6, name: 'Cherry Picked Mean', value: cherryPickedMean },
        { id: 7, name: 'Max Score', value: maxScore },
        { id: 8, name: 'Min Score', value: minScore },
    ]; 

    const subtitle = `${formattedDate(getDate(detailedStats[0].value))} to ${formattedDate(getDate(detailedStats[1].value))}`

    return (
        <Annotation
            x={labelStartX}
            y={labelStartY}    
            dx={LABEL_WIDTH}
            dy={LABEL_HEIGHT}
        >
            <Connector 
                stroke={darkMode ? 'white' : 'indigo'} 
                type={'elbow'} 
            />
            <Label
                showBackground={true}
                title={'Statistics'}
                subtitle={`${subtitle}`}
                fontColor={darkMode ? 'indigo' : 'white'}
                width={150}
                horizontalAnchor={'middle'}
                backgroundPadding={BOTTOM_LABEL_BACKGROUND_PADDING}  
            />
        </Annotation>
    )
}
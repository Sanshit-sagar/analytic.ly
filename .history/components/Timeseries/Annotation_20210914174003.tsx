import { Annotation, Label } from '@visx/annotation'
import { Text } from '@visx/text'

import { darkModeAtom } from '../../pages/index'
import { useAtomValue } from 'jotai/utils'

import { useGloballyConsistentColors } from '../../hooks/useColors'
import { useFormattedDate } from '../../hooks/useDates'

export type AxisLabelProps = {
    height: number;
    width: number;
    start: number | string;
    end: number | string;
}

const LABEL_WIDTH = 50
const LABEL_HEIGHT = 25

export const XAxisLabel = ({ height, width, start, end }: AxisLabelProps) => {
    const colors = useGloballyConsistentColors()
    const labelStartX = width - 75
    const labelStartY = height - 75

    return (
        <Annotation
            x={labelStartX}
            y={labelStartY}
            dx={LABEL_WIDTH}
            dy={LABEL_HEIGHT}
        >
            <Label
                showBackground={false}
                title={`TIME`}
                subtitle={`${start} to ${end}`}
                fontColor={colors.text}
                width={300}
                horizontalAnchor={'middle'}                     
            />
        </Annotation>
    );
}


export const YAxisLabel = ({ height, width, start, end }: AxisLabelProps) => {
    const colors = useGloballyConsistentColors()

    const labelStartX = 65
    const labelStartY = 40

    return (
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
                fill={colors.text}   
                width={width}
                height={height} 
                style={{ 
                    fontSize: '1.2em', 
                    writingMode: 'vertical-lr',
                    fontFamily: 'Arial',
                    color: colors.text
                }}
            >
                CLICKS
            </Text>             
        </Annotation>
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
    const colors = useGloballyConsistentColors()

    const getDate = (time: number | string | Date | null) => !time ? new Date() : new Date(time)
    const formattedDate = (date: Date) => useFormattedDateRange(getDate(detailedStats[0].value, getDate(detailedStats[1].value))


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

    const durationStr = `~${Math.round(durationInMs/(1000*60*60*24))} days`
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

    const startStr = `${formattedDate(getDate(detailedStats[0].value))}`
    const endStr = `${formattedDate(getDate(detailedStats[1].value))}`
    const subtitle = `${startStr} to ${endStr} (${durationStr})`

    return (
        <Annotation
            x={200}
            y={100}    
            dx={100}
            dy={100}
        >
            <Label
                showBackground={true}
                title={'Statistics'}
                subtitle={subtitle}
                fontColor={colors.text}
                width={400}
                horizontalAnchor={'middle'}
            />
        </Annotation>
    )
}
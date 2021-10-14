import { Text } from '@visx/text'
import { Annotation, Label } from '@visx/annotation'
import { useGloballyConsistentColors } from '../../hooks/useColors'

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

export const YAxisLabel = ({ height, width }: AxisLabelProps) => {
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

// interface IGraphDetailsProps {
//     start: Date; 
//     end: Date;
//     durationInMs: number;
//     numIntervals: number; 
//     tickSizeInMs: number; 
//     cummulativeClicks: number;
//     nonEmptyDatums: number;
//     allDatums: number; 
//     maxScore: number | number
//     minScore: number | null
// }

export const GraphDetailsAnnotation = () => {
    const colors = useGloballyConsistentColors()

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
                subtitle={'subtitle here'}
                fontColor={colors.text}
                width={400}
                horizontalAnchor={'middle'}
            />
        </Annotation>
    )
}
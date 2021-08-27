import { 
    Label, 
    Connector, 
    CircleSubject, 
    LineSubject, 
    Annotation 
} from '@visx/annotation';


import { AnnotationProps } from './interfaces'


const AnnotationComponent = ({
    width = 100,
    height = 40,
    compact = true
 }: AnnotationProps) => {

    return (
        <Annotation
            height={height}
            width={width}
            x={x}
            y={y}
            dx={width}
            dy={height}
        >
            <Connector stroke={'orange'} />
            <Label
                 backgroundFill="white"
                 showAnchorLine={true}
                 anchorLineStroke={ ''
                 backgroundProps={{ stroke: 'green' }}
                 fontColor={'black'}
                 horizontalAnchor={true}
                 subtitle={'SUBTITLE GOES HERE'}
                 title={'TITLE GOES HERE'}
            >
                <LineSubject
                    orientation={'horizontal'}
                    stroke={'orange'}
                    min={0}
                    max={100}
                />
            </Label>

        </Annotation>
    )
}
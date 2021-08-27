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
    x,
    y 
 }: ) => {

    return (
        <Annotation
            height={40}
            width={100}
            x={x}
            y={y}
            dx={100}
            dy={40}
        >
            <Connector stroke={'orange'} />
            <Label
                 backgroundFill="white"
                 showAnchorLine={showAnchorLine}
                 anchorLineStroke={greens[2]}
                 backgroundProps={{ stroke: greens[1] }}
                 fontColor={greens[2]}
                 horizontalAnchor={horizontalAnchor}
                 subtitle={subtitle}
                 title={title}
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
import { 
    Label, 
    Connector, 
    CircleSubject, 
    LineSubject, 
    Annotation 
} from '@visx/annotation';


import { AnnotationProps } from './interfaces'


const AnnotationComponent = ({ x: number, y: number }) => {

    return (
        <Annotation
            height={40}
            width={100}
            x={x}
            y={y}
            dx={100}
            dy={40}
        />
    )
}
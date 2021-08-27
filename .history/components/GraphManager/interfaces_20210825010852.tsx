import { AxisScale } from '../'

interface LineChartProps {
    data: Datum;
    width: number;
    yMax: number;
    margin: MarginProps;
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    hideBottomAxis: boolean;
    hideLeftAxis: boolean;
    stroke: string;
    top: number;
    left: number;
    yTickFormat: string;
    children: any; 
}
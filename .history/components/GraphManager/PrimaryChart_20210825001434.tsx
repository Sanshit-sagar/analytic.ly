import React from 'react'
import { PrimaryChartProps } from './ClickHistory'

const PrimaryChart: React.FC<PrimaryChartProps> = ({ 
    height,
    width,
    data,
    margin={ top: 0, left: 0, bottom: 0, right: 0 },
}) => {

    const yMax = height - margin.top - margin.bottom
    const xMax = width - margin.left - margin.right 
    
    return (
        <div style={{ position: 'relative', margin: '0 0 1rem'}}
    );
}


export default PrimaryChart
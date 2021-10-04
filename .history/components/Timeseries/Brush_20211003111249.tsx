import React, { useState, useRef, useEffect } from 'react'
import { styled } from '../../stitches.config'

import Controller from './Controller'
import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'

import useDims from '../../hooks/useDims'

import { useAtomValue } from 'jotai/utils'
import { timeseriesAtom } from '../../atoms/timeseries'

const BrushWrapper = styled('div', {
    backgroundColor: '$loContrast', 
    height: '600px', 
    width: '1100px', 
    border: '2px solid $accent',
    br: '$2',
    overflowY: 'hidden', 
    overflowX: 'hidden',
    pt: '$1',
});

interface ChartDims {
    height: number;
    width: number; 
}

const PrimaryChartHoc = ({ height, width }: ChartDims) => {
    
    return (
        <PrimaryChart
            height={height}
            width={width}
            margin={pr}
        />
    )
}

const SecondaryChartHoc = ({ height, width }: ChartDims) => {
    const timeseries = useAtomValue(timeseriesAtom)

    return (
        <SecondaryChart
            data={timeseries}
            minTimestamp={timeseries[0].timestamp}
            height={height}
            width={width}
            margin={{
                top: 0,
                right: 16,
                bottom: 24,
                left: 30,
            }}
        />
    );
}

const Brush = () => {
    const gridItemRef = useRef<HTMLDivElement>(null);
    const [ boxWidth, setBoxWidth ] = useState<number>(0);
    const { height } = useDims()

    useEffect(() => {
        const handleResize = (width?: number) => setBoxWidth(width || 0)
        handleResize(gridItemRef.current?.clientWidth || 0)
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0))

        return () => window.removeEventListener("resize", () => handleResize())
    }, [gridItemRef])

    return (
        <BrushWrapper ref={gridItemRef}>
            <Controller /> 
            <PrimaryChartHoc height={Math.floor(height * 0.55)} width={boxWidth} />
            <SecondaryChartHoc height={Math.floor(height * 0.15)} width={boxWidth} />
        </BrushWrapper>
    )
}

export default Brush
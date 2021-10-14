import React, { useState, useRef, useEffect } from 'react'
import { styled } from '../../stitches.config'

import Controller from './Controller'
import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'

import useDims from '../../hooks/useDims'

import { useAtomValue } from 'jotai/utils'
import { timeseriesAtom } from '../../atoms/timeseries'

const BrushWrapper = styled('div', {
    height: 600,
    width: 1400,
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    fd: 'column',
    jc: 'space-between',
    ai: 'stretch',
    gap: 0,
    padding: '$1',
    margin: '$1',
    bc: 'transparent',
});

interface ChartDims {
    height: number;
    width: number; 
}

const primaryChartMargins = { top: 16, right: 24, bottom: 30, left: 30 };
const secondaryChartMargins = { top: 0, right: 16, bottom: 24, left: 30 };

const PrimaryChartHoc = ({ height, width }: ChartDims) => {
    
    return (
        <PrimaryChart
            height={height}
            width={width}
            margin={primaryChartMargins}
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
            margin={secondaryChartMargins}
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
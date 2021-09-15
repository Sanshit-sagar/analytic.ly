import React, { useState, useRef, useEffect, useContext } from 'react'
import { styled } from '../../stitches.config'

import useDims from '../../hooks/useDims'
import { MarketContext } from '../../store/MarketProvider'
import { Text } from '../../primitives/Text'

import { BrushChartProps } from './interfaces'

import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'
import Controller from './Controller'

const BrushWrapper = styled('div', {
    backgroundColor: '$loContrast', 
    height: '600px', 
    width: '1100px', 
    border: '2px solid $border',
    br: '$2',
    overflowY: 'hidden', 
    overflowX: 'hidden',
    pt: '$1',
    '&:hover': {
        borderColor: '$border3',
    },
    '&:focus': {
        borderColor: '$funky'
    }
});

const Brush = ({ loading, error, mappedData, details }: BrushChartProps) => {
    // const { filteredDataState: { filteredData } } = useContext(MarketContext);
    const filteredData = useAtomValue(filteredData)

    const gridItemRef = useRef<HTMLDivElement>(null);
    const [boxWidth, setBoxWidth] = useState<number>(0);
    const { height } = useDims()

    useEffect(() => {
        const handleResize = (width?: number) => { setBoxWidth(width || 0) };

        handleResize(gridItemRef.current?.clientWidth || 0);
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0));

        return () => { 
            window.removeEventListener("resize", () => handleResize()) 
        };
    }, [gridItemRef]);
details

    return (
        <BrushWrapper ref={gridItemRef}>
            <Controller /> 
            <PrimaryChart
                data={filteredData}
                details={details}
                loading={loading}
                error={error}
                height={Math.floor(height * 0.55)}
                width={boxWidth}
                margin={{
                    top: 16,
                    right: 24,
                    bottom: 30,
                    left: 30,
                }}
            />
            <SecondaryChart
                data={mappedData}
                details={details}
                loading={loading}
                error={error}
                height={Math.floor(height*0.15)}
                width={boxWidth}
                margin={{
                    top: 0,
                    right: 16,
                    bottom: 24,
                    left: 30,
                }}
            />
        </BrushWrapper>
    )
}

export default Brush
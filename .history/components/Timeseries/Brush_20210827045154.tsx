import React, { useState, useRef, useEffect, useContext } from 'react'

import useDims from '../../hooks/useDims'
import { MarketContext } from '../../store/MarketProvider'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { BrushChartProps } from './interfaces'
import { GraphSkeleton } from '../Skeletons'
import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'
import Controller from './Controller'

export const BACKGROUND = '#04002b';
const Brush = ({ loading, error, mappedData, details }: BrushChartProps) => {
    const { filteredDataState: { filteredData } } = useContext(MarketContext);

    const gridItemRef = useRef<HTMLDivElement>(null);
    const [boxWidth, setBoxWidth] = useState<number>(0);
    const { height } = useDims()

    useEffect(() => {
        const handleResize = (width?: number) => { setBoxWidth(width || 0) };

        handleResize(gridItemRef.current?.clientWidth || 0);
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0));

        return () => { window.removeEventListener("resize", () => handleResize()) };
    }, [gridItemRef]);

    if(loading) return <GraphSkeleton /> 
    if(error) return <Text> Error! </Text>
    if(!mappedData?.length) return <Text> No data to show </Text>

    return (
        <Box ref={gridItemRef} css={{ br: '$2', backgroundColor: BACKGROUND, height: '600px', width: '1000px' }}>
            <Controller />
            <PrimaryChart
                data={filteredData}
                details={details}
                loading={loading}
                height={Math.floor(height * 0.55)}
                width={boxWidth}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 30,
                    left: 36,
                }}
            />
            <SecondaryChart
                 data={mappedData}
                 height={Math.floor(height*0.15)}
                 width={boxWidth}
                 margin={{
                      top: 0,
                      right: 16,
                      bottom: 24,
                      left: 48,
                }}
            />
        </Box>
    )
}

export default Brush
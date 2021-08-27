import React, { useState, useRef, useEffect, useContext } from 'react'

import useDims from '../../hooks/useDims'
import { MarketContext } from '../../store/MarketProvider'
import { Text } from '../../primitives/Text'

import { BrushChartProps } from './interfaces'
import { GraphSkeleton } from '../Skeletons'
import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'

export const background = '#04002b';
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
        <div ref={gridItemRef} style={{ height: '650px', width: '1000px' }}>
            <PrimaryChart
                data={filteredData}
                details={details}
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
            {/* <Text> Filtered Data: {JSON.stringify(filteredData)} </Text> */}
        </div>
    )
}

export default Brush
import React, { useState, useRef, useEffect } from 'react'


import { Text } from '../../components/Text'

import { BrushChartProps } from './ClickHistory'
import { GraphSkeleton } from '../Skeletons'

import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'


const Brush = ({ height, width, data, details, margin }: BrushChartProps) => {
    const [boxWidth, setBoxWidth] = useState<number>(0);
    const gridItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = (width?: number) => { setBoxWidth(width || 0) };

        handleResize(gridItemRef.current?.clientWidth || 0);
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0));

        return () => { window.removeEventListener("resize", () => handleResize()) };
    }, [gridItemRef]);

    if(loading) return <GraphSkeleton /> 
    if(!data?.length
    if(error) return <Text> Error! </Text>

    return (
        <>
            <PrimaryChart
                data={data}
                details={details}
                height={Math.floor(height * 0.4)}
                width={boxWidth}
                margin={{
                    top: 0,
                    right: 16,
                    bottom: 24,
                    left: 48,
                }}
            />
            <SecondaryChart
                 data={data}
                 height={Math.floor(height*0.1)}
                 width={boxWidth}
                 margin={{
                      top: 0,
                      right: 16,
                      bottom: 24,
                      left: 48,
                }}
            />
        </>
    )
}

export default Brush
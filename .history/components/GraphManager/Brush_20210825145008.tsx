import React, { useState, useRef, useEffect } from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { BrushChartProps } from './interfaces'
import { GraphSkeleton } from '../Skeletons'
import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'


const Brush = ({ loading, error, data, details }: BrushChartProps) => {
    const [height] = useDims()
    const [boxWidth, setBoxWidth] = useState<number>(0);
    const gridItemRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleResize = (width?: number) => { setBoxWidth(width || 0) };

        handleResize(gridItemRef.current?.clientWidth || 0);
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0));

        return () => { window.removeEventListener("resize", () => handleResize()) };
    }, [gridItemRef]);

    if(loading) return <GraphSkeleton /> 
    if(error) return <Text> Error! </Text>
    if(!data?.length) return <Text> No data to show </Text>

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <PrimaryChart
                data={data}
                details={details}
                height={Math.floor(height * 0.4)}
                width={boxWidth}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 40,
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
        </Flex>
    )
}

export default Brush
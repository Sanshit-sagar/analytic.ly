import React, { useRef, useEffect } from 'react'

import { BrushChartProps } from './ClickHistory'

import PrimaryChart from './PrimaryChart'
import SecondaryChart from './SecondaryChart'


const Brush = ({ height, width, data, details, margin }: BrushChartProps) => {
    const gridItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = (width?: number) => { setBoxWidth(width || 0) };

        handleResize(gridItemRef.current?.clientWidth || 0);
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0));

        return () => { window.removeEventListener("resize", () => handleResize()) };
    }, [gridItemRef]);

    return (
        <PrimaryChart
        data={mappedData}
        details={graphDetails}
        height={height}
        width={width}
        margin={DEFAULT_MARGIN}
        />
        <SecondaryChart
           data={mappedData}
           height={height}
           width={width}
           margin={DEFAULT_MARGIN}
        />
        
    )
}

export default Brush
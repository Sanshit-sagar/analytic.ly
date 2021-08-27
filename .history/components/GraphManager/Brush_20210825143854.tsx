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
            height={Math.floor(height * 0.4)}
            width={boxWidth}
            margin={DEFAULT_MARGIN}
        />
        <SecondaryChart
           data={mappedData}
           height={Math.floor(height*0.1)}
           width={boxWidth}
           margin={{
            top: 0,
            right: 16,
            bottom: 24,
            left: 48,
          }}
        />
        
    )
}

export default Brush
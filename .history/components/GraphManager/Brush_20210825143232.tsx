import React, { useRef, useEffect } from 'react'


const Brush = () => {
    const gridItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = (width?: number) => {
          setBoxWidth(width || 0);
        };
    
        handleResize(gridItemRef.current?.clientWidth || 0);
        window.addEventListener("resize", () => handleResize(gridItemRef?.current?.clientWidth || 0));
    
        return () => { window.removeEventListener("resize", () => handleResize()) };
    }, [gridItemRef]);

    return (
        
    )
}

export default Brush
import { css } from '../../stitches.config'

import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"

import { Box } from '../../primitives/Box'
import { useGloballyConsistentColors } from '../../hooks/useColors' 

const override = css({
    display: 'inline-block',
    margin: '0 auto',
    borderColor: 'red',
}); 

export const CustomLoader: React.FC<{}> = () => {
    const colors = useGloballyConsistentColors()
    const [color, setColor] = useState(colors.accent)

    useEffect(() => {
        setColor(colors.accent), 
    }, [colors.className, colors.accent, color, loading])

    return (
        <div className="sweet-loading">
            <ClipLoader 
                loading={true} 
                color={color} 
                size={150} 
                css={override} 
            /> 
        </div>
    );
}
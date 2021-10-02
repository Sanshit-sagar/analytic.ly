import { css } from '../../stitches.config'

import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { useGloballyConsistentColors } from '../../hooks/useColors' 

const override = css({
    display: 'inline-block',
    margin: '0 auto',
    borderColor: 'red',
}); 

const CustomLoader = () => {
    const colors = useGloballyConsistentColors()
    const [loading, setColor] = useState(false)
    const [color, setColor] = useState(colors.accent)

    useEffect(() => {
        setColor(colors.accent), 
    }, [colors.className, colors.accent, color, loading])

    return (
        <Box className="sweet-loading">
            <ClipLoader 
                loading={loading} 
                color={color} 
                size={150} 
                css={override} 
            /> 
        </div
    );
}
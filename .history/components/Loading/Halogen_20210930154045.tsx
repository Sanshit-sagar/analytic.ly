import { css } from '../../stitches.config'

import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"

import { useGloballyConsistentColors } from '../../hooks/useColors' 


export const Loading: React.FC<{}> = () => {
    const colors = useGloballyConsistentColors()
    const [color, setColor] = useState(colors.accent)

    useEffect(() => {
        setColor(colors.accent);
    }, [colors.THEME_NAME, colors.accent, color])

    return (
        <div className="sweet-loading">
            <ClipLoader 
                loading={true} 
                color={color} 
                size={25} 
                css={{
                    display: 'block',
                    margin: '0 auto',
                    borderColor: colors.funkyText,
                }} 
            /> 
        </div>
    );
}
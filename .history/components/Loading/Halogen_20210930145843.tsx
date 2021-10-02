
import React, { useState, useEffect } from 'react'
import { css } from '../../stitches.config'
import ClipLoader from "react-spinners/ClipLoader"

const override = css({
    
})

const CustomLoader = () => {
    const colors = useGloballyConsistentColors()
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState(colors.accent)

    useEffect(() => {
        setColor(colors.accent), 
    }, [colors.className, colors.accent, color, loading])
}

import React, { useState, useEffect } from 'react'
import { css } from '../../stitches.config'
import ClipLoader from "react-spinners/ClipLoader"

const override = css({

})

const CustomLoader = () => {
    const colors = useGloballyConsistentColors()
    const [loading, setColor] = useState(false)
    const [color, setColor] = useState(colors.accent)

    useEffect(() => {
        setColor(colors.accent), 
    }, [colors.className, colors.accent, color, loading])

    return (

        <ClipLoader loading={loading} color={color} size={150}
    )
}
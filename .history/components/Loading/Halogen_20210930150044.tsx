
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
        <div className="sweet-loading">
            <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
                <ClipLoader loading={loading} color={color} size={150} css={override} /> 
            </button>
        </div
    )
}
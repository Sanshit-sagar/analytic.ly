
import React, { useState } from 'react'
import { css } from '../../stitches.config'
import ClipLoader from "react-spinners/ClipLoader"

const CustomLoader = () => {
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState(colors.accent)

    useEffect(() => setColor(colors.accent), [colors.className, colors.accent])
}
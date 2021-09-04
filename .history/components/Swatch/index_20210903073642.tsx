import React from 'react'

import {
    Popover,
    PopoverTrigger,
    PopoverClose
} from '../../primitives/'

const Swatch = () => {
    const handleThemeChange = (event) => {
        alert(`Theme changed to ${event.currentTarget.id}`)
    }

    return (
        <>
        <button id='theme1_id' value='theme1_value' onClick={handleThemeChange} css={{ bc: 'white', color: 'black' }}> 
            theme1
        </button>
        <button id='theme2_id' value='theme2 value' onClick={handleThemeChange} css={{ bc: 'white', color: 'black' }}>
            theme2 
        </button>
        </>
    )
}

export default Swatch
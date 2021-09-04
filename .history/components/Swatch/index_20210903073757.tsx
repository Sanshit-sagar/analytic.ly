import React from 'react'
import { styled, keyframes } from '../../stitches.config'
import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose
} from '../../primitives/Popover'

const Swatch = () => {
    const handleThemeChange = (event) => {
        alert(`Theme changed to ${event.currentTarget.id}`)
    }

    return (
        
        <Popover>
            <button id='theme1_id' value='theme1_value' onClick={handleThemeChange} css={{ bc: 'white', color: 'black' }}> 
                theme1
            </button>
        </Popover>
    )
}

export default Swatch
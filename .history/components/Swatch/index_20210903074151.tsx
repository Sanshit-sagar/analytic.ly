import React from 'react'

import { Text } from '../../primitives/Text'
import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose
} from '../../primitives/Popover'
import { CrossCircledIcon } from '@radix-ui/react-icons'

const Swatch = () => {
    const handleThemeChange = (event) => {
        alert(`Theme changed to ${event.currentTarget.id}`)
    }

    return (
        
        <Popover>
            <PopoverTrigger>
                <button 
                    id='theme1_id' 
                    value='theme1_value' 
                    onClick={handleThemeChange} 
                    css={{ bc: 'white', color: 'black' }}
                > 
                    theme1
                </button>
            </PopoverTrigger>

            <PopoverContent>
                <Text as='span'> yoyoyoyo </Text>
            

                <PopoverClose>
                    <CrossCircledIcon />
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

export default Swatch
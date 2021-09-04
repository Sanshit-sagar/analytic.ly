import React from 'react'

import { Text } from '../../primitives/Text'
import { IconButton } from '../../primitives/IconButton'
import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose
} from '../../primitives/Popover'
import { CrossCircledIcon, LayersIcon } from '@radix-ui/react-icons'

const Swatch = () => {

    return (
        
        <Popover>
            <PopoverTrigger>
                <IconButton 
                    id='theme1_id' 
                    css={{ bc: 'white', color: 'black' }}
                > 
                    <Icon label={`theme-selector`}>
                        <LayersIcon />
                    </Icon>
                </IconButton>
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
import React from 'react'

import { Text } from '../../primitives/Text'
import { Icon } from '../../primitives/Icon'
import { IconButton } from '../../primitives/IconButton'

import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose
} from '../../primitives/Popover'
import { CrossCircledIcon, LayersIcon } from '@radix-ui/react-icons'

const ThemeSelectionButton = styled('')

const Swatch = () => {

    return (
        
        <Popover>
            <PopoverTrigger>
                <IconButton 
                    id='theme1_id' 
                    variant='raised'
                    css={{ mr: '$5', bc: '$hiContrast', borderColor: '$funky', color: '$funky', '&:hover': { bc: '$accentHover',
                    olid', borderColor: '$border3' }}
                > 
                    <Icon label={`theme-selector`}>
                        <LayersIcon />
                    </Icon>
                </IconButton>
            </PopoverTrigger>

            <PopoverContent>
                <Text as='span' css={{ color: '$text' }}> yoyoyoyo </Text>
            

                <PopoverClose>
                    <CrossCircledIcon />
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

export default Swatch
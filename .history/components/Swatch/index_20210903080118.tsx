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

const ThemeSelectorBase = () => (<IconButton 

const ThemeSelectionButton = styled(IconButton, {
    mr: '$5', 
    bc: '$hiContrast', 
    borderColor: '$funky', 
    color: '$funky', 
    '&:hover': { 
        bc: '$accentHover',
        border: 'thin solid',
        borderColor: '$border3',
    } 
})

const Swatch = () => {

    return (
        
        <Popover>
            <PopoverTrigger>
                <IconButton 
                    id='theme1_id' 
                    variant='raised'
                    
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
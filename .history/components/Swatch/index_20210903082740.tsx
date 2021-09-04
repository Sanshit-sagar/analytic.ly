import React from 'react'
import { styled } from '../../stitches.config'

import { Text } from '../../primitives/Text'
import { Icon } from '../../primitives/Icon'
import { IconButton } from '../../primitives/IconButton'

import {
    Popover,
    PopoverContent, 
    PopoverTrigger,
    PopoverClose
} from '../../primitives/Popover'

import { 
    CrossCircledIcon,
    LayersIcon 
} from '@radix-ui/react-icons'

import { atom, useAtom } from 'jotai'

const ThemeSelectorBase = () => (
    <IconButton 
        size='1'
        variant='raised'
    />
);

const ThemeSelectionButton = styled(ThemeSelectorBase, {
    backgroundColor: 'red', 
    '&:hover': { 
        backgroundColor: 'purple'
    } 
});

const activeThemeAtom = atom({ name: '', accent: '', panel: '', canvas: '', hasDark: true });

const Swatch = () => {
    const [activeTheme, setActiveTheme] = useAtom(activeThemeAtom)

    return (
        
        <Popover>
            <PopoverTrigger>
                <IconButton>
                <LayersIcon />
            </PopoverTrigger>

            <PopoverContent>
                <Text 
                    as='span' 
                    css={{ color: '$text' }}
                > 
                    yoyoyoyo 
                </Text>

                <PopoverClose>
                    <Icon label={`Close dialog`}>
                        <CrossCircledIcon />
                    </Icon>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}

export default Swatch
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps } from '@radix-ui/react-icons/dist/types'

import { Icon } from '../primitives/Icon'
import { Tooltip } from '../primitives/Tooltip'
import { IconButton } from '../primitives/IconButton'

import { ChevronDownIcon } from '@radix-ui/react-icons'

interface IIconButtonWithTooltipProps {
    label: string; 
    onClick: () => void; 
    icon: Element | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> | undefined; 
    buttonProps?: React.HTMLAttributes<React.HTMLButtonElement>; 
}

export const IconButtonWithTooltip = ({ label, onClick, icon, buttonProps }: IIconButtonWithTooltipProps) => {

    return (
        <Tooltip content={label}>
            <IconButton
                size='1' 
                variant='ghost'
                onClick={onClick}
            >
                <Icon label={label}>
                    {icon}
                </Icon>
            </IconButton>
        </Tooltip>
    )
}


export const OpenMenuIconButton = () => {
    
    return (
        <Tooltip content={label}>
        <IconButton
             
             variant='ghost'
             ref={buttonRef}
         >
            <Icon label={'Open menu'}>
                 <ChevronDownIcon />
            </Icon>
         </IconButton>
         </Tooltip>
    )
}

import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

import { Icon } from '../primitives/Icon'
import { Tooltip } from '../primitives/Tooltip'
import { IconButton } from '../primitives/IconButton'
import { IconProps } from '@radix-ui/react-icons/dist/types'


interface IIconButtonWithTooltipProps {
    label: string; 
    onClick: () => void; 
    icon: Element | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> | undefined; 
}

export const IconButtonWithTooltip = ({ label, onClick, icon }: IIconButtonWithTooltipProps) => {

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


import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps } from '@radix-ui/react-icons/dist/types'

import { Icon } from '../primitives/Icon'
import { Tooltip } from '../primitives/Tooltip'
import { IconButton } from '../primitives/IconButton'

import { ChevronDownIcon } from '@radix-ui/react-icons'

interface IIconButtonWithTooltipProps {
    label: string; 
    onClick?: () => void; 
    variant?: string;
    icon: Element | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>> | undefined; 
    buttonProps?: React.HTMLAttributes<HTMLButtonElement>; 
    buttonRef?: React.MutableRefObject;
}

export const IconButtonWithTooltip = ({ 
    label, 
    onClick, 
    variant = 'ghost', 
    icon, 
    buttonProps, 
    buttonRef 
}: IIconButtonWithTooltipProps) => {

    return (
        <Tooltip content={label}>
            <IconButton
                size='1' 
                variant='ghost'
                onClick={onClick}
                {...buttonProps}
            >
                <Icon label={label}>
                    {icon}
                </Icon>
            </IconButton>
        </Tooltip>
    )
}


export const OpenMenuIconButton = ({ 
    variant,
    buttonProps, 
    buttonRef 
}: { 
    variant?: string;
    buttonProps: React.HTMLAttributes<HTMLButtonElement>; 
    buttonRef: React.MutableRefObject<>; 
}) => {

    return (
        <IconButtonWithTooltip 
            label={'Open Menu'} 
            icon={<ChevronDownIcon />} 
            variant={variant}
            buttonRef={buttonRef} 
            buttonProps={buttonProps}
        />
    );
}

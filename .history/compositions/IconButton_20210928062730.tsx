import React from 'react'

import { Icon } from '../primitives/Icon'
import { Tooltip } from '../primitives/Tooltip'
import { IconButton } from '../primitives/IconButton'

import { ChevronDownIcon } from '@radix-ui/react-icons'

type IButtonVariantType = 'ghost' | 'raised' | undefined

enum IButtonVariantEnum {
    GHOST = 'ghost',
    RAISED = 'raised',
};

interface IIconButtonWithTooltipProps {
    label: string; 
    onClick?: () => void; 
    variant: string;
    icon: React.ReactElement;
    buttonProps?: React.HTMLAttributes<HTMLButtonElement>; 
    buttonRef?: React.MutableRefObject<HTMLButtonElement | null>; 
}

export const IconButtonWithTooltip = ({ 
    label, 
    onClick, 
    variant,
    icon, 
    buttonProps, 
    buttonRef 
}: IIconButtonWithTooltipProps) => {

    return (
        <Tooltip content={label}>
            <IconButton
                size='1' 
                ref={buttonRef}
                variant={variant}
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
    variant = IButtonVariantEnum.GHOST,
    buttonProps, 
    buttonRef 
}: { 
    variant: IButtonVariantType; 
    buttonProps: React.HTMLAttributes<HTMLButtonElement>; 
    buttonRef: React.MutableRefObject<HTMLButtonElement | null>; 
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


const ToolbarIconButton = ({ icon, label, onClick }) => {

    return (
        <IconButton size='2' variant='ghost' onClick={onClick}>
            <Icon label={label}>
                <Text css={{ color: '$text'}}
                {icon} 
            </Icon>
        </IconButton>
    )
}
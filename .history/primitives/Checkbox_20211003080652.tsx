import { styled } from '@stitches/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    width: 15,
    height: 15,
    borderRadius: '$1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid $border',
    '&:hover': { 
        backgroundColor: '$accent',
        borderColor: '$border3'
    },
    '&:focus': { 
        border: '1px solid $border'
    },
})

interface CheckboxExtProps {
    isSelected: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isRequired: boolean;
    isIndeterminate: boolean;
    isReadOnly: boolean; 
}; 

const StyledCheckboxExt = ({ 
    isSelected, 
    isFocused, 
    isDisabled, 
    isRequired,
    isIndeterminate,
    isReadOnly
}: CheckboxExtProps) => {
    return (
        <StyledCheckbox
            css={{
                color: isSelected ? '$funkyText' : '$accent',
                borderWidth: isFocused || isDisabled  || isReadOnly || isRequired || isIndeterminate ? '1px' : '1.1px',
                backgroundColor: isSelected ? 'green' : 'transparent'
            }}
        />
    )
}

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: 'red'
})

export const Checkbox = StyledCheckboxExt
export const CheckboxIndicator = StyledIndicator


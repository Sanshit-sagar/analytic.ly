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
        borderColor: '$',
    },
    '&:focus': { 
        border: '1px solid $border'
    },
})

interface CheckboxExtProps {
    checked: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isRequired: boolean;
    isIndeterminate: boolean;
    isReadOnly: boolean; 
}; 

const StyledCheckboxExt = ({ 
    checked, 
    isFocused, 
    isDisabled, 
    isRequired,
    isIndeterminate,
    isReadOnly
}: CheckboxExtProps) => {

    return (
        <StyledCheckbox
            css={{
                color: checked ? '$funkyText' : '$accent',
                borderWidth: isFocused || isDisabled  || isReadOnly || isRequired || isIndeterminate ? '1px' : '1.1px',
                backgroundColor: checked ? '$funky' : isFocused ? '$accent' : isDisabled ? '$loContrast' : '$panel'
            }}
        />
    )
}

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: 'red'
})

export const Checkbox = StyledCheckboxExt
export const CheckboxIndicator = StyledIndicator


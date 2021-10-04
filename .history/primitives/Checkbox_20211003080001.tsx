import { styled } from '@stitches/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: 'transparent',
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

const StyledCheckboxExt = ({ 
    isSelected, 
    isFocused, 
    isDisabled, 
    isRequired,
    isIndeterminate,
    isReadOnly
}) => {
    return (
        <StyledCheckbox
            css={{
                color: isSelected ? '$funkyText' : '$accent',
                borderWidth: isFocused || isDisabled  || isReadOnly || isRequired || isIndeterminate ? 
            }}
        />
    )
}

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: '$accent'
})

export const Checkbox = StyledCheckbox
export const CheckboxIndicator = StyledIndicator


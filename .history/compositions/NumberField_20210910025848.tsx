
import React, { useRef } from 'react'

import { useLocale } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'
import { useNumberField } from '@react-aria/numberfield'
import { useNumberFieldState } from '@react-stately/numberfield'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { IconButton } from '../primitives/IconButton'
import { ControlGroup, Label, Input } from '../primitives/FieldSet'


export const NumberField = (props) => {
    const props = {...numberFieldProps}

    let { locale } = useLocale();
    let state = useNumberFieldState({...props, locale});

    const inputRef = React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>()
    const incrRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>()
    const decrRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>()
   

    let {
        labelProps,
        groupProps,
        inputProps,
        incrementButtonProps,
        decrementButtonProps
    } = useNumberField(props, state, inputRef); 

    let {buttonProps: incrementProps} = useButton(incrementButtonProps, incrRef);
    let {buttonProps: decrementProps} = useButton(decrementButtonProps, decrRef);  

    return (
        <ControlGroup>
            <Label {...labelProps}>
                {label}
            </Label>
            <div {...groupProps}>
                <IconButton {...decrementProps} ref={incrRef}>
                    <MinusIcon />
                </IconButton>
                <Input {...inputProps} ref={inputRef} />
                <IconButton {...incrementProps} ref={decrRef}>
                    <PlusIcon />
                </IconButton>
            </div>
        </ControlGroup>
    );
}
 
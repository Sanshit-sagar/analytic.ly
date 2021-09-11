
import React, { useRef, MutableRefObject } from 'react'

import { useNumberField } from '@react-aria/numberfield'

import { useNumberFieldState } from '@react-stately/numberfield'
import { useLocale } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { IconButton } from '../primitives/IconButton'
import { ControlGroup, Label, Input } from '../primitives/FieldSet'

interface INumberFieldProps {
    label: string | undefined | null; 
    numberFieldProps?: any[] | null | undefined;
    inputRef: RefObject<HTMLInputElement> | undefined;
}

export const NumberField = ({ label = '', numberFieldProps, inputRef }: INumberFieldProps) => {
    const props = numberFieldProps;

    let { locale } = useLocale();
    const incrRef: React.RefObject<HTMLAnchorElement> = useRef<HTMLButtonElement> ()
    const decrRef: React.RefObject<HTMLAnchorElement> = useRef<HTMLButtonElement>()
    let state = useNumberFieldState({...props, locale});

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
 
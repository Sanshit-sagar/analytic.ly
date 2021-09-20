import React, { useRef, RefObject } from 'react'

import { styled } from '../stitches.config'

import { useLocale } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'
import { useNumberField } from '@react-aria/numberfield'
import { useNumberFieldState } from '@react-stately/numberfield'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { IconButton } from '../primitives/IconButton'
import { ControlGroup, Label, Input } from '../primitives/FieldSet'

import { Flex } from '../primitives/Flex'

const NumberFieldControlGroup = styled(Flex, {
    width: '100%',
    display: 'flex',
    bc: 'transparent',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: 'thin solid $border',
    br: '$1',
    '&:hover': {
        borderColor: '$border3'
    }
})

const InputGroup = styled(Flex, {
    fd:'row',
    jc: 'flex-start', 
    ai: 'center',
    gap: '$1',
    margin: '$1',
}

export const NumberField = (props: any) => {
    let { locale } = useLocale();
    let state = useNumberFieldState({...props, locale});

    const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>()
    const incrRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>()
    const decrRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>()
   

    let {
        labelProps,
        groupProps,
        inputProps,
        incrementButtonProps,
        decrementButtonProps
    } = useNumberField(props, state, inputRef); 

    let { buttonProps: incrementProps } = useButton(incrementButtonProps, incrRef);
    let { buttonProps: decrementProps } = useButton(decrementButtonProps, decrRef);  

    return (
        <NumberFieldControlGroup>
            <Label {...labelProps}>
                {props.label}
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
        </NumberFieldControlGroup>
    );
}
 
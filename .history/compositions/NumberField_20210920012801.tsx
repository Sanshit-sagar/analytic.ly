import React, { useRef, RefObject } from 'react'

import { styled } from '../stitches.config'

import { useLocale } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'
import { useNumberField } from '@react-aria/numberfield'
import { useNumberFieldState } from '@react-stately/numberfield'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'

import { IconButton } from '../primitives/IconButton'
import { Label, Input } from '../primitives/FieldSet'
import { Tooltip } from '../primitives/Tooltip'

import { Flex } from '../primitives/Flex'

const ControlGroup = styled(Flex, {
    width: '100%',
    display: 'flex',
    bc: 'transparent',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1',
    padding: '$1',
    br: '$2',
});

const InputGroup = styled(Flex, {
    unset: 'all',
    height: 35,
    fd:'row',
    jc: 'flex-start', 
    ai: 'stretch',
    gap: '$1',
    margin: '$2',
    border: 'none',
    outline: 'none'
});

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
        <ControlGroup>
            <Label {...labelProps}> {props.label} </Label>

            <InputGroup {...groupProps}>
                <Tooltip content={'Decrement'}>
                    <IconButton {...decrementProps} ref={incrRef}>
                        <MinusIcon />
                    </IconButton>
                </Tooltip>

                <Input {...inputProps} ref={inputRef} />
                
                <Tooltip content={'Increment'}>
                    <IconButton {...incrementProps} ref={decrRef}>
                        <PlusIcon />
                    </IconButton>
                </Tooltip>
            </InputGroup>

        </ControlGroup>
    );
}
 
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
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { ValidationStateEnum } from './interfaces'

const ControlGroup = styled(Flex, {
    width: '100%',
    display: 'flex',
    bc: 'transparent',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$1',
    padding: '$1'
});

const InputGroup = styled(Flex, {
    unset: 'all',
    height: 35,
    fd:'row',
    jc: 'flex-start', 
    ai: 'stretch',
    gap: '$1',
    margin: '$1',
    border: 'none',
    outline: 'none'
});

interface IErrorMessage {
    validationState?: boolean;
    errorMessage?: string;
    errorMessageProps: React.HTMLAttributes<HTMLElement>;
}
interface IDescriptionProps {
    description: string;
    descriptionProps: React.HTMLAttributes<HTMLElement>;
}

interface NumberFieldAria {
    inputProps: React.HTMLAttributes<HTMLElement>;
    labelProps: React.HTMLAttributes<HTMLLabelElement>;
    incrementButtonProps: React.HTMLAttributes<HTMLButtonElement>;
    decrementButtonProps: React.HTMLAttributes<HTMLButtonElement>;
    errorMessageProps: React.HTMLAttributes<HTMLElement>; 
    descriptionProps: React.HTMLAttributes<HTMLElement>;
}

const MessageText = styled(Text, {
    width: '100%',
    display: 'flex',
    fd: 'row',
    jc: 'flex-start',
    ai: 'flex-end',
    gap: '$1',
    bc: 'transparent',
    color: '$text',
    fontSize: '$1',
    fontWeight: 'normal',
    fontStyle: 'lighter',
    '&:hover': {
        color: '$accent'
    }
});


const ErrorMessage = ({ validationState, errorMessage, errorMessageProps }: IErrorMessage) => (
    <MessageText 
        type='error'
        props={errorMessageProps} 
        css={{ color: validationState!==ValidationStateEnum.VALID ? 'red' : errorMessage?.length ? 'green' : 'transparent'}}
    >
        {errorMessage}
    </MessageText>
)

const Description = ({ description, descriptionProps }: IDescriptionProps) => (
    <MessageText
        props={descriptionProps}
        message={description}
        type='description'
    >
        {description}
    </MessageText> 
); 

const TooltipIcon = ({ }) => {
    return (
        <Tooltip content={'Increment'}>
            <IconButton {...incrementProps} ref={decrRef}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}

// AriaNumberFieldProps
export const NumberField = (props: AriaNumberFieldProps) => {
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
        decrementButtonProps,
        descriptionProps,
        errorMessageProps
    }: NumberFieldAria = useNumberField(props, state, inputRef)

    let { buttonProps: incrementProps } = useButton(incrementButtonProps, incrRef);
    let { buttonProps: decrementProps } = useButton(decrementButtonProps, decrRef);  

    // TODO: replace increment/decrememnt with params read in -> default = incr/decr 
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
                


                {props.description && (
                    <Description
                        descriptionProps={descriptionProps}
                        description={props.description}
                    />
                )}
            </InputGroup>
            {props.errorMessage && (
                <ErrorMessage 
                    errorMessageProps={errorMessageProps} 
                    validationState={props.validationState} 
                    errorMessage={props.errorMessage}
                />
            )}
        </ControlGroup>
    );
}
 
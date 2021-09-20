import React from 'react'

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
import { AriaButtonProps, ValidationStateEnum, ValidationState } from './interfaces'

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

interface IErrorMessage {
    validationState?: ValidationState | undefined;
    errorMessage?: string;
    errorMessageProps: React.HTMLAttributes<HTMLDivElement | undefined>;
}
interface IDescriptionProps {
    description?: string;
    descriptionProps: React.HTMLAttributes<HTMLDivElement  | undefined>;
}

interface NumberFieldAria {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
    groupProps: React.HTMLAttributes<HTMLElement>;
    incrementButtonProps: AriaButtonProps;
    decrementButtonProps: AriaButtonProps;
    errorMessageProps: React.HTMLAttributes<HTMLDivElement | undefined>;  
    descriptionProps: React.HTMLAttributes<HTMLDivElement | undefined>;
}


const Message = ({ props, message }: { props: any; message: string; }) => (
    <MessageText props={...props}>
        {message}
    </MessageText> 
); 

const TooltipIconButton = ({ icon, props, ref, tooltipContent }: { 
    icon: React.ReactElement; 
    props: React.HTMLAttributes<HTMLButtonElement>; 
    ref: React.RefObject<HTMLButtonElement>;
    tooltipContent: string; 
}) => {
    return (
        <Tooltip content={tooltipContent}>
            <IconButton {...props} ref={ref}>
                {icon}
            </IconButton>
        </Tooltip>
    );
}

// AriaNumberFieldProps
export function NumberField(props: any) {

    let { locale } = useLocale();
    let state = useNumberFieldState({ ...props, locale });

    let inputRef:  React.RefObject<HTMLInputElement> = React.useRef()
    let incrRef: React.RefObject<HTMLButtonElement> = React.useRef()
    let decrRef: React.RefObject<HTMLButtonElement> = React.useRef()
   
    let {
        labelProps,
        groupProps,
        inputProps,
        descriptionProps,
        errorMessageProps,
        decrementButtonProps,
        incrementButtonProps,
    }: NumberFieldAria = useNumberField(props, state, inputRef)

    let { buttonProps: incrementProps } = useButton(incrementButtonProps, incrRef);
    let { buttonProps: decrementProps } = useButton(decrementButtonProps, decrRef);  

    // TODO: replace increment/decrememnt with params read in -> default = incr/decr 
    return (
        <ControlGroup>
            <Label {...labelProps}> {props.label} </Label>

            <InputGroup {...groupProps}>
                <TooltipIconButton 
                    tooltipContent={props.decrementAriaLabel || 'Decrement'} 
                    props={decrementProps}
                    icon={<MinusIcon />}
                    ref={decrRef}
                />

                <Input {...inputProps} ref={inputRef} />
                
                <TooltipIconButton 
                    tooltipContent={props.incrementAriaLabel || 'Increment'} 
                    props={incrementProps} 
                    icon={<PlusIcon />}
                    ref={incrRef} 
                />
            </InputGroup>

            {props.errorMessage && props.validationState===ValidationStateEnum.INVALID  ? (
                <ErrorMessage props={errorMessageProps} message={props.errorMessage} status={ValidationStateEnum.INVALID} /> 
            :
                <Description props={descriptionProps} message={props.description} /> }
            ) : props.errorMessage ? (
                
            ) 
            : null}
        </ControlGroup>
    );
}
 
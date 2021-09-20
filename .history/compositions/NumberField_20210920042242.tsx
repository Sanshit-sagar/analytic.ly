import React, { useRef } from 'react'

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
import { AriaNumberFieldProps, ValidationStateEnum, ValidationState } from './interfaces'

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
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    labelProps: LabelHTMLAttributes<HTMLLabelElement>;
    groupProps: React.HTMLAttributes<HTMLDivElement | undefined>;
    incrementButtonProps?: React.HTMLAttributes<HTMLButtonElement | undefined>;
    decrementButtonProps?: React.HTMLAttributes<HTMLButtonElement | undefined>;
    errorMessageProps?: React.HTMLAttributes<HTMLDivElement | undefined> | undefined;  
    descriptionProps?: React.HTMLAttributes<HTMLDivElement | undefined> | undefined; 
}


const ErrorMessage = ({ validationState, errorMessage, errorMessageProps }: IErrorMessage) => (
    <MessageText props={errorMessageProps}>
        <Text css={{ color: validationState!==ValidationStateEnum.VALID ? 'red' : errorMessage?.length ? 'green' : 'transparent'}}>
            {errorMessage}
        </Text>
    </MessageText>
)

const Description = ({ description, descriptionProps }: IDescriptionProps) => (
    <MessageText props={descriptionProps}>
        {description}
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
export function NumberField<T>(props: AriaNumberFieldProps<T>) {
    let { locale } = useLocale();
    let state = useNumberFieldState({ ...props, locale });

    const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement | undefined>(undefined)
    const incrRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement | undefined>(undefined)
    const decrRef: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement | undefined>(undefined)
   
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
 
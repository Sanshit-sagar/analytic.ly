
import React, { useRef } from 'react'

import { useNumberField, AriaNumberFieldProps } from '@react-aria/numberfield'
import { useNumberFieldState } from '@react-stately/numberfield'
import { useLocale } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { Button } from '../primitives/Button'
import { ControlGroup, Label, Input } from '../primitives/FieldSet'

export function NumberField(props: AriaNumberFieldProps) {
  let {locale} = useLocale();
  let state = useNumberFieldState({...props, locale});
  let inputRef: RefObject<HTMLInputElement> = useRef();
  let incrRef: RefObject<HTMLButtonElement> = useRef();
  let decRef: RefObject<HTMLButtonElement> = useRef();
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps
  } = useNumberField(props, state, inputRef);

  let {buttonProps: incrementProps} = useButton(incrementButtonProps, incrRef);
  let {buttonProps: decrementProps} = useButton(decrementButtonProps, decRef);

  return (
    <ControlGroup>
        <Label {...labelProps}>
            {props.label}
        </Label>
        <div {...groupProps}>
            <IconButton {...decrementProps} ref={incrRef}>
                <MinusIcon />
            </Button>
        <Input {...inputProps} ref={inputRef} />
            <Button {...incrementProps} ref={decRef}>
                <PlusIcon />
            </Button>
        </div>
    </ControlGroup>
  );
}
 
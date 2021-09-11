
import React, { useRef, MutableRefObject } from 'react'

import { useNumberField } from '@react-aria/numberfield'

import { useNumberFieldState } from '@react-stately/numberfield'
import { useLocale } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { IconButton } from '../primitives/IconButton'
import { ControlGroup, Label, Input } from '../primitives/FieldSet'

export function NumberField(props: AriaNumberFieldProps) {
  let {locale} = useLocale();
  let state = useNumberFieldState({...props, locale});
  let inputRef: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  let incrRef: RefObject<HTMLButtonElement  | null | undefined> = useRef();
  let decRef: RefObject<HTMLButtonElement  | null | undefined> = useRef();
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
            </IconButton>
        <Input {...inputProps} ref={inputRef} />
            <IconButton {...incrementProps} ref={decRef}>
                <PlusIcon />
            </IconButton>
        </div>
    </ControlGroup>
  );
}
 
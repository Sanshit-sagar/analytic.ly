
import React, { useRef } from 'react'

import {useNumberField} from '@react-aria/numberfield'
import {useNumberFieldState} from '@react-stately/numberfield'
import {useLocale} from '@react-aria/i18n'
import {useButton} from '@react-aria/button'

import { PlusIcon, MinusIcon } from '@radix-ui/react-icons'
import { Button } from '../priimitives/Button'
import { ControlGroup, Label, Input } from '../primitives/FieldSet'

export function NumberField(props) {
  let {locale} = useLocale();
  let state = useNumberFieldState({...props, locale});
  let inputRef = useRef();
  let incrRef = useRef();
  let decRef = useRef();
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
    <div>
      <Label {...labelProps}>{props.label}</Label>
      <div {...groupProps}>
        <Button {...decrementProps} ref={incrRef}>
            <MinusIcon />
        </Button>
        <Input {...inputProps} ref={inputRef} />
        <Button {...incrementProps} ref={decRef}>
            <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
 
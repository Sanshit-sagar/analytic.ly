
import React from 'react'

import {useNumberField} from '@react-aria/numberfield'
import {useNumberFieldState} from '@react-stately/numberfield';
import {useLocale} from '@react-aria/i18n';
import {useButton} from '@react-aria/button';
import { NumberFieldProps } from '@react-aria/'

seNumberField(
    props: AriaNumberFieldProps,
    state: NumberFieldState,
    inputRef: RefObject<HTMLInputElement>
  ): NumberFieldAria

export function NumberField(props) {
  let {locale} = useLocale();
  let state = useNumberFieldState({...props, locale});
  let inputRef = React.useRef();
  let incrRef = React.useRef();
  let decRef = React.useRef();
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps
  } = useNumberField(props: AriaNumberFieldProps, state: NumberFieldState, inputRef);

  let {buttonProps: incrementProps} = useButton(incrementButtonProps, incrRef);
  let {buttonProps: decrementProps} = useButton(decrementButtonProps, decRef);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <button {...decrementProps} ref={incrRef}>
          -
        </button>
        <input {...inputProps} ref={inputRef} />
        <button {...incrementProps} ref={decRef}>
          +
        </button>
      </div>
    </div>
  );
}
 
import React from 'react'

import{ useButton } from '@react-aria/button'
import { useSearchField } from '@react-aria/searchfield'

import { ControlGroup, Label } from '../primitives/FieldSet'


function SearchField(props) {
    let {label} = props;
    let state = useSearchFieldState(props);
    let ref = React.useRef();
    let {labelProps, inputProps, clearButtonProps} = useSearchField(
      props,
      state,
      ref
    );
    let {buttonProps} = useButton(clearButtonProps);
  
    return (
        <ControlGroup>
            <Label {...labelProps}> {label} </label>
            <div>
              <input {...inputProps} ref={ref} />
              {state.value !== '' && <button {...buttonProps}>❎</button>}
            </div>
        </ControlGroup>
    );
  }
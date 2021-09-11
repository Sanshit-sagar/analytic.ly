import React from 'react'

import { styled } from '../../stitches.config'
import { useButton } from '@react-aria/button'
import { useSearchField } from '@react-aria/searchfield'

import { ControlGroup, Label } from '../../primitives/FieldSet'

const SearchInput = styled('div', {
    backgroundColor: 'slategray',
    padding: '$1 $2',
    br: '$2',
    width: '250px',
    display: 'flex'
});

const 


function SearchField(props) {
    let {label} = props;
    let state = useSearchFieldState(props);
    let ref = React.useRef();
    let {labelProps, inputProps, clearButtonProps} = useSearchField(props,state,ref
    );
    let {buttonProps} = useButton(clearButtonProps);
  
    return (
        <ControlGroup>
            <label {...labelProps}> {label} </label>
            <SearchInputWrapper>
                <SearchInput 
                    {...inputProps} 
                    ref={ref} 
                />
                {state.value !== '' && <button {...buttonProps}>❎</button>}
            </SearchInputWrapper>
        </ControlGroup>
    );
  }
import React, { useRef } from 'react'

import { styled } from '../../stitches.config'
import { useButton } from '@react-aria/button'
import { useSearchField } from '@react-aria/searchfield'

import { ControlGroup, Label } from '../../primitives/FieldSet'
import { Button } from '../../primitives/Button'

const SearchInputWrapper = styled('div', {
    backgroundColor: 'slategray',
    padding: '$1 $2',
    br: '$2',
    width: '250px',
    display: 'flex'
}); 

const SearchInput = styled('input', {
    flex: 1,
    color: 'white',
    font-size: '15px',
    '&:-webkit-input-placeholder':
})

const ClearInput = styled(Button, {
    border: 'transparent',
    outline: 'transparent',
    backgroundColor: 'transparent',
})

const ClearInputButton = ({ ...buttonProps }) => {
    if(input === '') return null
    return <ClearInput {...buttonProps}>❎</ClearInput>}
}


const SearchField = (props) => {
    let {label} = props;
    let state = useSearchFieldState(props);
    let ref = useRef();
    let {labelProps, inputProps, clearButtonProps} = useSearchField(props, state, ref);
    let {buttonProps} = useButton(clearButtonProps);
  
    return (
        <ControlGroup>
            <label {...labelProps}> {label} </label>
            <SearchInputWrapper>
                <SearchInput {...inputProps} ref={ref} />
                <ClearInputButton {...buttonProps}/>
            </SearchInputWrapper>
        </ControlGroup>
    );
}


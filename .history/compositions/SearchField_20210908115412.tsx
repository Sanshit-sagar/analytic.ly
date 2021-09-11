import React, { useRef } from 'react'

import { styled } from '../stitches.config'
import { useButton } from '@react-aria/button'
import { useSearchField } from '@react-aria/searchfield'
import { useSearchFieldState } from '@react-stately/searchfield';

import { Button } from '../primitives/Button'
import { Cross2Icon } from '@radix-ui/react-icons'

const SearchInputWrapper = styled('div', {
    backgroundColor: 'slategray',
    padding: '$1 $2',
    br: '$2',
    width: '250px',
    display: 'flex',
});

const SearchInput = styled('input', {
    flex: 1,
    color: 'white'
})

const ClearInput = styled('button', {
    border: 'transparent',
    outline: 'transparent',
    backgroundColor: 'transparent',
})

const ClearInputButton = ({ input, ...buttonProps }) => {
    if(input === '') return null
    return (
        <ClearInput {...buttonProps}>
            <Cross2Icon />
        </ClearInput>
    ); 
}


export const SearchField = (props) => {
    let ref = useRef()
    let state = useSearchFieldState(props)
    let {inputProps, clearButtonProps} = useSearchField(props, state)
    let {buttonProps} = useButton(clearButtonProps, ref)
  
    return (
        <SearchInputWrapper>
            <SearchInput {...inputProps} ref={ref} />
            <ClearInputButton input={state.value} {...buttonProps}/>
        </SearchInputWrapper>
    );
}

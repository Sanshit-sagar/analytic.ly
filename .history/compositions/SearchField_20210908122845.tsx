import React, { useRef } from 'react'

import { styled } from '../stitches.config'
import { useSearchField } from '@react-aria/searchfield'
import { useSearchFieldState } from '@react-stately/searchfield'
import { SearchFieldProps } from '@react-types/searchfield';

const SearchInputWrapper = styled('div', {
    backgroundColor: '$accent',
    padding: '$1',
    br: '$1',
    width: '250px',
    display: 'flex',
});

const SearchInput = styled('input', {
    all: 'unset',
    flex: 1,
    color: '$accentContrast',
    backgroundColor: 'transparent',
    border: 'none',
    '&:hover': { 
        border: '$border3'
    },
    fontSize: 12
});

export const SearchField = (props: SearchFieldProps) => {
    let inputRef = useRef<HTMLInputElement>()
    let state = useSearchFieldState(props)
    let {inputProps} = useSearchField(props, state, inputRef)
  
    return (
        <SearchInputWrapper>
            <SearchInput 
                {...inputProps} 
                ref={inputRef} 
            />
        </SearchInputWrapper>
    );
}

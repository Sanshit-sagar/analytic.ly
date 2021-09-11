import React from 'react'

import { styled } from '../../stitches.config'
import { useButton } from '@react-aria/button'
import { useSearchField } from '@react-aria/searchfield'

import { ControlGroup, Label } from '../../primitives/FieldSet'
import { Button } from '../../primitives/Button'

const SearchInput = styled('div', {
    backgroundColor: 'slategray',
    padding: '$1 $2',
    br: '$2',
    width: '250px',
    display: 'flex'
}); 

const ClearInputButton = ({ input }) => {
    if(inpute === '') return null
    return <Button {...buttonProps}>❎</Button>}
}


const SearchField = (props) => {
    let {label} = props;
    let state = useSearchFieldState(props);
    let ref = React.useRef();
    let {labelProps, inputProps, clearButtonProps} = useSearchField(props, state, ref);
    let {buttonProps} = useButton(clearButtonProps);
  
    return (
        <ControlGroup>
            <label {...labelProps}> {label} </label>
            <SearchInputWrapper>
                <SearchInput {...inputProps} ref={ref} />
                <ClearInputButton />
            </SearchInputWrapper>
        </ControlGroup>
    );
}


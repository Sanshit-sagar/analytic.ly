import React from 'react'
import { styled } from '../stitches.config'

import type { ComboBoxProps } from '@react-types/combobox'

import { useSearchFieldState } from '@react-stately/searchfield'
import { useComboBoxState } from '@react-stately/combobox'

import { useSearchField } from '@react-aria/searchfield'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFilter } from '@react-aria/i18n'

import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons'
import { IconButton } from '../primitives/IconButton'
import { Tooltip } from '../primitives/Tooltip'
import { Icon } from '../primitives/Icon'
import { Text } from '../primitives/Text'

import { ListBox } from './ListBox'
import { Popover } from './Popover'

const Label = styled('label', {
    display: 'inline-block',
    color: '$text', 
    fontWeight: 'medium', 
    float: 'left', 
    marginLeft: 'auto'
})

const SearchAutocompleteWrapper = styled('div', {
    position: 'relative', 
    pl: '$2', 
    display: 'inline-flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center',
    overflow: 'hidden',
    border: 'thin solid $border', 
    br: '$2', 
    bc: '$accent',
    '&:hover': { 
        borderColor: '$border3' 
    },
    '&:focus': {
        borderColor: '$funky'
    }
})

const SearchAutocompleteContainer = styled('div', {
    display: 'inline-flex', 
    fd: 'column', 
    position: 'relative', 
    width: '250px',
    mt: '$1',
    bc: 'transparent'
})

const SearchAutocompleteInput = styled('input', {
    width: '90%',
    mt: '2px', 
    mb: '2px',
    ml: '$1',
    appearance: 'none',
    outline: 'none',
    padding: '$1 $2',
    bc: '$panel',
    color: '$funkyText',
    border: '1px solid $border',
    br: '$1',
    '&:hover': {
        borderColor: '$border3'
    },
    placeholder: '$text'
})

interface ITooltipIconButtonProps {
    props: any;
    ref: React.RefObject<HTMLButtonElement>;
    visible: boolean;
    tooltip: string;
    icon: any;
}

const IconButtonWithTooltip = ({ props, ref, visible, tooltip, icon }: ITooltipIconButtonProps) => {
    if(!visible) return null;

    return (
        <Tooltip content={tooltip}>
            <IconButton
                {...props}
                ref={ref}
                css={{ 
                    visibilitiy: visible ? 'visible' : 'hidden', 
                    color: '$text', 
                    '&:hover': { 
                        color: '$funkyText' 
                    } 
                }}
            >
                <Icon label={tooltip}>
                    {icon}
                </Icon>
            </IconButton> 
        </Tooltip> 
    );
}

export function SearchAutocomplete<T extends object>(props: ComboBoxProps<T>) {
    let { contains } = useFilter({ sensitivity: 'base' })
    let state = useComboBoxState({ ...props, defaultFilter: contains })

    const inputRef = React.useRef<HTMLInputElement>(null)
    const popoverRef = React.useRef<HTMLDivElement>(null)
    const listBoxRef = React.useRef<HTMLUListElement>(null) 

    let { inputProps, labelProps, listBoxProps } = useComboBox({...props, inputRef, popoverRef, listBoxRef }, state);

    let searchProps = {
        label: props.label,
        value: state.inputValue,
        onChange: (v: string) => state.setInputValue(v)
    }

    const searchState = useSearchFieldState(searchProps)
    const { clearButtonProps } = useSearchField(searchProps, searchState, inputRef)

    let clearButtonRef =  React.useRef<HTMLButtonElement>(null)
    const { buttonProps } = useButton(clearButtonProps, clearButtonRef)

    return (
        <SearchAutocompleteContainer> 
            {props.showLabel && (
                <Label {...labelProps}>
                    {props.label} 
                </Label>
            )}

            <SearchAutocompleteWrapper>
               
                <Tooltip content={props.label}>
                    <Text css={{ color: '$text'}}>
                        <MagnifyingGlassIcon /> 
                    </Text>
                </Tooltip>
               

                <SearchAutocompleteInput 
                    {...inputProps} 
                    ref={inputRef} 
                />
                
                <IconButtonWithTooltip
                    props={buttonProps} 
                    ref={clearButtonRef} 
                    visible={state.inputValue !== ''}
                    tooltip={'clear input?'}
                    icon={<Cross2Icon aria-hidden='true' />}
                />
            </SearchAutocompleteWrapper>
            
            {state.isOpen && (
                <Popover
                    popoverRef={popoverRef}
                    isOpen={state.isOpen}
                    onClose={state.close}
                >
                    <ListBox 
                        {...listBoxProps}
                        listBoxRef={listBoxRef}
                        state={state}
                    />
                </Popover>
            )}
        </SearchAutocompleteContainer>
    )
}
// 
// export const SearchField = (props: SearchFieldProps) => {
    // let inputRef = useRef<HTMLInputElement>()
    // let state = useSearchFieldState(props)
    // let {inputProps} = useSearchField(props, state, inputRef)
//   
    // return (
        // <SearchInputWrapper>
            {/* <SearchInput  */}
                // {...inputProps} 
                // ref={inputRef} 
            // />
        {/* </SearchInputWrapper> */}
    // );
// }

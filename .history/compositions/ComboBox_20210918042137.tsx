import React, { HTMLAttributes, useRef } from 'react'

import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFilter } from '@react-aria/i18n'
import { styled } from '../stitches.config'

import { ListBox } from './ListBox'
import { Popover } from './Popover'
import { Label, LabelGroup, ControlGroup, LargeInput } from '../primitives/FieldSet'

import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Tooltip } from '../primitives/Tooltip'
import { OpenMenuIconButton } from '../primitives/IconButton'

import { ComboBoxProps } from './interfaces'
import { InfoCircledIcon } from '@radix-ui/react-icons'

const FlexInlineBlock = styled('div', {
    position: 'relative',
    flex: 'inline-block',
}); 

const InputGroup = styled('div', {
    fd: 'row', 
    jc: 'space-between', 
    ai: 'stretch'
});

interface IItem {
    key: number;
    label: string; 
    index: number; 
    updateValue: (value: string) => void; 
    value: string; 
}

function isValidKey(props: ComboBoxProps<any>) {
    return (!props.items || !props.items?.length || props.items?.length===0) && props?.inputValue?.length!==0
}

const Save = ({ props }:{ props: ComboBoxProps<any> }) => {
    const handleSave = () => alert(`Saving new parameter`)
    return isValidKey(props) ? <Button onClick={handleSave}> Save? </Button> : null;
}

const Label = ({ labelProps }: { labelProps: React.HTMLAttributes<React.HTMLDivElement> }) => (
    <Label {...labelProps}> {labelProps} </Label>
);

const Info = ({ props }: { props: React.HTMLAttributes<React.HTMLDivElement> }) => (
    <Tooltip content={props.label}> <InfoCircledIcon /> </Tooltip>
)

const MatchesCount = ({ matches }: { matches: string[] | [] }) => (
    <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'flex-end', ai: 'flex-end', color: '$text' }}> 
        {matches?.length ?? 0} matches 
    </Text>
);


export const ComboBox = (props: ComboBoxProps<any>) => {

    let { contains } = useFilter({ sensitivity: 'base' })
    let state = useComboBoxState({ ...props, defaultFilter: contains })
  
    let inputRef = useRef(null)
    let buttonRef = useRef(null)
    let listBoxRef = useRef(null)
    let popoverRef = useRef(null)
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, state)
    
    let { buttonProps } = useButton(triggerProps, buttonRef)
  
    return (
        <ControlGroup>

            <LabelGroup>
                <Label props={labelProps} />
                <Info props={labelProps} /> 
            </LabelGroup>


            <FlexInlineBlock>
                <InputGroup> 
                    <LargeInput {...inputProps} ref={inputRef} />
                    <OpenMenuIconButton {...buttonProps} ref={buttonRef} />
                </InputGroup>
               
                {!state.isOpen &&
                    <Output>
                        <Save props={props} /> 
                        <MatchesCount matches={props.items || []} />
                    </Box>
                }

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
                        <MatchesCount 
                            matches={props.items || []} 
                        />
                    </Popover>
                    
                )}
            </FlexInlineBlock>
        </ControlGroup>
    );
  }
  
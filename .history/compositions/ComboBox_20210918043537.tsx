import React, { useRef } from 'react'

import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFilter } from '@react-aria/i18n'
import { styled } from '../stitches.config'

import { ListBox } from './ListBox'
import { Popover } from './Popover'
import { Label, LabelGroup, ControlGroup, LargeInput } from '../primitives/FieldSet'

import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Tooltip } from '../primitives/Tooltip'
import { OpenMenuIconButton as GroupListTrigger } from '../primitives/IconButton'

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

const OutputGroup = styled('div', {
    width: '100%',
    pt: '$2', 
    border: 'none', 
    bc: 'transparent',  
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start', 
    gap: '$1'
})

const InfoMessage = styled(Text, {
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-end', 
    ai: 'flex-end', 
    color: '$text'
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

const GroupName = ({ labelProps, label }: IntrinsicAttributes & { labelProps: React.HTMLAttributes<HTMLLabelElement>; label: string; }) => (
    <Label {...labelProps}> {label} </Label>
);

const GroupInfo = ({ label }: IntrinsicAttributes & { label: string }) => (
    <Tooltip content={label}> <InfoCircledIcon /> </Tooltip>
)

const MatchedItemsCount = ({ matches }: { matches: string[] | [] }) => (
    <InfoMessage> {matches?.length ?? 0} matches </InfoMessage>
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
                <GroupName 
                    label={props.label}
                    props={labelProps} />
                <GroupInfo label={props.label} /> 
            </LabelGroup>


            <FlexInlineBlock>
                <InputGroup> 
                    <LargeInput 
                        {...inputProps} 
                        ref={inputRef} 
                    />
                    <GroupListTrigger 
                        {...buttonProps} 
                        ref={buttonRef} 
                    />
                </InputGroup>
               
                {!state.isOpen ?
                    <OutputGroup>
                        <Save props={props} /> 
                        <MatchedItemsCount matches={props.items || []} />
                    </OutputGroup>
                :   <Popover
                        popoverRef={popoverRef}
                        isOpen={state.isOpen}
                        onClose={state.close}
                    >
                        <ListBox 
                            {...listBoxProps} 
                            listBoxRef={listBoxRef} 
                            state={state} 
                        />
                        <MatchedItemsCount matches={props.items || []} />
                    </Popover>
                )}
            </FlexInlineBlock>
        </ControlGroup>
    );
  }
  
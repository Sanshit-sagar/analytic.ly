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
import { Icon } from '../primitives/Info'
import { Button } from '../primitives/Button'
import { Tooltip } from '../primitives/Tooltip'
import { OpenMenuIconButton } from './IconButton'

import { ComboBoxProps } from './interfaces'
import { InfoCircledIcon as InfoIcon } from '@radix-ui/react-icons'

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


function isValidKey(items: Iterable<string>, userInput: string) {
    return (!items || !items[Symbol.iterator]().next().done) && userInput?.length!==0
}

const Save = ({ props }:{ props: ComboBoxProps<T extends object> }) => {
    const handleSave = () => alert(`Saving new parameter`)

    if(!isValidKey(props.items, props.inputValue || '')) return null; 
    return <Button onClick={handleSave}> Save? </Button>;
}

const GroupName = ({ props, label }: { props: React.HTMLAttributes<HTMLElement>; label: React.ReactNode; }) => (
    <Label {...props}> {label} </Label>
);

const GroupInfo = ({ label }: { label: React.ReactNode }) => (
    <Tooltip content={label}> <Icon label={label}> <InfoIcon /> </Icon> </Tooltip>
);

const MatchedItemsCount = ({ matches }: { matches: Iterable<Symbol> }) => (
    <InfoMessage> {[...matches]?.length ?? 0} matches </InfoMessage>
);


export const ComboBox = (props: ComboBoxProps<T extends object>) => {

    let { contains } = useFilter({ sensitivity: 'base' })
    let state = useComboBoxState({ ...props, defaultFilter: contains })
  
    let inputRef = useRef<HTMLInputElement>(null)
    let listBoxRef = useRef<HTMLUListElement>(null)
    let popoverRef = useRef<HTMLDivElement>(null)
    let buttonRef = useRef<HTMLButtonElement>(null)
  
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
                    props={labelProps} 
                    label={props.label}
                />
                <GroupInfo label={props.label} /> 
            </LabelGroup>


            <FlexInlineBlock>
                <InputGroup> 
                    <LargeInput 
                        {...inputProps} 
                        ref={inputRef} 
                    />
                    <OpenMenuIconButton 
                        
                        {...buttonProps} 
                        ref={buttonRef} 
                    />
                </InputGroup>
               
                {!state.isOpen ?
                    <OutputGroup>
                        <Save props={props} /> 
                        <MatchedItemsCount matches={props.items} />
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
                        <MatchedItemsCount matches={props.items} />
                    </Popover>
                }
            </FlexInlineBlock>
        </ControlGroup>
    );
}
  
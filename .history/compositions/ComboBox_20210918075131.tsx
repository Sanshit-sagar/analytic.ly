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

const seoGroups: SeoGroupConfig = {
    focussed: { eventType: 'focussed', atom: focussedParamAtom, colors: { on: 'green' }, icon: <CursorTextIcon /> },
    clicked:  { eventType: 'clicked', atom: clickedParamAtom, colors: { on: 'yellow' }, icon: <EyeOpenIcon /> },
    hovered:  {  eventType: 'hovered', atom: hoveredParamAtom, colors: { on: 'orange'}, icon: <CursorArrowIcon /> },
}

const EventIconsGroup = ({ seoGroup, seoParam }: IEventIconsGroupProps) => {
    let eventCulprit = useAtomValue(seoGroup.atom)
    let didCauseEvent = eventCulprit===seoParam.id
    let eventColor = didCauseEvent ? seoGroup.colors.on : seoGroup.colors.off
    let eventContent = didCauseEvent ? seoGroup.icon : NO_CONTENT
    return <Text css={{ color: eventColor }}> {eventContent} </Text>;
}
// 

function isValidKey(items: Iterable<string>, userInput: string) {
    
}

const Save = ({ onSave }:{ onSave: () => void; }) => {
    const handleSave = () => onSave();

    if(isValidKey(props.items, props.inputValue || '')) return null; 
    return <Button onClick={handleSave}> Save? </Button>;
}

const GroupName = ({ props, label }: { props: React.HTMLAttributes<HTMLElement>; label: React.ReactNode; }) => (
    <Label {...props}> {label} </Label>
);

const GroupInfo = ({ label }: { label: React.ReactNode }) => (
    <Tooltip content={label}> <InfoIcon /> </Tooltip>
);

const MatchedItemsCount = ({ matches }: { matches: Iterable<T> }) => (
    <InfoMessage> {[...matches]?.length ?? 0} matches </InfoMessage>
);

export function ComboBox<T extends object>(props: ComboBoxProps<T>) {

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
                        <Save onSave={props.onSave} /> 
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
  
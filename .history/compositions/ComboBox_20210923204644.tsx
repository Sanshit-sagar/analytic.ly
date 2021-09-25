import React from 'react'


import { 
    useOverlay, 
    DismissButton,
    OverlayProvider
} from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'

import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFilter } from '@react-aria/i18n'


import { styled } from '../stitches.config'

import { Button } from '../primitives/Button' 
import { Flex } from '../primitives/Flex'

import { ListBox } from './ListBox'
import { ComboBoxProps } from './interfaces'


import { 
    Label, 
    LabelGroup, 
    ControlGroup, 
    InputBase 
} from '../primitives/FieldSet'

import { Text } from '../primitives/Text'
import { Tooltip } from '../primitives/Tooltip'
import { OpenMenuIconButton } from './IconButton'

export { Item, Section } from 'react-stately'
import { InfoCircledIcon as InfoIcon } from '@radix-ui/react-icons'


const Popover = React.forwardRef(
    ({ title, children, isOpen, onClose, style, ...otherProps}, popoverRef) => {


    let { overlayProps } = useOverlay({ 
        isOpen,
        onClose,
        shouldCloseOnBlur: false, 
        isDismissable: false 
    }, popoverRef)   

    return (
        <FocusScope restoreFocus>
            <div 
                {...overlayProps} 
                ref={popoverRef}
                style={{ 
                    position: 'absolute',
                    top: '100%',
                    zIndex: 1,
                    width: '100%',
                    border: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    br: '$1',
                    mt: '$3',
                    bc: 'transparent',
                    ...style 
                }}
            >
                {children}
                <DismissButton onDismiss={onClose} />
            </div>
        </FocusScope>
    );
})

export enum PopoverVariantTypeEnum {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}
export type PopoverVariantType = (
    PopoverVariantTypeEnum.SMALL | PopoverVariantTypeEnum.MEDIUM | PopoverVariantTypeEnum.LARGE
);


const FlexInlineBlock = styled('div', {
    position: 'relative',
    flex: 'inline-block',
}); 

const InputGroup = styled('div', {
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center'
});

const StyledInput = styled(InputBase, {
    height: '30px', 
    width: '140px'
});

const OutputGroup = styled('div', {
    width: '107%',
    border: 'none', 
    margin: 0, 
    pr: '6%',
    bc: 'transparent',  
    fd: 'row', 
    jc: 'center', 
    ai: 'flex-start', 
})

const InfoMessage = styled(Text, {
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-end', 
    ai: 'flex-end', 
    color: '$funkyText'
});

interface ComboBoxItem {
    id: string;
    name: string;
}

const GroupName = ({ props, label }: { props: React.HTMLAttributes<HTMLElement>; label: React.ReactNode; }) => (
    <Label {...props}> {label} </Label>
)

const GroupInfo = ({ label }: { label: React.ReactNode }) => (
    <Tooltip content={label}> 
        <Text css={{ color: '$text' }}> 
            <InfoIcon /> 
        </Text> 
    </Tooltip>
)

const FilteredItemCount = ({ id, items, inputValue, commit }: { 
    id: string; 
    items: Iterable<ComboBoxItem>; 
    inputValue: string; 
    commit: (value: string, id: string) => void; 
}) => (
    <OutputGroup>
        {[...items]?.length ? 
            <InfoMessage> 
               Showing {[...items]?.length ?? 0}/10 results
            </InfoMessage> : inputValue?.length ? 
            
                <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'flex-end', mt: 0, gap: '$1' }}>
                    <Button 
                        color='transparent' 
                        onClick={() => commit(inputValue, id)}
                    >
                        <Text size='1' css={{ color: '$funkyText'}}> 
                            save {inputValue} ? </Text>
                    </Button>
                    <InfoMessage> Found 0 matching urchins </InfoMessage>
                </Flex>
        : null }
    </OutputGroup>
)

type PressEventType = 'pressstart' | 'pressend' | 'press' | 'pressup'
type PointerType = 'mouse' | 'pen' | 'touch' | 'keyboard' | 'virtual'

interface PressType {
    type: PressEventType;
    pointerType: PointerType;
    target: HTMLElement;
    shiftKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean; 
}

// TODO: add commit(value, id) to ComboBoxProps
export function ComboBox<ComboBoxItem>(props: ComboBoxProps<ComboBoxItem>) {

    let { contains } = useFilter({ sensitivity: 'base' })
    let state = useComboBoxState({ ...props, defaultFilter: contains })
  
    let inputRef = React.useRef<HTMLInputElement | undefined>(undefined)
    let listBoxRef = React.useRef<HTMLUListElement | undefined>(undefined)
    let popoverRef = React.useRef<HTMLDivElement | undefined>(undefined)
    let buttonRef = React.useRef<HTMLButtonElement | undefined>(undefined)
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, state);
    
    let { buttonProps } = useButton({
        ...triggerProps, 
        onPress: (_event: PressType) => { 
            state.toggle('first', 'focus')
        },
        elementType: 'button',
        type: 'button',
        excludeFromTabOrder: false,
        isDisabled: false
    }, buttonRef)

  
    return (
        <ControlGroup>

            <LabelGroup>
                <GroupName 
                    props={labelProps} 
                    label={props.label} 
                />
                <GroupInfo 
                    label={props.label} 
                /> 
            </LabelGroup>


            <FlexInlineBlock>
                <InputGroup> 
                    <StyledInput 
                        ref={inputRef}
                        {...inputProps}   
                        isFocused={state.isFocused}
                    />
                    <OpenMenuIconButton 
                        {...buttonProps} 
                        ref={buttonRef} 
                    />
                </InputGroup>
            
             
                    <OverlayProvider>
                        <Popover
                            ref={popoverRef}
                            isOpen={state.isOpen}
                            onClose={() => {
                                state.commit()
                                alert('closing...')
                            }}
                        >
                            <ListBox 
                                {...listBoxProps} 
                                listBoxRef={listBoxRef} 
                                state={state}                                 
                            />
                            
                            <FilteredItemCount 
                                id={props.label}
                                items={props.items} 
                                inputValue={props.inputValue} 
                                commit={props.commit}
                            />
                         
                        </Popover>
                    </OverlayProvider> 
                
            </FlexInlineBlock>
        </ControlGroup>
    );
}
  
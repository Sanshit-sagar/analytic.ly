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
    width: '100%',
    border: 'none',
    margin: 0, 
    bc: 'transparent',  
    fd: 'row', 
    jc: 'center', 
    ai: 'flex-start', 
})

const InfoMessage = styled(Text, {
    width: '100%', 
    mt: '$2',
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
            </InfoMessage> 
        : inputValue?.length ?     
            <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'flex-end', mt: 0, gap: '$1' }}>
                <Button 
                    color='transparent' 
                    onClick={() => commit(inputValue, id)}
                >
                    <Text size='1' css={{ color: '$funkyText'}}> 
                        save {inputValue}? 
                    </Text>
                </Button>
                <InfoMessage> Found 0 matches </InfoMessage>
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
type LoadingState = 'loading' | 'loaded' | 'filtering' | 'sorting' | 'idle' | 'error'
type i18nFilterType = FilterTypeEnum.CONTAINS || FilterTypeEnum.STARTS_WITH | FilterTypeEnum.ENDS_WITH
interface ComboBoxWrapperProps<T> {
    item: T; 
    renderItem: (item: T) => React.ReactNode;
    loadingState?: LoadingState;
    onLoadMore?: () => void;
    defaultFilter: 'contains'; 
}

type ComboBoxComponentProps = ComboBoxWrapperProps<ComboBoxItem>;
type ComboBoxStateProps = Omit<ComboBoxComponentProps, "defaultFilter">;

type Props = { children: React.ReactNode; type: 'submit' | 'button' };
export type Ref = HTMLButtonElement
export const ComboBoxButton = React.forwardRef((
    props: Props,
    ref: React.Ref<Ref>,
) => (
    <button ref={ref} className="comboBoxButton" type={props.type}>
        {props.children}
    </button> 
))

const ComboBox: React.FC<ComboBoxComponentProps> = (props: ComboBoxComponentProps) => {

    let { contains } = useFilter({ sensitivity: 'base' })
    let state: ComboBoxStateProps = useComboBoxState({ ...props, defaultFilter: contains })
  
    const inputRef = React.useRef(null!)
    const listBoxRef = React.useRef(null!)
    const popoverRef = React.useRef(null!)
    const buttonRef = React.useRef(null!)
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, state);
    
    let { buttonProps } = useButton({
        ...triggerProps, 
        onPress: (_event: PressType) => state.toggle('first', 'focus'),
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
  
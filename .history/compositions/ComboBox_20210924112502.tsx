import React, { createRef } from 'react'
import { styled } from '../stitches.config'

import { 
    useOverlay, 
    DismissButton,
    OverlayProvider
} from '@react-aria/overlays'

import { FocusScope } from '@react-aria/focus'
import { useFilter } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'
import { useComboBox } from '@react-aria/combobox'
import { useComboBoxState } from '@react-stately/combobox'

import { ListBox } from './ListBox'
import { OpenMenuIconButton } from './IconButton'
import { ComboBoxProps } from './interfaces'


import { 
    Label, 
    LabelGroup, 
    ControlGroup, 
    InputBase 
} from '../primitives/FieldSet'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button' 
import { Tooltip } from '../primitives/Tooltip'

export { Item, Section, Collection } from 'react-stately'
import { InfoCircledIcon as InfoIcon } from '@radix-ui/react-icons'

const StyledPopoverContainer = styled(Flex, {
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: 1,
    border: '2px solid $border',
    '&:hover': {
        borderColor: '$border3'
    },
    br: '$1',
    mt: '$2',
    bc: 'transparent'
}); 

interface PopoverProps<T> {
    title: string; 
    children: Collection<T>;
    isOpen: boolean;
    onClose: () => void; 
    style: HTMLStyleElement;
}


const Popover = React.forwardRef((popoverProps: PopoverProps, popoverRef: React.RefObject<HTMLDivElement>) => {

    let { overlayProps } = useOverlay({ 
        isOpen, 
        onClose, 
        shouldCloseOnBlur: false, 
        isDismissable: false 
    }, popoverRef);

    return (
        <FocusScope restoreFocus>
            <StyledPopoverContainer {...overlayProps} ref={popoverRef} css={{ ...otherProps }}>
                {children}
                <DismissButton onDismiss={onClose} />
            </StyledPopoverContainer>
        </FocusScope>
    );
})

export enum PopoverVariantTypeEnum {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

export type PopoverVariantType = 
    | PopoverVariantTypeEnum.SMALL 
    | PopoverVariantTypeEnum.MEDIUM 
    | PopoverVariantTypeEnum.LARGE


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
type LoadingState = 'loading' | 'loaded' | 'filtering' | 'sorting' | 'idle' | 'error'

interface PressType {
    type: PressEventType;
    pointerType: PointerType;
    target: HTMLElement;
    shiftKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean; 
}
type i18nFilterType = FilterTypeEnum.CONTAINS | FilterTypeEnum.STARTS_WITH | FilterTypeEnum.ENDS_WITH

enum FilterTypeEnum {
    CONTAINS = 'contains',
    STARTS_WITH = 'startsWith',
    ENDS_WITH = 'endsWith',
};

interface ComboBoxWrapperProps<T> {
    item: T; 
    renderItem: (item: T) => React.ReactNode;
    onLoadMore?: () => void;
    loadingState?: LoadingState;
    defaultFilter: i18nFilterType;
    children: Collection<T>; 
    items: Iterable<T>;
    onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction | undefined) => void;
    label?: ReactNode; 
    description?: ReactNode;
    errorMessage?: ReactNode; 
    inputValue?: string;
    defaultInputValue?: string; 
    onInputChange?: (value: string) => void; 
    allowsCustomValue?: boolean;
    menuTriggerAction: MenuTriggerAction; // defaults to 'input'
    disabledKeys?: Iterable<Key>;
    disallowEmptySelection?: boolean;
    selectedKey?: string;
    defaultSelectedKey?: string;
    onSelectionChange?: (key: Key) => any; 
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean; 
    placeholder?: string;
    autoFocus?: boolean; 
    validationState?: ValidationState;
    onFocus?: (e: FocusEvent) => void; 
    onBlur?:  (e: FocusEvent) => void; 
    onFocusChange?:  (e: FocusEvent) => void; 
    necessityIndicator?: IconType; 
}

type ComboBoxComponentProps = ComboBoxWrapperProps<ComboBoxItem>;
type ComboBoxStateProps = Omit<ComboBoxComponentProps, "defaultFilter">;

// type Props = { children: React.ReactNode; type: 'submit' | 'button' };
// export type Ref = HTMLButtonElement

// export const ComboBoxButton = React.forwardRef((props: Props, ref: React.Ref<Ref>) => (
//     <button ref={ref} className="comboBoxButton" type={props.type}>
//         {props.children}
//     </button> 
// ));

export const ComboBox: React.FC<ComboBoxComponentProps> = (props: ComboBoxComponentProps) => {

    let { contains } = useFilter({ sensitivity: 'base' })
    let comboBoxState: ComboBoxStateProps = useComboBoxState({ ...props, defaultFilter: contains })
  
    const inputRef = createRef<HTMLInputElement>()
    const listBoxRef = createRef<HTMLUListElement>()
    const popoverRef = createRef<HTMLDivElement>()
    const buttonRef = createRef<HTMLButtonElement>()
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, comboBoxState);
    
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
                <GroupName props={labelProps} label={comboBoxState.label} />
                <GroupInfo label={comboBoxState.label} />
            </LabelGroup>


            <FlexInlineBlock>
                <InputGroup> 
                    <StyledInput ref={inputRef} {...inputProps}   
                        isFocused={comboBoxState.isFocused}
                    />
                    <OpenMenuIconButton {...buttonProps} ref={buttonRef} />
                </InputGroup>
            
             
                    <OverlayProvider>
                        <Popover 
                            ref={popoverRef} 
                            isOpen={state.isOpen} 
                            onClose={() => comboBoxState.commit()}
                        >
                            <ListBox 
                                state={state} 
                                ref={listBoxRef}
                                {...listBoxProps} 
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
  
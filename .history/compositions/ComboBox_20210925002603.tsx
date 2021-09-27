import React, { createRef, useRef } from 'react'
import { styled } from '../stitches.config'

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
import { Box } from '../primitives/Box'


import { useButton } from "@react-aria/button";
import { useComboBox, AriaComboBoxProps } from "@react-aria/combobox";
import { useComboBoxState } from "@react-stately/combobox";
import { useFilter } from "@react-aria/i18n";

import { mergeProps } from '@react-aria/utils'
import { AriaListBoxOptions, useListBox, useOption } from '@react-aria/listbox'
import { useOverlay, DismissButton, OverlayProvider } from '@react-aria/overlays'

import { Item, Section } from "@react-stately/collections"
import { SelectionManager } from '@react-stately/selection'
import { FocusStrategy, MenuTriggerAction } from './interfaces'
import { Node, Collection } from './interfaces'

import { ComboBoxProps } from '@react-types/combobox'
import { InfoCircledIcon as InfoIcon } from '@radix-ui/react-icons'
import { OpenMenuIconButton } from './IconButton'



const FilteredResults = styled(Flex, {
    width: '100%', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-end', 
    mt: 0, 
    gap: '$1'
});

const AllResults = styled(Flex, {
    width: '100%', 
    fd: 'column',
    jc: 'flex-start', 
    ai: 'flex-end', 
    mt: 0, 
    gap: '$1'
}); 

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
    key: Key; 
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

interface FilteredResults {
    id: string; 
    items: Iterable<ComboBoxItem>; 
    inputValue: string; 
    commit: (value: string, id: string) => void; 
};

const FilteredItemCount = ({ id, items, inputValue, commit }: FilteredResults) => (
    <OutputGroup>
        {[...items]?.length ? 
            <AllResults> 
               Showing {[...items]?.length ?? 0}/10 results
            </AllResults> 
        : inputValue?.length ?     
            <FilteredResults>
                <Button 
                    color='transparent' 
                    onClick={() => commit(inputValue, id)}
                >
                    <Text size='1' css={{ color: '$funkyText'}}> 
                        save {inputValue}? 
                    </Text>
                </Button>
                <InfoMessage> Found 0 matches </InfoMessage>
            </FilteredResults>
        : null }
    </OutputGroup>
)

type ComboBoxComponentProps = AriaComboBoxProps<ComboBoxItem>;
type ComboBoxState<T> = {
    inputValue: string;
    isFocused: boolean;
    selectedKey: Key;
    selectedItem: Node<T>;
    collection: Collection<Node<T>>;
    disabledKeys: Set<T>;
    selectionManager: SelectionManager;
    focusStrategy: FocusStrategy;
    isOpen: boolean; 
    setInputValue: (value: string) => void; 
    commit: () => void;
    open: ((focusStrategy: FocusStrategy | null, trigger: MenuTriggerAction) => void);
    toggle: (focusStrategy: FocusStrategy | null, trigger: MenuTriggerAction) => void
    revert: () => void; 
    setFocused: (isFocused: boolean) => void; 
    setSelectedKey: (key: Key) => void;
    close: () => void; 
}

interface ListBoxPopupProps {
    popoverRef: React.RefObject<HTMLDivElement>;
    listBoxRef: React.RefObject<HTMLUListElement>;
    state: ComboBoxState<ComboBoxItem>; 
    shouldUseVirtualFocus: boolean; 
    otherProps: AriaListBoxOptions<ComboBoxItem>;  
}


const Wrapper = styled('div', {
    position: 'absolute',
    left: 0,
    top: '100%',
    height: 'auto',
    minHeight: '50px',
    maxHeight: '400px',
    pt: '$1',
    width: '100%',
    zIndex: 5,
    mt: '1px',
    bc: 'green',
    border: '4px solid $accent',
    borderTop: 'none',
    borderBottom: '2px solid red',
    br: '$2',
  
    variants: {
        size: {
            '1': {
                height: '75px',
            },
            '2': {
                height: '400px',
            },
        },
    },

    defaultVariants: {
        size: '2',
    },
});

const MatchedUrchins = styled(Flex, {
    position: 'absolute', 
    width: '100%',  
    display: 'flex',
    fd: 'column', jc: 'flex-start', ai: ''
    padding: '2px 2px 4px 2px', 
    backgrounColor: 'white', 
    border: '1px solid green',
    '&:hover': { 
        borderColor: 'blue',
        backgroundColor: 'gainsboro'
    }
})

function ListBoxPopup(props: ListBoxPopupProps) {
    let {
        popoverRef,
        listBoxRef,
        state,
        shouldUseVirtualFocus,
        ...otherProps
    } = props;

    let { listBoxProps } = useListBox({ 
        autoFocus: state.focusStrategy, 
        disallowEmptySelection: true, 
        shouldUseVirtualFocus, 
        ...otherProps 
    }, state, listBoxRef); 

    let { overlayProps } = useOverlay({
          onClose: () => state.close(),
          shouldCloseOnBlur: true,
          isOpen: state.isOpen,
          isDismissable: true,
    }, popoverRef);

    return (
        <Wrapper 
            {...overlayProps} 
            ref={popoverRef}
        >
            <MatchedUrchins
                {...mergeProps(listBoxProps, otherProps)}
                ref={listBoxRef}
            >
                 {[...state.collection].map((item) => (
                    <Option
                        shouldUseVirtualFocus
                        key={item.key}
                        item={item}
                        state={state}
                    />
                ))}
            </MatchedUrchins>
            <DismissButton onDismiss={() => state.close()} />
        </Wrapper>
   
    );
}

function Option({ 
    item, 
    state, 
    shouldUseVirtualFocus
}: { 
    item: ComboBoxItem; 
    state: ComboBoxState; 
    shouldUseVirtualFocus: boolean; 
}) {

    let ref = useRef()

    let isDisabled = state.disabledKeys.has(item.key);
    let isSelected = state.selectionManager.isSelected(item.key);
    let isFocused = state.selectionManager.focusedKey === item.key;

    let { optionProps } = useOption(
        {
          key: item.key,
          isDisabled,
          isSelected,
          shouldSelectOnPressUp: true,
          shouldFocusOnHover: true,
          shouldUseVirtualFocus,
        }, state, ref)

    return (
        <Box
            {...optionProps} 
            ref={ref} 
        >
          {item.rendered}
        </Box>
    );
}

export const CustomComboBox = (props: ComboBoxComponentProps) => {

    const { contains } = useFilter({ sensitivity: 'base' })
    let state: ComboBoxState<ComboBoxItem> = useComboBoxState({ ...props, defaultFilter: contains })

    const inputRef = createRef<HTMLInputElement>()
    const listBoxRef = createRef<HTMLUListElement>()
    const popoverRef = createRef<HTMLDivElement>()
    const triggerRef = createRef<HTMLButtonElement>()
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ 
        ...props,  
        inputRef,
        buttonRef: triggerRef,
        listBoxRef,
        popoverRef,
        menuTrigger: "input", 
    }, state);

    let { buttonProps } = useButton(triggerProps, triggerRef);
  
    return (
        <ControlGroup>

            <LabelGroup>
                <GroupName props={labelProps} label={props.label} />
                <GroupInfo label={props.label} />
            </LabelGroup>


            <FlexInlineBlock>

                <InputGroup> 
                    <StyledInput ref={inputRef} {...inputProps} /> 
                    <OpenMenuIconButton ref={triggerRef} {...buttonProps} />
                </InputGroup>
             
                <OverlayProvider>
                    {state.isOpen && (<>
                        <ListBoxPopup 
                            {...listBoxProps}
                            shouldUseVirtualFocus
                            listBoxRef={listBoxRef}
                            popoverRef={popoverRef}
                            state={state}
                        />
                        <FilteredItemCount 
                            id={props.label} 
                            items={props.items} 
                            inputValue={props.inputValue} 
                            commit={props.commit}
                        />
                    </>)}
                </OverlayProvider>                 
            </FlexInlineBlock>
        </ControlGroup>
    );
}


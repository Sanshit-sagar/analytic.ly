import React, { useRef } from 'react'
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

import { Heading } from '../primitives/Heading'
import { Separator } from '../primitives/Separator'

import { Item } from "@react-stately/collections";
import { mergeProps } from "@react-aria/utils";
import { useButton } from "@react-aria/button";
import { useComboBox } from "@react-aria/combobox";
import { useComboBoxState } from "@react-stately/combobox";
import { useFilter } from "@react-aria/i18n";
import { useListBox, useOption } from "@react-aria/listbox";
import { useOverlay, DismissButton } from "@react-aria/overlays";

export { Item, Section } from 'react-stately'
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
    id: string;
    name: string;
}

interface PopoverProps<T> {
    title: string; 
    children: Collection<T>;
    isOpen: boolean;
    onClose: () => void; 
    shouldCloseOnBlur: boolean;
    isDismissable: boolean; 
    style: HTMLStyleElement;
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

function ListBoxPopup(props) {
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

    let { overlayProps } = useOverlay(
        {
          onClose: () => state.close(),
          shouldCloseOnBlur: true,
          isOpen: state.isOpen,
          isDismissable: true,
        },
        popoverRef,
    );

    return (
        <Box 
            {...overlayProps} ref={popoverRef}>
             <ul
                {...mergeProps(listBoxProps, otherProps)}
                ref={listBoxRef}
                style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    mt: '$2', 
                    pt: '$1', 
                    pb: '$1',
                    bc: 'white', 
                    border: '1px solid black', '
                    &:hover': { borderColor: '$border3' }
                }}
            >
                 {[...state.collection].map((item) => (
                    <Option
                        shouldUseVirtualFocus
                        key={item.key}
                        item={item}
                        state={state}
                    />
                ))}
            </ul>
            <DismissButton 
                onDismiss={() => state.close()} 
            />
        </Box>
    )
}

function Option({ item, state, shouldUseVirtualFocus }) {
    let ref = useRef()

    let isDisabled = state.disabledKeys.has(item.key);
    let isSelected = state.selectionManager.isSelected(item.key);
    let isFocused = state.selectionManager.focusedKey === item.key;

    let bgClass;
    let textClass = "text-gray-700";

    if (isSelected) {
        bgClass = "bg-indigo-200";
        textClass = "text-indigo-700";
    } else if (isFocused) {
        bgClass = "bg-gray-100";
        textClass = "text-gray-900";
    } else if (isDisabled) {
        bgClass = "bg-white";
        textClass = "gray";
    }

    let { optionProps } = useOption(
        {
          key: item.key,
          isDisabled,
          isSelected,
          shouldSelectOnPressUp: true,
          shouldFocusOnHover: true,
          shouldUseVirtualFocus,
        },state, ref);

    return (
        <li
            {...optionProps} 
            ref={ref} 
            style={{ 
                padding: '$1 $2', 
                outline: 'none', 
                cursor: 'pointer' 
            )}
        >
          {item.rendered}
        </li>
    );
}
  


export const CustomComboBox = (props: ComboBoxProps) => {

    const { contains } = useFilter({ sensitivity: 'base' })
    let state: ComboBoxState = useComboBoxState({ ...props, defaultFilter: contains })

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
    }, 
        state
    )

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
                    {state.isOpen &&
                        <ListBoxPopup 
                            {...listBoxProps}
                            shouldUseVirtualFocus
                            listBoxRef={listBoxRef}
                            popoverRef={popoverRef}
                            state={state}
                        />
                    }
                </OverlayProvider>                 
            </FlexInlineBlock>
        </ControlGroup>
    );
}
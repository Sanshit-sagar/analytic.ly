import React, { createRef } from 'react'
import { styled } from '../stitches.config'

import { 
    OverlayProvider
} from '@react-aria/overlays'

import { useFilter } from '@react-aria/i18n'
import { useButton } from '@react-aria/button'
import { useComboBox } from '@react-aria/combobox'
import { ComboBoxState, useComboBoxState } from '@react-stately/combobox'

import { Popover } from './Popover'
import { ListBox } from './ListBox'
import { OpenMenuIconButton } from './IconButton'

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

export { Item, Section } from '@react-stately/collections'

import { AriaComboBoxProps } from '@react-aria/combobox'
import { InfoCircledIcon as InfoIcon } from '@radix-ui/react-icons'

// const StyledPopoverContainer = styled(Flex, {
//     position: 'absolute',
//     top: '100%',
//     width: '100%',
//     zIndex: 1,
//     border: '2px solid $border',
//     '&:hover': {
//         borderColor: '$border3'
//     },
//     br: '$1',
//     mt: '$2',
//     bc: 'transparent'
// }); 

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
    mt: '$1', 
    gap: '$1',
    fontSize: '$1',
    color: '$funkyText',
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

const GroupName = ({ 
    props, 
    label 
}: { 
    props: React.HTMLAttributes<HTMLElement>; 
    label: React.ReactNode; 
}) => (
    <Label {...props}> {label} </Label>
);

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
            <InfoMessage> 
               Showing {[...items]?.length ?? 0} results
            </InfoMessage> 
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

export const ComboBox = (props: AriaComboBoxProps<ComboBoxItem>) => {

    const { contains } = useFilter({ sensitivity: 'base' })
    let state: ComboBoxState<ComboBoxItem> = useComboBoxState({...props, defaultFilter: contains});

    const inputRef = createRef<HTMLInputElement>()
    const listBoxRef = createRef<HTMLUListElement>()
    const popoverRef = createRef<HTMLDivElement>()
    const buttonRef = createRef<HTMLButtonElement>()
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, state)

    let { buttonProps } = useButton(triggerProps, buttonRef);
  
    return (
        <ControlGroup>

            <LabelGroup>
                <GroupName props={labelProps} label={props.label} />
                <GroupInfo label={props.label} />
            </LabelGroup>


            <FlexInlineBlock>

                <InputGroup> 
                    <StyledInput ref={inputRef} {...inputProps} /> 
                    <OpenMenuIconButton ref={buttonRef} {...buttonProps} />
                </InputGroup>
             
                <OverlayProvider>
                    <Popover 
                        popoverRef={popoverRef}
                        isOpen={state.isOpen}
                        onClose={state.close}
                    >
                        <ListBox 
                            state={state} 
                            listBoxRef={listBoxRef} 
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
  

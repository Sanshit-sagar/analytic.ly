import React from "react";

import type { ComboBoxProps } from "@react-types/combobox"
import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFilter } from '@react-aria/i18n'
import { ChevronDownIcon } from '@radix-ui/react-icons'


import { ListBox } from './ListBox'
import { Popover } from './Popover'
import { IconButton } from '../primitives/IconButton'
import { ButtonLink } from '../primitives/Shared'
import { Label, ControlGroup, LargeInput } from '../primitives/FieldSet'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Tooltip } from '../primitives/Tooltip'

import { InfoCircledIcon } from '@radix-ui/react-icons'


export const ComboBox = (props: ComboBoxProps) => {

    let { contains } = useFilter({ sensitivity: 'base' });
    let state = useComboBoxState({ ...props, defaultFilter: contains });
  
    let inputRef = React.useRef(null)
    let buttonRef = React.useRef(null)
    let listBoxRef = React.useRef(null)
    let popoverRef = React.useRef(null)
  
    let { 
        buttonProps: triggerProps, 
        inputProps, 
        listBoxProps, 
        labelProps 
    } = useComboBox({ ...props, inputRef, buttonRef, listBoxRef, popoverRef }, state);
    
    let {buttonProps} = useButton(triggerProps, buttonRef);
  
    return (
        <ControlGroup>
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$2' }}>
                <Label {...labelProps}>
                    {props.label}
                </Label>
                <Tooltip content={props.label}>
                    <InfoCircledIcon />
                </Tooltip>
            </Flex>


            <Flex css={{position: 'relative', display: 'inline-block' }}>
               <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}> 
                    <LargeInput 
                        {...inputProps} 
                        ref={inputRef}
                    />

                    <Box>
                        <IconButton
                            {...buttonProps}
                            variant='ghost'
                            ref={buttonRef}
                        >
                            <ChevronDownIcon />
                        </IconButton>
                    </Box>
                </Flex>

                {!state.isOpen ? <>
                    {props.items?.length &&
                        <Text css={{ width: '100%',display: 'flex', fd: 'row', jc: 'flex-end', ai: 'flex-end', color: '$text' }}> 
                           `${props.items.length} matches` : 
                        </Text> }
                        <Text 
                            css={{ 
                                width: '100%', display: 'flex', fd: 'row', jc: 'flex-end', 
                                ai: 'flex-end', color: '$text', textDecoration: 'underline', 
                                textDecorationColor: '$funky' 
                            }}
                        >
                            <ButtonLink value={'#'} onClick={() => 'saving to #'}>
                                Save?
                            </ButtonLink>
                        </Text>
                    }
                </>}

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
                        <Box css={{ pt: '$2', border: 'none', bc: 'transparent'}}>
                            <Text css={{width: '100%',display: 'flex', fd: 'row', jc: 'flex-end', ai: 'flex-end', color: '$text' }}> 
                                {props.items?.length} matches 
                            </Text>
                        </Box>
                    </Popover>
                )}
            </Flex>
        </ControlGroup>
    );
  }
  
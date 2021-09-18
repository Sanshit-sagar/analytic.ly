import React, { useRef } from 'react'

import { useComboBoxState } from '@react-stately/combobox'
import { useComboBox } from '@react-aria/combobox'
import { useButton } from '@react-aria/button'
import { useFilter } from '@react-aria/i18n'

import { ListBox } from './ListBox'
import { Popover } from './Popover'
import { IconButton } from '../primitives/IconButton'
import { Label, ControlGroup, LargeInput } from '../primitives/FieldSet'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Button } from '../primitives/Button'
import { Tooltip } from '../primitives/Tooltip'

import { ComboBoxProps } from './interfaces'

import { 
    InfoCircledIcon, 
    ChevronDownIcon 
} from '@radix-ui/react-icons'

function noMatchesForUserInput(props: ComboBoxProps<any>) {
    return (!props.items || !props.items?.length || props.items?.length===0) && props?.inputValue?.length!==0
}

const Save = () => {
    const handleSave = () => alert(`Saving new parameter`)
    return <Button onClick={handleSave}> Save? </Button>
}

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
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', gap: '$2' }}>
                <Label {...labelProps}>
                    {props.label}
                </Label>
                <Tooltip content={props.label}>
                    <Box css={{ color: '$text' }}>
                        <InfoCircledIcon />
                    </Box>
                </Tooltip>
            </Flex>


            <Flex css={{position: 'relative', display: 'inline-block' }}>
               <Flex css={{ fd: 'row', jc: 'space-between', ai: 'stretch' }}> 
                    <LargeInput 
                        {...inputProps} 
                        ref={inputRef}
                    />

                    <IconButton
                        {...buttonProps}
                        variant='ghost'
                        ref={buttonRef}
                    >
                        <Box css={{ color: '$text' }}>
                            <ChevronDownIcon />
                        </Box>
                    </IconButton>
                </Flex>
               
                {!state.isOpen &&
                    <Box css={{ pt: '$2', border: 'none', bc: 'transparent',  fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1' }}>
                         <>{noMatches(props) ? <Save /> : null}</>
                
                
                
                        
                

                        <Text css={{ width: '100%', display: 'flex', fd: 'row', jc: 'flex-end', ai: 'flex-end', color: '$text' }}> 
                            {props.items?.length} matches 
                        </Text>
                    </Box>
                }

                {state.isOpen && (
                    <Box css={{ mt: '$2'}}>
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
                                <Text css={{width: '100%',display: 'flex', fd: 'row', jc: 'flex-end', ai: 'flex-start', color: '$text' }}> 
                                    {props.items?.length} matches 
                                </Text>
                            </Box>
                        </Popover>
                    </Box>
                )}
            </Flex>
        </ControlGroup>
    );
  }
  
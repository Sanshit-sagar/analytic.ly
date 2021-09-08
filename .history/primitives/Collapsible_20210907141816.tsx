import React from 'react';
import { styled, keyframes } from '@stitches/react';

import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Text } from './Text'

const open = keyframes({
    from: { height: 0 },
    to: { height: 'var(--radix-collapsible-content-height)' },
});
  
const close = keyframes({
    from: { height: 'var(--radix-collapsible-content-height)' },
    to: { height: 0 },
});

const StyledCollapsible = styled(CollapsiblePrimitive.Root, { 
    width: 300,
    backgroundColor: 'transparent'
});

const StyledText = styled('span', {
    fontSize: 15,
    lineHeight: '25px',
    color: '$text',
    '&:hover': {
        color: 'yellow'
    }
});

const BasicText = ({ children }) => <Text css={{ color: 'white' }}> {children} </Text> 

const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-state="closed"]': { 
      backgroundColor: 'transparent' 
    },
    '&[data-state="open"]': { 
       backgroundColor: '$darkestPanel', 
    },
    '&:hover': { 
       backgroundColor: '$neutral',
    },
    '&:focus': { 
       outline: '1px solid black'
    },
});

const CollapsiblePanel = styled('div', {
    bc: 'red',
    border: '$1 solid',
    borderColor: '$border',
    br: '$2', 
    padding: '$1 $2',
    margin: '$1',
    '&:hover': {
        bc: '$neutral',
        borderColor: '$border3'
    }
});

export interface IIconifiedTogglerProps {
    open: boolean;
}

const IconifiedToggler = ({ open }: IIconifiedTogglerProps) => {

    return (
        <IconButton>
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
        </IconButton>
    )
}

const StyledCollapsibleTrigger = styled(CollapsiblePrimitive.Trigger, {
    bc: '$funky'
})

const StyledCollapsibleContent = styled(CollapsiblePrimitive.Content, {
    bc: 'red'
});

export const Collapsible = StyledCollapsible
export const CollapsibleTrigger = StyledCollapsibleTrigger
export const CollapsibleContent = StyledCollapsibleContent
export const CollapsibleExpandedPanel = CollapsiblePanel
export const CollapsibleToggler = IconButton
export const CollapsibleTogglerWithIcon = IconifiedToggler
export const CollapsibleText = BasicText
export const CollapsiblePanelText = StyledText
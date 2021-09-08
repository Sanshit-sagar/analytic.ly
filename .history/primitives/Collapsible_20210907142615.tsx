import React from 'react';
import { styled, keyframes } from '../stitches.config';

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
    width: '200px',
    backgroundColor: '$darkestPanel',
});

const StyledText = styled('span', {
    fontSize: 12,
    color: '$text',
    '&:hover': {
        color: '$hiContrast'
    }
});

const BasicText = ({ children }) => <Text css={{ color: 'white' }}> {children} </Text> 

const HeaderStyledText = styled(BasicText, {
    fontSize: 12,
    color: '$text',
    '&:hover': {
       color: '$accentDulled',
    }
})

const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '$2%',
    border: '$2 solid',
    height: 12,
    width: 12,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-state="closed"]': { 
      backgroundColor: '$accent',
      border: '$border'
    },
    '&[data-state="open"]': { 
       backgroundColor: '$hiContrast', 
       borderColor: '$border3'
    },
    '&:hover': { 
       backgroundColor: '$accent',
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
    bc: 'green'
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
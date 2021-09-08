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
    '&:hover': {
        backgroundColor: '$darkestPanel',
    }
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
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: violet.violet11,
    '&[data-state="closed"]': { backgroundColor: 'white' },
    '&[data-state="open"]': { backgroundColor: '$accent' },
    '&:hover': { backgroundColor: '$accent' },
    '&:focus': { boxShadow: `0 0 0 2px $accentDulled` },
});

const CollapsiblePanel = styled('div', {
    borderRadius: '$2',
    border: 'thin solid',
    borderColor: '$border',
    margin: '10px 0',
    padding: 10,
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
    bc: 'transparent'
})

const StyledCollapsibleContent = styled(CollapsiblePrimitive.Content, {
    bc: 'transparent'
});

export const Collapsible = StyledCollapsible
export const CollapsibleTrigger = StyledCollapsibleTrigger
export const CollapsibleContent = StyledCollapsibleContent
export const CollapsibleExpandedPanel = CollapsiblePanel
export const CollapsibleToggler = IconButton
export const CollapsibleTogglerWithIcon = IconifiedToggler
export const CollapsibleText = BasicText
export const CollapsiblePanelText = StyledText
import React from 'react';
import { styled, keyframes } from '../stitches.config';

import { Text } from './Text'
import {Icon} from './Icon'
import {IconButton} from './IconButton'

import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const open = keyframes({
    from: { height: 0 },
    to: { height: 'var(--radix-collapsible-content-height)' },
});
  
const close = keyframes({
    from: { height: 'var(--radix-collapsible-content-height)' },
    to: { height: 0 },
});

const StyledCollapsible = styled(CollapsiblePrimitive.Root, { 
    width: '150px',
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

const CollapsiblePanel = styled('div', {
    borderRadius: '$2',
    border: 'thin solid',
    borderColor: '$border',
    margin: '10px 0',
    padding: 10,
    '&:hover': {
        borderColor: '$border3'
    }
});

export interface IIconifiedTogglerProps {
    open: boolean;
}

const IconifiedToggler = ({ open }: IIconifiedTogglerProps) => {

    return (
        <IconButton
            size='1'
            variant='raised'
            css={{ 
                bc: '$hiContrast', 
                border: 'thin solid',
                borderColor: '$border', 
                color: '$accent', 
                '&:hover': { 
                    bc: '$accentHover', 
                    border: 'thin solid', 
                    borderColor: '$border3'
                }
            }}          
        >
            <Icon label={`Collapsible-state-${open.toString()}`}>
                {open ? <Cross2Icon /> : <RowSpacingIcon />}
            </Icon>
        </IconButton>
    )
}

const StyledCollapsibleTrigger = styled(CollapsiblePrimitive.Trigger, {
    bc: 'transparent',
    border: 'none',
    borderColor: 'transparent'
})

const StyledCollapsibleContent = styled(CollapsiblePrimitive.Content, {
    bc: 'transparent',
    border: 'none',
    borderColor: 'transparent',
    '&[data-state="open"]': { animation: `${open} 300ms ease-out` },
    '&[data-state="closed"]': { animation: `${close} 300ms ease-out` },
});

export const Collapsible = StyledCollapsible
export const CollapsibleTrigger = StyledCollapsibleTrigger
export const CollapsibleContent = StyledCollapsibleContent
export const CollapsibleExpandedPanel = CollapsiblePanel
export const CollapsibleToggler = IconButton
export const CollapsibleTogglerWithIcon = IconifiedToggler
export const CollapsibleText = BasicText
export const CollapsiblePanelText = StyledText
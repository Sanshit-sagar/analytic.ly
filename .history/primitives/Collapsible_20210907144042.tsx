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
        <IconButton
            size='2'
            variant='raised'
            defaultValue={open}
            css={{ 
                margin: '0 $2', 
                mr: '$3',
                padding: '$1 $1',
                bc: '$hiContrast', 
                borderColor: '$funky', 
                color: '$funky', 
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
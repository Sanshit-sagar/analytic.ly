import React from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
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
    display: 'flex',
    fd: 'row',
    ai: 'center', 
    jc: 'space-between',
    gap: '$1',
});

const StyledText = styled('span', {
    fontSize: 15,
     lineHeight: '25px',
});

const BasicText = () => <Text css={{ color: 'white' }}>

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

const ExpandedPanel = styled('div', {
    backgroundColor: 'white',
    borderRadius: '$2',
    margin: '$1 $2',
    padding: '$2',
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



export const Collapsible = StyledCollapsible;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = CollapsiblePrimitive.Content;
export const CollapsibleExpandedPanel = ExpandedPanel
export const CollapsibleToggler = IconButton
export const CollapsibleToogglerWithIcon = IconifiedToggler
export const CollapsibleText = BasicText
export const CollapsiblePanelText = StyledText
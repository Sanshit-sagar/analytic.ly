import { ReactNode } from 'react'
import { styled } from '@stitches/react';
import { green, mauve, blackA } from '@radix-ui/colors';
import { Text } from './Text'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

const StyledToolbar = styled(ToolbarPrimitive.Root, {
    width: '100%',
    height: 40,
    padding: 2.5,
    bc: 'transparent',
    display: 'flex',
    fd: 'row', 
    jc: 'center', 
    ai: 'center',
    minWidth: 'max-content',
    borderRadius: '$2',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    },
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const itemStyles = {
    br: '$1',
    padding: '$1',
    display: 'inline-flex',
    border: 'thin solid $border',
    jc: 'center',
    ai: 'center',
    ml: '$2',
    '&:hover': { 
        backgroundColor: '$accentHover', 
        color: '$accentContrast',
    },
    '&:focus': { 
        position: 'relative', 
        boxShadow: `0 0 0 2px $accent` 
    },
};

const StyledButton = styled(ToolbarPrimitive.Button, {
    ...itemStyles,
    bc: '$funky', 
    '&:hover': { 
        color: '$accent',
        backgroundColor: '$border3'
    } 
});

const StyledLink = styled(ToolbarPrimitive.Link, {
    ...itemStyles,
    bc: 'transparent',
    color: mauve.mauve11,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid $border',
    br: '$2',
    textOverflow: 'clip',
    color: '$funkyText',
    '&:hover': { 
        backgroundColor: 'transparent', 
        cursor: 'pointer',
    },
});

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
    width: 1,
    backgroundColor: mauve.mauve6,
    margin: '0 10px',
});
  
const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
    display: 'inline-flex',
    fd: 'row',
    jc: 'flex-start',
    ai: 'center', 
    bc: 'transparent',
});

const StyledButtonGroup = styled('div', {
    height: '100%',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    jc: 'flex-start',
    ai: 'flex-start',
    gap: '$1',
});
  
const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
    ...itemStyles,
    backgroundColor: '$accent', 
    border: '1px solid $border',
    borderRadius: '$1',
    marginLeft: '$1',
    color: '$text',
    '&[data-state=on]': { 
        backgroundColor: '$accentPressed',
        color: '$accentContrast',
        borderColor: '$funky'
    },
    '&:hover': {
        backgroundColor: '$accentHovered',
        color: '$text',
        borderColor: '$border1'
    }
});

const StyledText = ({ children }: { children: ReactNode }) => {
    return (
        <Text size='1'css={{ color: '$text' }}> 
            {children} 
        </Text>
    );
}


export const Toolbar = StyledToolbar
export const ToolbarButton = StyledButton
export const ToolbarSeparator = StyledSeparator
export const ToolbarLink = StyledLink
export const ToolbarToggleGroup = StyledToggleGroup
export const ToolbarToggleItem = StyledToggleItem
export const ToolbarButtonGroup = StyledButtonGroup
export const ToolbarGroupLabel = StyledText
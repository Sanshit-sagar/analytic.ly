import { ReactNode } from 'react'
import { styled } from '@stitches/react';
import { green, mauve } from '@radix-ui/colors';
import { Text } from './Text'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

const StyledToolbar = styled(ToolbarPrimitive.Root, {
    width: '100%',
    maxHeight: '100px',
    height: '25px',
    bc: 'transparent',
    display: 'flex',
    fd: 'row',
    jc: 'space-around',
    ai: 'flex-start', 
    gap: '1px',
});

const itemStyles = {
    br: '$1',
    padding: '2.5px $2',
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

const StyledRightAlignedGroup = styled('div', {
    
})
  
const StyledLink = styled(ToolbarPrimitive.Link, {
    ...itemStyles,
    backgroundColor: 'transparent',
    color: mauve.mauve11,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    bc: 'yellow',
});
  
const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
    ...itemStyles,
    backgroundColor: '$loContrast', 
    border: '1px solid $border3',
    borderRadius: '$2',
    marginLeft: '$2',
    color: '$text',
    '&:first-child': { 
        marginLeft: 0 
    },
    '&:last-child': {
        marginRight: 0
    },
    '&[data-state=on]': { 
        backgroundColor: '$accentPressed',
        color: '$accentContrast',
        borderColor: '$funky'
    },
    '&:hover': {
        backgroundColor: '$neutral',
        color: '$text',
        opacity:0.9,
        borderColor: '$border1'
    }
});

const StyledText = ({ children }: { children: ReactNode }) => {
    return (
        <Text size='1'css={{ color: green.green8 }}> 
            {children} 
        </Text>
    );
}


export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;
export const ToolbarToggleGroup = StyledToggleGroup;
export const ToolbarToggleItem = StyledToggleItem;
export const ToolbarButtonGroup = StyledButtonGroup;
export const ToolbarGroupLabel = StyledText;
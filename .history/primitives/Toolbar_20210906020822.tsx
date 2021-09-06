import { ReactNode } from 'react'
import { styled } from '@stitches/react';
import { green, mauve } from '@radix-ui/colors';
import { Text } from './Text'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

const StyledToolbar = styled(ToolbarPrimitive.Root, {
    backgroundColor: '$loContrast',
    display: 'flex',
    padding: '$1 $2',
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyColoumn: 'space-around',
    ai: 'flex-start', 
    gap: '$3',
    border: '2px solid transparent',
    borderRadius: '$2',
    '&:hover': {
        border: '2px solid',
        borderColor: '$border3',
        borderRadius: '$2',
    }
});

const itemStyles = {
    borderRadius: 4,
    padding: '$1 $2',
    lineHeight: 1,
    display: 'inline-flex',
    jc: 'center',
     ai: 'center',
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
    px: 10,
    backgroundColor: 'transparent', 
    border: 'thin solid',
    borderColor: '$border3',
    marginLeft: '$2',
    '&:hover': { 
        color: '$accent',
        backgroundColor: '$border3'
    } 
});
  
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
    borderRadius: 4,
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
    backgroundColor: 'transparent', 
    border: 'thin solid',
    borderColor: '$border3',
    marginLeft: '$2',
    '&:first-child': { 
        marginLeft: 0 
    },
    '&:last-child': {
        marginRight: 0
    },
    '&[data-state=on]': { 
        // backgroundColor: '$accent',
        backgroundColor: '$accentPressed',
        color: '$accentContrast',
        borderColor: '$border2'
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
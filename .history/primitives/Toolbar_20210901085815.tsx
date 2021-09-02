import { ReactNode } from 'react'
import { styled } from '@stitches/react';
import { green, mauve } from '@radix-ui/colors';
import { Text } from './Text'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

const StyledToolbar = styled(ToolbarPrimitive.Root, {
    backgroundColor: '$panel',
    display: 'flex',
    padding: 10,
    width: '100%',
    height: '50x',
    flexDirection: 'row',
    justifyColoumn: 'space-around',
    ai: 'flex-start', 
    gap: '$3',
});

const itemStyles = {
    flex: '0 0 auto',
    height: 25,
    padding: '0 5px',
    borderRadius: 4,
    display: 'inline-flex',
    fontSize: 13,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': { 
        backgroundColor: green.green3, 
        color: green.green11 
    },
    '&:focus': { 
        position: 'relative', 
        boxShadow: `0 0 0 2px ${green.green7}` 
    },
};
const StyledButton = styled(ToolbarPrimitive.Button, {
    ...itemStyles,
    px: 10,
    backgroundColor: 'transparent', 
    color: '$loContrast',
    border: 'thin solid',
    borderColor: '$accent',
    marginLeft: '$2',
    '&:hover': { 
        color: '$accent',
        backgroundColor: '$hiContrast'
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
    bc: 'red',
});
  
const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
    ...itemStyles,
    backgroundColor: 'transparent', 
    border: 'thin solid',
    borderColor: '$hiContrast',
    marginLeft: '$2',
    '&:first-child': { 
        marginLeft: 0 
    },
    '&:last-child': {
        marginRight: 0
    },
    '&[data-state=on]': { 
        // backgroundColor: '$accent',
        color: '$hiContrast'
    },
    '&:hover': {
        backgroundColor: '$primary',
        color: '$accentContrast',
        opacity:0.9,
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
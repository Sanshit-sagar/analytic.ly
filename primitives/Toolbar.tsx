import { ReactNode } from 'react'
import { styled } from '@stitches/react'
import { blackA } from '@radix-ui/colors'
import { Text } from './Text'
import { Box } from './Box'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar'

const StyledToolbar = styled(ToolbarPrimitive.Root, {
    width: '850px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    height: 45,
    padding: '1px 2px',
    ml: '$1', 
    mr: '$1',
    mb: 0,
    mt: 0,
    bc: 'transparent',
    display: 'flex',
    fd: 'row', 
    jc: 'flex-end', 
    ai: 'flex-start',
    minWidth: 'max-content',
    borderRadius: '$1',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
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
    all: 'unset',
    height: '100%',
    width: '100%',
    bc: 'transparent',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '$funkyText',
    fontSize: '$2'
});

const StyledSeparator = styled(ToolbarPrimitive.Separator, {
    width: 1,
    backgroundColor: '$accent',
    margin: '0 $2',
});
  
const StyledToggleGroup = styled(ToolbarPrimitive.ToggleGroup, {
    display: 'inline-flex',
    fd: 'row',
    jc: 'flex-end',
    ai: 'center', 
    bc: 'red',
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

const StyledTextBox = styled(Box, {
    border: '1px solid $border',
    borderRadius: '2px',
    textOverflow: 'clip',
    padding: '$1',
    margin: 0,
    display: 'flex',
    fd: 'row',
    jc: 'space-between',
    ai: 'flex-start',
    backgroundColor: '$panel',
    width: '150px',
    '&:hover': {
        borderColor: '$border3',
    }
})

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
export const ToolbarTextBox = StyledTextBox
export const ToolbarToggleGroup = StyledToggleGroup
export const ToolbarToggleItem = StyledToggleItem
export const ToolbarButtonGroup = StyledButtonGroup
export const ToolbarGroupLabel = StyledText
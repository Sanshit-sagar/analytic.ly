import { styled } from '@stitches/react';
import { green, blackA, mauve } from '@radix-ui/colors';
import { Text } from './Text'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

const StyledToolbar = styled(ToolbarPrimitive.Root, {
  display: 'flex',
  padding: 10,
  width: '100%',
  height: '50x',
  borderRadius: 6,
  backgroundColor: 'transparent',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  flexDirection: 'row',
  justifyColoumn: 'flex-start',
  ai: 'stretch', 
  gap: '$2',
});

const itemStyles = {
  all: 'unset',
  flex: '0 0 auto',
  color: mauve.mauve11,
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
const StyledButton = styled(
    ToolbarPrimitive.Button,
    {
      ...itemStyles,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'white',
      backgroundColor: green.green9,
    },
    { '&:hover': { 
      color: 'white',
      backgroundColor: green.green7 
    } 
  }
  );
  
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
    }
  );
  
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
    display: 'inline-flex',
    jc: 'flex-end',
    ai: 'flex-end',
    gap: '$1',
    borderRadius: '$1',
});
  
const StyledToggleItem = styled(ToolbarPrimitive.ToggleItem, {
    backgroundColor: 'transparent', 
    color: green.green8,
    border: 'thin solid',
    borderColor: green.green8,
    marginLeft: '$2',
    '&:first-child': { 
      marginLeft: 0 
    },
    '&[data-state=on]': { 
      backgroundColor: 'yellow',
      color: 'red'
    },
    '&:hover': {
        backgroundColor: green.green6,
        opacity:0.8,
        color: mauve.mauve11,
    }
});

const StyledToolbarGroupLabel = styled(Text, {
    color: green.green8,
    '&:hover': {
        color: 'red',
    },
})
  

export const Toolbar = StyledToolbar;
export const ToolbarButton = StyledButton;
export const ToolbarSeparator = StyledSeparator;
export const ToolbarLink = StyledLink;
export const ToolbarToggleGroup = StyledToggleGroup;
export const ToolbarToggleItem = StyledToggleItem;
export const ToolbarButtonGroup = StyledButtonGroup;
export const ToolbarGroupLabel = StyledToolbarGroupLabel;
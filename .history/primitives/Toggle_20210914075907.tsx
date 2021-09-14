import { styled } from '@stitches/react'
import { violet, blackA, mauve } from '@radix-ui/colors'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as TogglePrimitive from '@radix-ui/react-toggle'

const StyledToggle = styled(TogglePrimitive.Root, {
    backgroundColor: 'transparent', 
    color: '$accent',
    border: 'thin solid',
    borderColor: '$accent',
    borderRadius: '5px',
    marginLeft: '$2',
    marginRight: '$2',
    padding: '$1 $2',
    '&[data-state=on]': { 
        color: '$hiContrast'
    },
    '&:hover': {
        color: '$accent',
        backgroundColor: '$accentHover',
        opacity:0.9,
    }
});


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    backgroundColor: 'transparent',
});
  
const StyledItem = styled(ToggleGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'white',
    color: '$accent',
    height: 20,
    width: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    '&:first-child': { 
        marginLeft: 0, 
        borderTopLeftRadius: 4, 
        borderBottomLeftRadius: 4 
    },
    '&:last-child': { 
        borderTopRightRadius: 4, 
        borderBottomRightRadius: 4 
    },
    '&:hover': { 
        backgroundColor: '$accent',
        borderColor: '$border3', 
    },
    '&[data-state=on]': { 
        backgroundColor: 'transparent',
        color: '$funky',
        borderColor: '$funkyText'
    },
    '&:focus': { 
        position: 'relative',
        outline: '$funky'
    },
  });
  
  // Exports
export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupButon = StyledItem;

export const ToggleButton = StyledToggle
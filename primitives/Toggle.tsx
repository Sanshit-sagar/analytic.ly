import { styled } from '@stitches/react'
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
    backgroundColor: 'transparent',
    color: '$text',
    border: '1px solid $border',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    padding: '0 $2',
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
})

export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupButton = StyledItem;

export const ToggleButton = StyledToggle
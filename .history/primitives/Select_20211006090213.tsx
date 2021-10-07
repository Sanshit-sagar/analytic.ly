import { styled, keyframes } from '../stitches.config'
import { Text } from './Text' 
import { DotFilledIcon } from '@radix-ui/react-icons'

import { mauve } from '@radix-ui/colors'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  
const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const UnStyledSelectableText = ({ children }: { children: any }) =>  <Text> {children} </Text>;

const StyledSelectableText = styled(UnStyledSelectableText, {
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'stretch',
    gap: '$2',
    color: '$text'
});
  
const SelectIndicatorWithIcon = () => <SelectItemIndicator> <DotFilledIcon /> </SelectItemIndicator> 

const SelectableTrigger = styled(DropdownMenuPrimitive.Trigger, {
    height: '100%',
    minWidth: '110px',
    maxWidth: '160px',
    cursor: 'pointer',
    color: '$accent',
    border: '1px solid $border',
    br: '$1',
    bc: 'transparent',
    display: 'inline-flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$2',
    textTransform: 'uppercase',
    "&:hover": {
        backgroundColor: '$accentHover',
        borderColor: '$border3'
    },
    '&[data-state=open]': { 
        backgroundColor: '$accent',
        color: '$accentFull',
        borderColor: '$loContrast',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    '&:focus': {
        backgroundColor: '$neutral',
    },
}); 

const SelectableContent = styled(DropdownMenuPrimitive.Content, {
    minWidth: '75px',
    backgroundColor: '$loContrast',
    borderRadius: '$1',
    borderTopRadius: 0,
    boxShadow: '0px 10px 38px -10px $accentContrast, 0px 10px 20px -15px $accentContrast',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { 
                animationName: slideDownAndFade 
            },
            '&[data-side="right"]': { 
                animationName: slideLeftAndFade 
            },
            '&[data-side="bottom"]': { 
                animationName: slideUpAndFade 
            },
            '&[data-side="left"]': { 
                animationName: slideRightAndFade 
            },
        },
    },
});

const SelectableItem = styled(DropdownMenuPrimitive.Item, {
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: '$hiContrast',
    borderColor: '$hiContrast',
    backgroundColor: '$loContrast',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 25,
    userSelect: 'none',
    '&[data-disabled]': {
        color: mauve.mauve8,
        pointerEvents: 'none',
    },
    '&:focus': {
        color: '$accentContrast',
        bc: '$accentFull',
        borderColor: '$border3',
    },
    '&:hover': {
        bc: '$accentHover',
        borderColor: '$border2',
    },
    "&:last-child": {
        bblr: '$1',
        bbrr: '$1',
    },
    "&:first-child": {
        btlr: '$1',
        btrr: '$1',
    },
});

export const SelectCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, { 
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: '$hiContrast',
    borderColor: '$hiContrast',
    backgroundColor: '$loContrast',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 25,
    userSelect: 'none',
    '&[data-disabled]': {
        color: mauve.mauve8,
        pointerEvents: 'none',
    },
    '&:focus': {
        backgroundColor: '$slate8',
        color: '$slate8',
    },
    "&:last-child": {
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
    },
    "&:first-child": {
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    },
});

export const StyledSelectRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
    all: 'unset',
    position: 'relative',
    height: 25,
    width: '95px',
    padding: '1px 3px',
    color: '$accent',
    bc: '$loContrast',
    border: '1px solid $accent',
    borderTopColor: 'transparent',
    borderBottomColor: '$accent',
    display: 'flex',
    fd: 'row',
    jc: 'space-between',
    ai: 'center',
    userSelect: 'none',
    textTransform: 'uppercase',
    '&[data-disabled]': {
        color: '$loContrast',
        bc: '$panel',
        pointerEvents: 'none',
    },
    '&:focus': {
        color: '$accentContrast',
        bc: '$accentFull',
        borderColor: '$border3',
    },
    '&:hover': {
        bc: '$accentHover',
        borderColor: '$border2',
        "&:last-child": {
            borderBottomColor: '$accent',
        },
        '&:first-child': {
            borderTopColor: '$accent',
        },
    },
    "&:last-child": {
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        borderBottomColor: '$accent',
    },
    "&:first-child": {
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        borderTopColor: '$accent',
    },
});

const DropdownMenuRadioGroup = styled(DropdownMenuPrimitive.RadioGroup, {
    maxHeight: '400px',
    width: '135px',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex', 
    fd: 'column',
    jc: 'flex-end', 
    ai: 'stretch', 
    gap: 0,
    border: '1px solid $border',
    color: '$funkyText'
}); 

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
    height: 1,
    backgroundColor: '$loContrast',
    margin: 5,
});

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
    position: 'absolute',
    left: 0,
    width: 25,
    display: 'inline-flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent'
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
    fill: 'white',
});



export const SelectRoot = DropdownMenuPrimitive.Root
export const SelectTrigger = SelectableTrigger 
export const SelectContent = SelectableContent
export const SelectItem = SelectableItem
export const SelectSeparator = StyledSeparator
export const SelectItemIndicator = StyledItemIndicator
export const SelectArrow = StyledArrow
export const SelectRadioGroup = DropdownMenuRadioGroup
export const SelectRadioItem = StyledSelectRadioItem
export const SelectableText = StyledSelectableText
export const SelectIndicator = SelectIndicatorWithIcon
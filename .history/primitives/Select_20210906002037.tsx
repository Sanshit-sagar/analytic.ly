import { styled, keyframes } from '../stitches.config'
import { mauve, blackA } from '@radix-ui/colors'
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
  

const SelectableTrigger = styled(DropdownMenuPrimitive.Trigger, {
    padding: '$1',
    cursor: 'pointer',
    color: '$hiContrast',
    border: '1px solid $slate8',
    backgroundColor: '$loContrast',
    borderRadius: '$1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
    "&:hover": {
        backgroundColor: '$mauve9',
        color: '$mauve4',
    },
    '&[data-state=open]': { 
        backgroundColor: mauve.mauve4,
        color: blackA.blackA12,
    },
    '&:focus': {
        backgroundColor: '$mauve9',
        color: '$mauve4',
    },
}); 

const SelectableContent = styled(DropdownMenuPrimitive.Content, {
    minWidth: '100px',
    backgroundColor: '$loContrast',
    borderRadius: 6,
    padding: 5,
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
          '&[data-side="top"]': { animationName: slideDownAndFade },
          '&[data-side="right"]': { animationName: slideLeftAndFade },
          '&[data-side="bottom"]': { animationName: slideUpAndFade },
          '&[data-side="left"]': { animationName: slideRightAndFade },
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
    fontSize: 13,
    lineHeight: 1,
    color: '$hiContrast',
    bc: '$loContrast',
    border: '1px solid $hiContrast',
    br: 3,
    display: 'flex',
    jc: 'flex-start',
    ai: 'center',
    height: 25,
    padding: '0 5px',
    pl: 25,
    userSelect: 'none',
    '&[data-disabled]': {
        color: mauve.mauve8,
        pointerEvents: 'none',
    },
    '&:focus': {
        bc: '$slate8',
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

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

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
    alignItems: 'center',
    justifyContent: 'center',
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
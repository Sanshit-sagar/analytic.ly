import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'row',
    width: '500px',
    boxShadow: `0 2px 10px $lightShadow`,
});

const StyledList = styled(TabsPrimitive.List, {
    flexShrink: 0,
    display: 'flex',
    borderBottom: `1px solid`,
    borderBottomColor: '$accent',
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
    width: '100px',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    padding: '0 20px',
    height: 45,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    lineHeight: 1,
    color: '$accent',
    userSelect: 'none',
    '&:first-child': { 
        borderTopLeftRadius: 6 
    },
    '&:last-child': { 
        borderTopRightRadius: 6 
    },
    '&:hover': { 
        color: '$accent',
        backgroundColor: '$accentContrast',
    },
    '&[data-state="active"]': {
        backgroundColor: '$accent',
        color: '$accentContrast',
        boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
    },
    '&:focus': { 
        position: 'relative', 
        boxShadow: `0 0 0 2px $accent2` 
    },
});

const StyledContent = styled(TabsPrimitive.Content, {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    outline: 'none',
    '&:focus': { 
        boxShadow: `0 0 0 2px black` 
    },
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
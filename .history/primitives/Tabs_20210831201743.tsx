import { styled } from '@stitches/react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    boxShadow: `0 2px 10px $lightShadow`,
    backgroundColor: 'transparent',
    border: '1px solid', 
    borderColor: '$accent'
});

const StyledList = styled(TabsPrimitive.List, {
    flexShrink: 0,
    display: 'flex',
    borderBottom: `1px solid`,
    borderBottomColor: '$accent',
    backgroundColor: '$panel'
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
    width: '150px',
    fontFamily: 'inherit',
    backgroundColor: '$panel',
    padding: '0 20px',
    height: 45,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: 1,
    border: '1px solid',
    borderColor: '$accent',
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
        backgroundColor: '$neutral',
    },
    '&[data-state="active"]': {
        backgroundColor: '$accent',
        color: '$accentContrast',
    },
    '&:focus': { 
        position: 'relative', 
        boxShadow: `0 0 0 2px $accent2` 
    },
});

const StyledContent = styled(TabsPrimitive.Content, {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'transparent',
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
import { styled } from '@stitches/react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'transparent',
});

const StyledList = styled(TabsPrimitive.List, {
    flexShrink: 0,
    display: 'flex',
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch',
    borderBottom: `1px solid`,
    borderBottomColor: '$accent',
    backgroundColor: '$panel'
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    padding: '$1 $3',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    border: '1px solid',
    borderColor: '$accent',
    color: '$hiContrast',
    userSelect: 'none',
    '&:first-child': { 
        borderTopLeftRadius: 6 
    },
    '&:last-child': { 
        borderTopRightRadius: 6 
    },
    '&:hover': { 
        color: '$border3',
        borderColor: '$text',
        backgrouundColor: '$border',
    },
    '&[data-state="active"]': {
        backgroundColor: '$border4',
        color: '$text',
    },
    '&:focus': { 
        position: 'relative',  
    },
});

const StyledContent = styled(TabsPrimitive.Content, {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'transparent',
    border: 'none',
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
import { styled } from '@stitches/react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const StyledTabs = styled(TabsPrimitive.Root, {
    height: '600px',
    width: '1100px',
    overflowY: 'hidden', 
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '$hiContrast'
});

const StyledList = styled(TabsPrimitive.List, {
    flexShrink: 0,
    display: 'flex',
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch',
    backgroundColor: '$panel'
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    padding: '$1 $3',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    lineHeight: 1,
    color: '$hiContrast',
    userSelect: 'none',
    border: '1.5px solid',
    borderColor: '$border',
    '&:first-child': { 
        borderTopLeftRadius: 1
    },
    '&:last-child': { 
        borderTopRightRadius: 1 
    },
    '&:hover': { 
        backgroundColor: '$neutral',
        color: '$text',
    },
    '&[data-state="active"]': {
        backgroundColor: '$lightestPanel',
        color: '$accent',
    },
    '&:focus': { 
        position: 'relative',  
    },
});

const StyledContent = styled(TabsPrimitive.Content, {
    overflowY: 'hidden',
    overflowX: 'hidden',
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    backgroundColor: '$panel',
    border: 'thin solid',
    borderColor: '$border',
    
    outline: 'none',
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
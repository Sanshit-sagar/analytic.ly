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
    backgroundColor: '$loContrast',
    padding: '$2 $3',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    lineHeight: 1,
    color: '$hiContrast',
    userSelect: 'none',
    border: '2px solid',
    borderColor: '$accent',
    borderRight: 'none',
    borderLeft: 'none',
    width: '100%',
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    paddingRight: '$2',
    '&:first-child': { 
        borderLeft: '2px solid',
        borderLeftColor: '$accent',
        borderTopLeftRadius: 6,
    },
    '&:last-child': { 
        borderRight: '2px solid',
        borderRightColor: '$accent',
        borderTopRightRadius: 6,
    },
    '&:hover': { 
        backgroundColor: '$neutral',
        color: '$text',
    },
    '&[data-state="active"]': {
        backgroundColor: '$darkestPanel',
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
    paddingTop: 20,
    backgroundColor: '$loContrast',
    border: '2px solid',
    borderColor: '$accent',
    borderTop: 'none',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
});

const St

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
import { styled } from '@stitches/react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Separator } from './Separator'

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

const MiniTabs = styled(TabsPrimitive.Root, {
    height: '350px',
    width: '300px',
    overflowY: 'hidden', 
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
    height: '10px',
    width: '100%',
    backgroundColor: '$panel',
    padding: '$2 $3',
    flex: 1,
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$3',
    color: '$hiContrast',
    userSelect: 'none',
    border: '2px solid $accent',
    borderRight: '1px solid $accent',
    borderLeft: 'none',
    textTransform: 'uppercase',
    pr: '$2',
    '&:first-child': { 
        borderLeft: '2px solid $accent',
        borderTopLeftRadius: '$2',
    },
    '&:last-child': { 
        borderRight: '2px solid $accent',
        borderTopRightRadius: '$2',
    },
    '&:hover': { 
        borderColor: '$accentHover',
        backgroundColor: '$border1',
    },
    '&[data-state="active"]': {
        backgroundColor: '$border3',
        color: '$accentPressed',
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

const MiniContent = styled(TabsPrimitive.Content, {
    overflowY: 'hidden',
    overflowX: 'hidden',
    flexGrow: 1,
    backgroundColor: '$loContrast',
    border: '0.5px solid',
    borderColor: '$accent',
    borderTop: 'none',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6
});

const StyledSeparator = styled(Separator, {
    bc: '$accentContrast',
    color: '$accent', 
    width: '100%',
    mt: '$3',
    mb: '$3'
});

export const TabsTriggerText = ({ children }: { children: any }) => (
    <Text size='2' css={{ width: '100%', fd: 'space-between', ai: 'center', gap: '$2'}}> 
        {children}
    </Text>
);


export const Tabs = StyledTabs;
export const TabsSidebar = MiniTabs; 
export const TabsSidebarContent = MiniContent; 
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
export const TabsContentSeparator = StyledSeparator;
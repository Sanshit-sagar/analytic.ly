import { styled } from '../../stitches.config'
import { Skeleton } from '../../primitives/Skeleton'

const PanelSkeleton = styled(Skeleton, {
    height: '100%', 
    width: '1000px', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch', 
    padding: '$1'
})


const ListSkeleton = styled(Skeleton, {
    flexShrink: 0,
    display: 'flex',
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch',
    backgroundColor: '$panel'
});

const TabSkeleton = styled(Skeleton, {
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
    border: '2px solid $accent',
    borderRight: '1px solid $accent',
    borderLeft: 'none',
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

export const MenuSkeleton = () => (
    <PanelSkeleton>
        <ListSkeleton>
            {[...Array(5)].map((_: number) => (
                <TabSkeleton key={i} />
            ))}
        </ListSkeleton>
    </PanelSkeleton>
)
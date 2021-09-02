import { styled } from '../stitches.config'


export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '48%',
    margin: '$1',
    ml: '$2',
    border: 'thin solid',
    br: '$2',
    borderColor: '$accent',
    bc: '$bronze100',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    padding: '$1',
    zIndex: 4,
});

export const BrushedTimeseriesWrapper = styled('div', {
    height: '700px',
    width: '1200px',
    margin: '$1',
    display: 'flex',
    br: '$2'
});

export const GraphContainer = styled('div', {
    height: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '$1',
    padding: '$1',
    margin: 0,
    overflowY: 'hidden'
})

export const SkeletonContainer = styled('div', {
    bc: '$canvas', 
    br: '$1',
    padding: '$1',
    margin: '$1',
    fd: 'row',
    jc: 'center', 
    ai: 'center'
})

const GlobalLayoutBase = ({ className, children }: { className: any; children: any; }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export const AppContainer = styled(GlobalLayoutBase, {
    height: '100vh',
    width: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    margin: '0',
    padding: '0',
    display: 'flex',
    backgroundColor: '$canvas',
    fd: 'row',
    jc: 'space-between', 
    ai: 'stretch',
    gap: '$1'
})


export const TooltipWrapper = styled('div', {
    height: '100px', 
    width: '175px', 
    br: '$1', 
    bc: '$neutral',
    color: 'hiContrast',
    padding: '$1', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1',
    borderColor: 'white'
});


export const HeaderContainer = styled('div', {
    bc: '$panel', 
    border: 'thin solid', 
    padding: '$1', 
    marginLeft: 'auto',  
    marginRight: '$3', 
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center',
});

export const NavButton = styled('button', {
    padding: '$1 $2', 
    border: 'thin solid',
    br: '$2',
    margin: '$1',
    bc: '$canvas',
    color: '$accent',
    borderColor: '$accent',
    '&:hover': {
        backgroundColor: '$shadowDark',
        opacity: 0.8,
    }
});

export const DashboardLayoutRow = styled('div', {
    bc: 'transparent', 
    display: 'flex',
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'stretch', 
    gap: '$2', 
    margin: '0 $1'
});


export const CentralDataVisualizer = styled('div', {
    backgroundColor: '$panel', 
    height: '600px', 
    width: '1100px', 
    border: 'thin solid',
    borderColor: '$accent', 
    br: '$3', 
    margin: '$2'
});

export const TableControllerContainer = styled('div', {
    width: '100%',
    padding: '$1 $2',
    height: '50px', 
    bc: '$panel',  
    borderBottom: `thin solid`, 
    display: 'flex',
    fd: 'row', 
    jc: 'space-between', 
    ai: 'stretch', 
    gap: '$1'
})

export const MenuWrapper = styled('div', {
    width: '100%',
    margin: ''
})
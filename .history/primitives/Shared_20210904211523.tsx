import { styled } from '../stitches.config'


export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '46%',
    margin: '$1',
    ml: '$2',
    border: '2px solid',
    br: '$2',
    borderColor: '$accent',
    bc: '$loContrast',
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
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch',
    backgroundColor: '$canvas',
})


export const TooltipWrapper = styled('div', {
    height: '100px', 
    width: '175px', 
    br: '$1', 
    bc: '$quartz',
    color: '$accent',
    padding: '$1', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1',
    borderColor: '$quartz'
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
    gap: '$1'
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
    width: '1500px',
    height: '100%',
    bc: 'transparent', 
    display: 'flex',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'space-between',
});


export const CentralDataVisualizer = styled('div', {
    backgroundColor: '$hiContrast', 
    height: '600px', 
    width: '1100px', 
    maxHeight: '600px', 
    maxWidth: '1100px', 
    border: 'thin solid',
    borderColor: '$border3', 
    borderRadius: '$2', 
    marginLeft: '$2',
    mt: '$2',
    mb: '$1',
    mr: '$1'
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
    height: '600px',
    width: '97.5%',
    border: 'thin solid', 
    borderColor: '$accent', 
    margin: '$2',
    br: '$2',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    bc: '$quartz100',
})
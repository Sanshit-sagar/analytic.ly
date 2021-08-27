import { styled } from '../stitches.config'

export const DashboardDisplayBox = styled('div', {
    bc: '$canvas',
    fd: 'column', 
    jc: 'flex-start',
    height: '510px',
    width: '700px'
});

export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '675px',
    margin: '$1',
});

export const SkeletonContainer = styled('div', {
    bc: '$canvas', 
    br: '$1',
    padding: '$1',
    margin: '$1',
    fd: 'row',
    jc: 'center', 
    ai: 'center'
})

export const StyledAppContainer = styled('div', {
    height: '100vh',
    width: '100%',
    margin: '0',
    padding: '$2',
    border: '0px',
    borderColor: 'thin solid black',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
    gap: '0',
    overflowY: 'hidden',
})

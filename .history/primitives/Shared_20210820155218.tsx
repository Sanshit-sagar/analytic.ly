import { styled } from '../stitches.config'

export const DashboardDisplayBox = styled('div', {
    height: '550px',
    width: '675px',
    border: '1px solid black',
    br: '$1',
    bc: '#fff', 
    margin: '$1',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '$1', 
    pb: '$1'
}); 

export const VisxParentSizeWrapper = styled('div', {
    height: '475px', 
    width: '675px', 
    margin: '$2'
})
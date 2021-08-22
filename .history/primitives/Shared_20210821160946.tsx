import { styled } from '../stitches.config'

export const DashboardDisplayBox = styled('div', {
    height: '550px',
    width: '700px',
    bc: 'rgba(50,50,50, 1.0)', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    margin: '$1'
}); 

export const VisxParentSizeWrapper = styled('div', {
    height: '100%', 
    width: '100%',
    padding: 0,
    margin: 0
})
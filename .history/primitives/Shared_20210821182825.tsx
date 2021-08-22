import { styled } from '../stitches.config'

export const DashboardDisplayBox = styled('div', {
    bc: '$canvas',
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    margin: '$1'
    br: '$2',
}); 

export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '675px',
    padding: 0,
    margin: 0
})
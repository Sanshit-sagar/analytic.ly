import { styled } from '../stitches.config'


export const VisxParentSizeWrapper = styled('div', {
    height: '525px',
    width: '1375px',
    margin: '$1',
    bc: '$canvas',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    padding: '$1'
});

export const GraphContainer = styled('div', {
    height: ''
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

export const StyledAppContainer = styled('div', {
    height: '100vh',
    width: '100%',
    margin: '0',
    padding: '$1',
    border: '0px',
    borderColor: 'thin solid black',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
    gap: '0',
})

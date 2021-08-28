import { styled } from '../stitches.config'


export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '49%',
    margin: '$1',
    bc: '#04002b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '$1',
    padding: '$1',
    br: '$2'
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

export const StyledAppContainer = styled('div', {
    height: '100vh',
    width: '100%',
    margin: '0',
    padding: '$1',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
    gap: '$2',
    overflowY: 'hidden'
})

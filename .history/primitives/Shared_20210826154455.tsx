import { styled } from '../stitches.config'


export const VisxParentSizeWrapper = styled('div', {
    height: '450px',
    width: '45%',
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

export const GraphContainer = styled('div', {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '$1',
    padding: '$1',
    margin: 0,
    bc: '$canvas'
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

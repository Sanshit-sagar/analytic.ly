import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'


export const Container = styled(Flex, {
    height: '525px',
    width: '825px',
    overflow: 'hidden',
    display: 'flex',
    fd: 'column',
    jc: 'space-between',
    ai: 'stretch',
    gap: 0,
    padding: '$1',
    margin: '$1 $2',
    bc: 'transparent',
})

export const ParentSizeWrapper = styled(Flex, {
    height: '500px',
    width: '800px',
    overflow: 'hidden',
    bc: '$loContrast',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 4,
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    br: '$2'
})

export const MenuBar = styled(Flex, {
    width: '97.5%', 
    height: 35, 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$2',
    pl: '$2',
    pr: '$2',
    bc: '$loContrast',
    border: '1px solid $border',
    br: '$2'
})

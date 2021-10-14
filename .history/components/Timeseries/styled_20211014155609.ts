import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

export const OuterContainer = styled('div', {
    height: 600,
    width: 1400,
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex',
    fd: 'column',
    jc: 'space-between',
    ai: 'stretch',
    gap: 0,
    padding: '$1',
    margin: '$1',
    bc: 'transparent',
})

export const InnerContainer = styled(Flex, {
    height: 580,
    width: 1105,
    overflowY: 'hidden',
    overflowX: 'hidden',
    bc: '$loContrast',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-end',
    zIndex: 4,
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    br: '$2'
})

export const MenuBar = styled(Flex, {
    width: 1100, 
    height: 35, 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$2',
    pl: '$2',
    pr: '$2',
    ml: '$1',
    bc: '$loContrast',
    border: '1px solid $accent',
    br: '$2',
    color: '$text',
    overflowX: 'hidden',
    overflowY: 'hidden',
    '&:hover': {
        borderColor: '$accentPressed'
    }
})

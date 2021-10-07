import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

export const ThresholdWrapper = styled(Flex, {
    height: '500px',
    width: '800px',
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

export const ThresholdController = styled(Flex, {
    width: '100%',
    fd: 'row',
    jc: 'flex-end',
    ai: 'flex-start',
    gap: '$1',
    height: 25,
    margin: 0,
    padding: '1px',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
})

export const ThresholdContainer = styled(Flex, {
    height: '100%',
    width: '100%',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'stretch',
    gap: 0,
    bc: 'transparent',
})
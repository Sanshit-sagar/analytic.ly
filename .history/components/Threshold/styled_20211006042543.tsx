import { styled } from '../../stitches.config'
import { Flex } from '../../primitives/Flex'

export const ThresholdContainer = styled(Flex, {
    height: '500px',
    width: '800px',
    bc: '$loContrast',
    padding: '$1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: '$1',
    margin: '$1',
    padding: '$1',
    border: '1px solid $accent',
    br: '$2',
    zIndex: 4,
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
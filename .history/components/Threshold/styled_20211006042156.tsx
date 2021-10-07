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
    margin: '$1 $2',
    border: '1px solid $accent',
    br: '$2',
    zIndex: 4,
});
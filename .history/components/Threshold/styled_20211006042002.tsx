import { styled } from '../../stitches.config'

import { Flex } from '../../primitives/Flex'

export const Controller = styled(Flex, {
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
});

export const VisxParentSizeWrapper = styled(Flex, {
    height: '450px',
    width: '695px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: '$1',
    margin: '$1 $2',
    border: '1px solid $border',
    br: '$2', 
    borderColor: '$accent',
    bc: '$loContrast',
    padding: '$1',
    zIndex: 4,
});
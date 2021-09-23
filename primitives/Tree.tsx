import { styled } from '../stitches.config'
import { animated } from '@react-spring/web'
import { Flex } from './Flex'

export const TreeContainer = styled('div', {
    height: '350px',
    width: '100%',
    margin: '$2',
    padding: '$2 $1',
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    display: 'flex',
    fd: 'row',
    jc: 'center',
    ai: 'center',
    border: '1px solid $border',
    br: '$2',
    '&:hover': {
        borderColor: '$border3'
    }
});

export const TreeFrame = styled('div', {
    width: '400px',
    bc: 'transparent',
    position: 'relative',
    padding: '4px 0px 0px 0px',
    textOverflow: 'ellipses',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    verticalAlign: 'middle',
    color: '$accent',
    fill: '$border',
    '&:hover': {
        accent: '$accentHover',
        border: '$border3',
    }
});

export const TreeNodeWithInput = styled(Flex, {
    width: '100%', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$2', 
    padding: '$2'
});

export const TreeTitle = styled('span', {
    verticalAlign: 'middle',
});

export const TreeContent = styled(animated.div, {
    willChange: 'transform, opacity, height',
    ml: '$2',
    padding: '0 0 0 $2',
    borderLeft: '1px dashed $accent',
    overflow: 'hidden',
});
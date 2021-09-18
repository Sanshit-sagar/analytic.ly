import { styled } from '../stitches.config'
import { animated } from '@react-spring/web'
import { Flex } from './Flex'


export const TreeContainer = styled('div', {
    height: '100%',
    width: '400px',
    margin: '$1',
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
    width: '250px', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'center', 
    gap: '$2', 
    padding: '$2'
});

export const Title = styled('span', {
    verticalAlign: 'middle',
});

export const Content = styled(animated.div, {
    willChange: 'transform, opacity, height',
    ml: '$2',
    padding: '0 0 0 14px',
    borderLeft: '1px dashed $accent',
    overflow: 'hidden',
});
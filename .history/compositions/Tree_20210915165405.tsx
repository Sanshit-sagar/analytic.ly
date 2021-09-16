import React from 'react'
import { styled } from '../stitches.config'
import { animated } from '@react-spring/web'


export const TreeContainer = styled('div', {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'hidden',
    overflowX: 'hidden',
    background: '#191b21',
    fontSize: '14px',
    lineHeight: '21px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
});

export const TreeFrame = styled('div', {
    position: 'relative',
    padding: '4px 0px 0px 0px',
    textOverflow: 'ellipses',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    verticalAlign: 'middle',
    color: '#24292e',
    fill: '#24292e'
});


export const Title = styled('span', {
    verticalAlign: 'middle',
});

export const Content = styled(animated.div, {
    willChange: 'transform, op'
});
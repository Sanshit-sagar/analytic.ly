import React, { useState, useEffect, useRef, useMemo, HTMLAttributes } from 'react'
import { styled } from '../stitches.config'
import { animated, useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

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
    willChange: 'transform, opacity, height',
    ml: '$2',
    padding: '0 0 0 14px',
    borderLeft: '1px dashed rgba(255,255,255,0.4)',
    overflow: 'hidden',
});

export const toggle = {
    width: '1em',
    height: '1em',
    mr: '$2',
    cursor: 'pointer',
    verticalAlign: 'middle'
};

function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
}

const Tree = useMemo<HTMLAttributes<HTMLDivElement> & {
        defaultOpen?: boolean;
        name: string | JSX.Element;
    }
>(({ children, name, style, defaultOpen = false })) => {

    const [isOpen, setIsOpen] = useState(defaultOpen)
    const [previous] = usePrevious(isOpen)
    const [ref, { height: viewHeight }] = useMeasure() 

    const { height, opacity, y } = useSpring({
        from: { 
            height: 0, 
            opacity: 0, 
            y: 0 
        },
        to: {
            height: isOpen ? viewHeight : 0,
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20,
        }; 
    })
}

// @ts-ignore
const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
return (
  <Frame>
    <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
    <Title style={style}>{name}</Title>
    <Content
      style={{
        opacity,
        height: isOpen && previous === isOpen ? 'auto' : height,
      }}>
      <a.div ref={ref} style={{ y }} children={children} />
    </Content>
  </Frame>
import React, { useState, useEffect, useRef, memo, HTMLAttributes } from 'react'
import { styled } from '../stitches.config'
import { animated, useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

import * as Icons from '../icons'
import { useGloballyConsistentColors } from '../hooks/useColors'

export const TreeContainer = styled('div', {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'hidden',
    overflowX: 'hidden',
    background: 'transparent',
    fontSize: '14px',
    lineHeight: '21px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid $border',
});

export const TreeFrame = styled('div', {
    position: 'relative',
    padding: '4px 0px 0px 0px',
    textOverflow: 'ellipses',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    verticalAlign: 'middle',
    color: '$text',
    fill: '$text'
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

export const toggle = {
    width: '1em',
    height: '1em',
    marginRight: '10px',
    cursor: 'pointer',
    verticalAlign: 'middle'
};


type TreePropsType = HTMLAttributes<HTMLDivElement> & ITreeProps

interface ITreeProps { 
    defaultOpen?: boolean; 
    name: string | JSX.Element; 
}

function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => void (ref.current = value), [value])
    return ref.current
}

const Tree = memo<TreePropsType>(({ children, name, style, defaultOpen = false }) => {

    const [isOpen, setOpen] = useState(defaultOpen)
    const previous = usePrevious(isOpen)
    const [ref, { height: viewHeight }] = useMeasure() 

    const { height, opacity, y } = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
        to: {
            height: isOpen ? viewHeight : 0,
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20,
        },
    })
    
    // @ts-ignore
    const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
    
    return (
        <TreeFrame>
            <Icon 
                style={{ ...toggle, opacity: children ? 1 : 0.3 }} 
                onClick={() => setOpen(!isOpen)} 
            />
           
            <Title style={style}>
                {name}
            </Title>

            <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
                <a.div 
                    ref={ref} 
                    style={{ y }} 
                    children={children} 
                />
            </Content>
        </TreeFrame>
    );
})

export const CustomTree = () => {

    return (
        <TreeContainer>
            <Tree name='main' defaultOpen>
                <Tree name='subtree1' />
                <Tree name='subtree2'>
                    <Tree name='sub-subtree1' />
                    <Tree name='sub-subtree2'>
                        <Tree name='child1' />
                        <Tree name='child2' />
                        <Tree name='child3' />
                    </Tree>
                </Tree>
            </Tree>
        </TreeContainer>
    )
}
import React, { useState, useEffect, useRef, memo, HTMLAttributes } from 'react'
import { styled } from '../stitches.config'
import { animated, useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

import * as Icons from '../icons'
import { Text } from '../primitives/Text'
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

const Child1 = () => <Text> content-child1 </Text>
const Child2 = () => <Text> content-child2 </Text>

interface ITreeNode {
    id: string;
    y: number;
    x: number;
    name: string;
    children: string[];
    defaultOpen: boolean;
    style: HTMLAttributes<HTMLDivElement> | null;
    isLeaf: boolean;
    content?: React.ReactNode | undefined;
}

export const CustomTree = () => {
   
    let treeNodesQueue: ITreeNode[] = [treeNodes[0]];

    return (
        <TreeContainer>
        </TreeContainer>
    )
}


export const CustomTreeWrapper = () => {

    let treeNodes: ITreeNode[] = [
        { id: '0', y: 0, x: 0, name: 'main', children: ['1', '2'], defaultOpen: true, style: undefined, isLeaf: false },
        { id: '1', y: 1, x: 0, name: 'subtree1', children: [], defaultOpen: false, style: undefined, isLeaf: false },
        { id: '2', y: 1, x: 1, name: 'subtree2', children: ['3','4'], defaultOpen: false, style: undefined,  isLeaf: false },
        { id: '3', y: 2, x: 0, name: 'sub-subtree1', children: [], defaultOpen: false, style: undefined,  isLeaf: false },
        { id: '4', y: 2, x: 1, name: 'sub-subtree2', children: ['5', '6', '7'], defaultOpen: false, style: undefined, isLeaf: false},
        { id: '5', y: 3, x: 0, name: 'child1', children: [], defaultOpen: false, style: undefined, isLeaf: true, content: undefined, },
        { id: '6', y: 3, x: 1, name: 'child2', children: [], defaultOpen: false, style: undefined, isLeaf: true, content: <Child1 /> },
        { id: '7', y: 3, x: 2, name: 'child3', children: [], defaultOpen: false, style: undefined, isLeaf: true, content: <Child2 /> }
    ];

    return (
        <CustomTree tre
    )
}
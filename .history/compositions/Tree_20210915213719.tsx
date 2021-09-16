import React, { useState, useEffect, useRef, memo, HTMLAttributes } from 'react'
import { styled } from '../stitches.config'
import { animated, useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

import * as Icons from '../icons'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'
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
});

interface IAbTestConfig {
    id: string; 
    url: string; 
    percentage: number;
}

interface ICustomTreeProps {
    slug: string;
    abtestConfigs: IAbTestConfig[];
}

const defaultConfig = [
    { id: 0, url: '', percentage: 50 },
    { id: 1, url: '', percentage: 50 }, 
]

export const CustomTree = ({ slug, abtestConfigs }: ICustomTreeProps) => {

    return (
        <TreeContainer>
            <Tree name={slug} defaultOpen>
                {abtestConfigs.map((config: IAbTestConfig, index: number) => (
                    <Tree key={index} name={config.id}>
                        <Flex css={{ width: '250px', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2'}}>
                            <Text> {config.url} </Text>
                            <Text> {config.percentage} </Text>
                        </Flex>
                    </Tree>
                ))}
            </Tree>
        </TreeContainer>
    )
}

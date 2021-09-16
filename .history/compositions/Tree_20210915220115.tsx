import React, { useState, useEffect, useRef, memo, HTMLAttributes } from 'react'
import { styled } from '../stitches.config'
import { animated, useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

import * as Icons from '../icons'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { LargeInput as Input } from '../primitives/FieldSet'


import { useGloballyConsistentColors } from '../hooks/useColors'

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
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$3'}}>
                <Icon 
                    style={{ ...toggle, opacity: children ? 1 : 0.3 }} 
                    onClick={() => setOpen(!isOpen)} 
                />
        
                <Text size='3' css={{ verticalAlign: 'middle', color: '$text' }}> {name} </Text>
            </Flex>
            

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

const initialItems = [
    { 
        name: 'test0',
        items: { name: 'def' url: '', percentage: 50 },
    { name: 'test1', url: '', percentage: 50 }, 
]

export const CustomTree = ({ slug = 'default_slug_500', abtestConfigs = defaultConfig }: ICustomTreeProps) => {
    const [value, setValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    return (
        <TreeContainer>
            <Tree name={slug} defaultOpen>
                {abtestConfigs.map((config: IAbTestConfig, index: number) => (
                    <Tree key={index} name={config.id}>
                        <Flex css={{ width: '250px', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2'}}>
                            <Input 
                                key={index}
                                id={`input-for-${config.id}`}
                                value={value} 
                                onChange={handleChange}
                                placeholder={`URL for config ${index}`} 
                            />
                            <Text> {config.percentage} </Text>
                        </Flex>
                    </Tree>
                ))}
            </Tree>
        </TreeContainer>
    )
}

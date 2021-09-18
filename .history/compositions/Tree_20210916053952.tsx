import React, { useState, memo, HTMLAttributes } from 'react'

import { useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

import * as Icons from '../icons'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { LargeInput as Input } from '../primitives/FieldSet'

import {
    TreeContainer, 
    TreeFrame, 
    TreeContent, 
    TreeTitle,
    TreeNodeWithInput
} from '../primitives/Tree'

type TreePropsType = HTMLAttributes<HTMLDivElement> & ITreeProps

interface ITreeProps { 
    defaultOpen?: boolean; 
    name: string | JSX.Element; 
}

interface IAbTestConfig {
    id: string; 
    url: string; 
    percentage: number;
}

interface ICustomTreeProps {
    slug: string;
    abtestConfigs: IAbTestConfig[];
    updateUrlAtIndex: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void; 
}


export const toggle = {
    width: '1em',
    height: '1em',
    marginRight: '10px',
    cursor: 'pointer',
    verticalAlign: 'middle'
}

const defaultConfig: IAbTestConfig[] = [
    { id: 'splitTest0', url: '', percentage: 50 },
    { id: 'splitTest1', url: '', percentage: 50 }, 
]

export const Tree = memo<TreePropsType>(({ children, name, style, defaultOpen = false }) => {

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
            

            <TreeContent style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
                <a.div 
                    ref={ref} 
                    style={{ y }} 
                    children={children} 
                />
            </TreeContent>
        </TreeFrame>
    );
})



const SingleColumnTree = ({ 
    name, items, setItems, ItemType, value, removeItem, placeholder 
}: { 
    name: string; 
    value: string; 
    items: ItemType[]; 
    setItems: (prevItems: ItemType) => void;
    removeItem: () => void; 
    placeholder: string; 
}) => {

    const updateAtIndex = (event: React.ChangeEvent<HTMLInputElement>) => (
        setItems((oldValue: ItemType) => ({ 
            ...oldValue, 
            url: event.currentTarget.value 
        }))
    )

    return  (
        <Tree name={name}>
            <TreeNodeWithInput>
                <Input
                    value={value}
                    onChange={updateAtIndex}
                    placeholder={placeholder}
                />
                <IconButtonWithTooltip 
                    label={label} 
                    onClick={(event: React.ChangeEvent<HTMLInputElement>) => removeItem()} 
                /> 
            </TreeNodeWithInput>
        </Tree>
    );
}

const IconButtonWithTooltip = ({ label, removeItem }: { label: string; removeItem: () => void; }) => {

    return (
        <Tooltip content={'Remove test from configuration'}>
            <IconButton
                size='1' 
                variant='ghost'
                onClick={removeItem}
            >
                <Icon label={label}>
                    <Cross2Icon />
                </Icon>
            </IconButton>
        </Tooltip>
    )
}
import React, { 
    memo, 
    HTMLAttributes, 
    ForwardRefExoticComponent 
} from 'react'

import * as Icons from '../icons'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { Box } from '../primitives/Box'

import { MediumInput } from '../primitives/FieldSet'

import useMeasure from 'react-use-measure'
import { useSpring, a } from '@react-spring/web'
import { usePrevious } from '../hooks/usePrevious'

import {
    TreeFrame, 
    TreeContent,
    TreeNodeWithInput
} from '../primitives/Tree'

import { IconProps } from '@radix-ui/react-icons/dist/types'


type TreePropsType = HTMLAttributes<HTMLDivElement> & ITreeProps 

interface ITreeProps { 
    defaultOpen?: boolean; 
    name: string | JSX.Element; 
    level?: number; 
    actionable?: boolean; 
    linkable?: boolean; 
    icon?: React.ReactNode; 
}

export const toggle = {
    width: '1em',
    height: '1em',
    marginRight: '10px',
    cursor: 'pointer',
    verticalAlign: 'middle'
}

export const Tree = memo<TreePropsType>(({ 
    children, 
    name, 
    icon,
    style, 
    level = 2, 
    actionable = false, 
    linkable = false,
    defaultOpen = false
}) => {

    const [isOpen, setOpen] = React.useState(defaultOpen)
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
    const Icon = Icons[`${level===1 ? 'Cube' : children ? (isOpen ? 'Minus' : 'Plus') : 'Childless'}SquareO`]

    const nodeWidth = actionable ? `${300 - level * 40}px` : `${300 - level * 33.5}px`
    
    return (
        <TreeFrame>
            <Flex css={{ width: '100%', height: '1.25em', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
               {icon ||
                <Icon 
                    style={{ ...toggle, opacity: children ? 1 : 0.3 }} 
                    onClick={() => setOpen(!isOpen)}
                />}
                <Box css={{ width: nodeWidth, padding: '$1' }}>
                    <Text size='1' css={{ verticalAlign: 'middle', color: '$funkyText' }}> 
                        {name} 
                    </Text>
                </Box>
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

export interface ITreeNodeItem {
    id: string;
    name: string; 
    label?: string; 
    placeholder?: string | undefined;
    primaryValue: string;
    secondaryValue?: string | undefined; 
    primaryField: string;
    secondaryField?: string | undefined;
    valid?: boolean;
    disabled?: boolean; 
    defaultOpen?: boolean;
    styles?: React.HTMLAttributes<HTMLDivElement>;
    icon?: Element | ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

export interface ITreeNodeWithInputProps {
    node: ITreeNodeItem; 
    update: React.ChangeEventHandler<HTMLInputElement>; 
    remove: () => void; 
}

export const ControlledTreeNodeWithInput = ({ 
    node, 
    update, 
    remove
}: ITreeNodeWithInputProps) => {

    return  (
        <Tree 
            key={node.id} 
            name={node.primaryField}
        >
            <TreeNodeWithInput>
                <MediumInput
                    value={node.primaryValue}
                    onChange={update} 
                    placeholder={node.placeholder || ''}
                />
            </TreeNodeWithInput>
        </Tree>
    );
}
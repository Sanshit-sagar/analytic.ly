import React, { useState, memo, HTMLAttributes, ForwardRefExoticComponent } from 'react'

import { useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

import { usePrevious } from '../hooks/usePrevious'

import * as Icons from '../icons'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { LargeInput as Input } from '../primitives/FieldSet'

import {
    TreeContainer, 
    TreeFrame, 
    TreeContent,
    TreeNodeWithInput
} from '../primitives/Tree'

import { Icon } from '../primitives/Icon'
import { Tooltip } from '../primitives/Tooltip'
import { IconButton } from '../primitives/IconButton'
import { IconProps } from '@radix-ui/react-icons/dist/types'

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


interface ITreeNodeItem {
    id: string;
    name: string; 
    label?: string; 
    primaryValue: string;
    secondaryValue?: string | undefined; 
    primaryField: string;
    secondaryField?: string | undefined;
    valid?: boolean;
    disabled?: boolean; 
    defaultOpen?: boolean;
    styles?: React.HTMLAttributes<HTMLDivElement>;
    icon?: Element | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

interface IIconButtonWithTooltipProps {
    label: string; 
    onClick: () => void; 
    icon: Element | ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
};

export const ControlledTreeNodeWithInput = ({ 
    node, 
    setNode, 
    removeNode, 
    placeholder,
    label,
    icon,
}: { 
    node: ITreeNodeItem; 
    setNode: ((prevNode: ITreeNodeItem) => ITreeNodeItem); 
    removeNode: () => void; 
    placeholder: string; 
    label?: string; 
    icon: Element | ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}) => {

    const updateAtIndex = (event: React.ChangeEvent<HTMLInputElement>) => (
        setNode((prevNode: ITreeNodeItem) => ({ 
            ...prevNode, 
            value: event.currentTarget.value 
        }))
    )

    return  (
        <Tree key={node.id} name={node.name}>
            <TreeNodeWithInput>
                <Input
                    value={node.primaryValue}
                    onChange={updateAtIndex}
                    placeholder={placeholder}
                />
                <IconButtonWithTooltip 
                    icon={icon}
                    label={label || node.label || node.name} 
                    onClick={() => removeNode()} 
                /> 
            </TreeNodeWithInput>
        </Tree>
    );
}

const IconButtonWithTooltip = ({ label, onClick, icon }: IIconButtonWithTooltipProps) => {

    return (
        <Tooltip content={'Remove test from configuration'}>
            <IconButton
                size='1' 
                variant='ghost'
                onClick={onClick}
            >
                <Icon label={label}>
                    {icon}
                </Icon>
            </IconButton>
        </Tooltip>
    )
}
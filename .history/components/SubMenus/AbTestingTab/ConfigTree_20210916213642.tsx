import React, { ChangeEvent, ForwardRefExoticComponent } from 'react'
import { PrimitiveAtom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    AbTestConfigType, 
    abTestConfigsAtomsAtom,
    abTestPercentagesByGroupAtom
} from '../../../atoms/abtesting'

import { Tree } from '../../../compositions/Tree'

import {
    TreeContainer,
    TreeNodeWithInput
} from '../../../primitives/Tree'

import { LargeInput as Input } from '../../../primitives/FieldSet'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { IconButtonWithTooltip } from '../../../compositions/IconButton'
import { RunningNumber } from '../../../animated/Number'
import { IconProps } from '@radix-ui/react-icons/dist/types'

interface IAbTestConfigProps {
    abTestConfigAtom: PrimitiveAtom<AbTestConfigItemAtom>;
    remove: () => void;
}

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
    icon?: Element | ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

interface ITreeNodeProps {
    node: ITreeNodeItem; 
    updateNode: ((prevNode: ITreeNodeItem) => ITreeNodeItem); 
    removeNode: () => void; 
    placeholder: string; 
    label?: string; 
    icon?: Element | ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> | undefined; 
}

const AnimatedPercentage = ({ index }: {index: number }) => {
    const groupPercentages = useAtomValue(abTestPercentagesByGroupAtom)
    return <RunningNumber value={groupPercentages[index]} />;
}

const PercentSymbol = () => <Text size='4' css={{ color: '$funkyText' }}> % </Text>

const AbTestConfig = ({ abTestConfigsAtom, remove }: IAbTestConfigProps) => {
    const [node, setNode] = useAtom(abTestConfigsAtom)

    const updateNode = (event: ChangeEvent<HTMLInputElement>) => (
        setNode({ 
            ...node, 
            primaryValue: event.currentTarget.value 
        })
    )

    return  (
        <Tree name={node.name}>
            <TreeNodeWithInput>
                <Input
                    value={node.primaryValue}
                    onChange={updateNode}
                    placeholder={`${node.primaryField} for ${node.name}`}
                />
            </TreeNodeWithInput>
        </Tree>
    );
}

export const AbTestConfigsTree = () => {
    const [abTestConfigsAtoms, removeAbTestConfigsAtom] = useAtom(abTestConfigsAtomsAtom)
    const slug = 'lollipop-fifty-10110'

    return (
        <TreeContainer>
            <Tree name={slug} defaultOpen>
                {abTestConfigsAtoms.map((abTestConfigsAtom: PrimitiveAtom<AbTestConfigItemAtom>, index: number) => (
                    <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center', gap: '$2', width: '100%' }}>
                        <AbTestConfig
                            abTestConfigsAtom={abTestConfigsAtom}
                            remove={() => {
                                removeAbTestConfigsAtom(abTestConfigsAtom)
                            }}
                        />
                        <AnimatedPercentage index={index} />
                        <PercentSymbol />
                    </Flex>
                ))}
            </Tree> 
        </TreeContainer>
    );
}
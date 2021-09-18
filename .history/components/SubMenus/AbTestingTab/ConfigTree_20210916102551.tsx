import React, { ChangeEvent, ForwardRefExoticComponent } from 'react'
import { PrimitiveAtom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    AbTestConfigType, 
    abTestConfigsAtomsAtom,
    abTestPercentagesByGroupAtom,
} from '../../../atoms/abtesting'

import { Tree } from '../../../compositions/Tree'

import {
    TreeContainer,
    TreeNodeWithInput
} from '../../../primitives/Tree'

import { Flex } from '../../../primitives/Flex'
import { Input } from '../../../primitives/FieldSet'
import { Tooltip } from '../../../primitives/Tooltip'
import { IconButton } from '../../../primitives/IconButton'
import { RunningNumber } from '../../../animated/Number'
import { Cross2Icon } from '@radix-ui/react-icons'
import { IconProps } from '@radix-ui/react-icons/dist/types'

interface IAbTestConfigProps {
    abTestConfigAtom: PrimitiveAtom<AbTestConfigType>;
    remove: () => void;
}

const AnimatedPercentage = ({ index }: {index: number }) => {
    const groupPercentages = useAtomValue(abTestPercentagesByGroupAtom)
    return <RunningNumber value={groupPercentages[index]} />;
}

const PercentSymbol = () => (
    <button 
        size='4' 
        onClick={() => alert('improve ads')}
        css={{ color: '$funkyText' }}
    > 
        % 
    </button>
);

const AbTestConfig = ({ abTestConfigAtom, remove }: IAbTestConfigProps) => {
    const [node, setNode] = useAtom(abTestConfigAtom)

    const updateNode = (event: ChangeEvent<HTMLInputElement>) => (
        setNode({ 
            ...node, 
            primaryValue: event.currentTarget.value 
        })
    ); 

    return  (
        <Tree name={node.name}>
            <TreeNodeWithInput>
                <Input
                    value={node.primaryValue}
                    onChange={updateNode}
                    placeholder={`${node.primaryField} for ${node.name}`}
                />
                <Tooltip content={'Remove test from configuration'}>
                    <IconButton
                        size='1' 
                        variant='ghost'
                        onClick={remove}
                    >
                        <Cross2Icon />
                    </IconButton>
                </Tooltip>
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
                {abTestConfigsAtoms.map((abTestConfigsAtom, index: number) => (
                    <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'center', gap: '$2', width: '100%' }}>
                        <AbTestConfig
                            abTestConfigAtom={abTestConfigsAtom}
                            remove={() => removeAbTestConfigsAtom(abTestConfigsAtom)}
                        />
                        <AnimatedPercentage index={index} />
                        <PercentSymbol />
                    </Flex>
                ))}
            </Tree> 
        </TreeContainer>
    );
}
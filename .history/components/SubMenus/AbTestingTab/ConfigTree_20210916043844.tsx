import React, { ChangeEvent } from 'react'
import { PrimitiveAtom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    AbTestConfigType, 
    abTestConfigsAtomsAtom,
    abTestPercentagesByGroupAtom
} from '../../../atoms/abtesting'

import {
    Tree,
    TreeContainer,
    TreeNodeWithInput
} from '../../../compositions/Tree'

import { Flex } from '../../../primitives/Flex'
import { Input } from '../../../primitives/FieldSet'
import { Tooltip } from '../../../primitives/Tooltip'
import { IconButton } from '../../../primitives/IconButton'
import { RunningNumber } from '../../../animated/Number'
import { Cross2Icon } from '@radix-ui/react-icons'

interface IAbTestConfigProps {
    abTestConfigAtom: PrimitiveAtom<AbTestConfigType>;
    remove: () => void;
}

const AbTestConfig = ({ abTestConfigAtom, remove }: IAbTestConfigProps) => {

    const [abTestConfig, setAbTestConfig] = useAtom(abTestConfigAtom)

    const updateUrlAtIndex = (event: ChangeEvent<HTMLInputElement>) => (
        setAbTestConfig((oldValue: AbTestConfigType) => ({ 
            ...oldValue, 
            url: event.currentTarget.value 
        }))
    )

    return  (
        <Tree name={abTestConfig.name}>
            <TreeNodeWithInput>
                <Input
                    value={abTestConfig.url}
                    onChange={updateUrlAtIndex}
                    placeholder={`URL for ${abTestConfig.name}`}
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

const AnimatedPercentage = ({ index }: {index: number }) => {
    const groupPercentages = useAtomValue(abTestPercentagesByGroupAtom)
    return <RunningNumber value={groupPercentages[index]} />;
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
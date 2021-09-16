import React, { ChangeEvent } from 'react'
import { PrimitiveAtom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    IAbTestGroup,
    AbTestConfigType, 
    abTestConfigsAtomsAtom 
} from '../../../atoms/abtesting'

import {
    Tree,
    TreeContainer,
} from '../../../compositions/Tree'

import { Flex } from '../../../primitives/Flex'
import { Input } from '../../../primitives/FieldSet'
import { Tooltip } from '../../../primitives/Tooltip'
import { IconButton } from '../../../primitives/IconButton'

import { Cross2Icon } from '@radix-ui/react-icons'

const AbTestConfig = ({
    abTestConfigAtom,
    remove
}: {
    abTestConfigAtom: PrimitiveAtom<AbTestConfigType>,
    remove: () => void
}) => {
    const [abTestConfig, setAbTestConfig] = useAtom(abTestConfigAtom)

    const updateUrlA

    return  (
        <Tree name={abTestConfig.name}>
            <Flex css={{ width: '250px', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2', padding: '$2' }}>
                <Input
                    value={abTestConfig.url}
                    onChange={handleChange}
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
            </Flex>
        </Tree>
    );
}

const AnimatedPercentage = ({ index }: {index: number }) => {
    const groupPercentages = useAtomValue(abTestPercentagesByGroupAtom)

    return (
        <AnimatedNumber> 
            {groupPercentages[index]}
        </AnimatedNumber>
    )
}

export const AbTestConfigsTree = () => {
    const [abTestConfigsAtoms, removeAbTestConfigsAtom] = useAtom(abTestConfigsAtomsAtom)
    const slug = 'lollipop-fifty-10110'

    return (
        <TreeContainer>
            <Tree name={slug} defaultOpen>
                {abTestConfigsAtoms.map((abTestConfigsAtom: PrimitiveAtom<IABTestGroup>, index: number) => (
                    <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center', gap: '$3', width: '500px' }}>
                        <AbTestConfig
                            abTestConfigAtom={abTestConfigsAtom}
                            remove={() => {
                                removeAbTestConfigsAtom(abTestConfigsAtom)
                            }}
                        />
                        <AnimatedPercentage index={index} />
                    </Flex>
                ))}
            </Tree> 
        </TreeContainer>
    );
}
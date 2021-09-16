import { atom, useAtom } from 'jotai'
impor

const AbTestConfigsList = () => {
    const [abTestConfigsAtoms, removeAbTestConfigsAtom] = useAtom(abTestConfigsAtomsAtom)
    const slug = 'lollipop-fifty-10110'

    return (
        <TreeContainer>
            <Tree name={slug} defaultOpen>
                {abTestConfigsAtoms.map((abTestConfigsAtom) => (
                    <AbTestConfig
                        abTestConfigAtom={abTestConfigsAtom}
                        remove={() => removeAbTestConfigsAtom(abTestConfigsAtom)}
                    />
                ))}
            </Tree> 
        </TreeContainer>
    )
}

type AbTestConfigType = typeof initialState[number]

const AbTestConfig = ({
    abTestConfigAtom,
    remove
}: {
    abTestConfigAtom: PrimitiveAtom<AbTestConfigType>,
    remove: () => void
}) => {
    const [abTestConfig, setAbTestConfig] = useAtom(abTestConfigAtom)

    return  (
        <Tree name={abTestConfig.name}>
            <Flex css={{ width: '250px', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2', padding: '$2' }}>
                <Input
                    value={abTestConfig.url}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setAbTestConfig((oldValue) => ({ 
                            ...oldValue, 
                            url: event.currentTarget.value 
                        }))
                    }}
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


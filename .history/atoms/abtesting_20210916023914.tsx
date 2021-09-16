import { PrimitiveAtom, atom, useAtom } from 'jotai' 
import { splitAtom } from 'jotai/utils'

export const minValue = 0.01
export const maxValue = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export interface IAbTestGroup {
    id: number;
    name: string; 
    url: string | undefined;
    cookie: string;
    valid: boolean; 
};


export const abTestPercentagesAtom = atom([0.5, 0.5])
export const abTestNumGroupsAtom = atom(MIN_ALTERNATES)

export const abTestPercentagesByGroupAtom = atom(
    (get) => {
        let groupCount = get(abTestNumGroupsAtom)
        let percentages = get(abTestPercentagesAtom)
        let percentagesByGroup = []
        let total = 0

        percentages.map((currentPercentage: number, idx: number) => {
            if(idx-1 >= 0) {
                let pctChange = Math.round((currentPercentage - percentages[idx - 1])*100)
                percentagesByGroup.push(pctChange)
                total += pctChange
            }
        })

        if(total < 100 && groupCount > percentagesByGroup.length) {
            percentagesByGroup.push(100-total)
            ++groupCount; 
        } else if(groupCount >= percentagesByGroup.length) {
            percentagesByGroup[percentagesByGroup.length - 1] = 100 - total
        }
        return percentagesByGroup
    }
);

export const initialState: IAbTestGroup[] = [
    { 
        id: 0, 
        name: 'test0',
        url: undefined, 
        cookie: `test0-${Math.random()}`,
        valid: false,
    }, 
    { 
        id: 1, 
        name: 'test1',
        url: undefined, 
        cookie: `test1-${Math.random()}`,
        valid: false,
    }
]

export const activeUrlIndexAtom = atom(undefined)

export const abTestConfigsAtom = atom(initialState)
export const abTestConfigsAtomsAtom = splitAtom(abTestConfigsAtom)

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
                        setAbTestConfig((oldValue) => ({ ...oldValue, url: event.currentTarget.value }))
                    }}
                    placeholder={`URL for ${abTestConfig.name}`}
                />
                
            </Flex>
        </Tree>
    );
}


// 
// <Tree key={index} name={config.id}>
    {/* <Flex css={{ width: '250px', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2', padding: '$2' }}> */}
        {/* <Input  */}
            // key={index}
            // id={`input-for-${config.id}`}
            // value={abtestConfigs[index].url} 
            // onChange={(event) => updateUrlAtIndex(event, index)}
            // placeholder={`URL for config ${index}`} 
        // />
        {/* <Text> {config.percentage} </Text> */}
    {/* </Flex> */}
{/* </Tree> */}
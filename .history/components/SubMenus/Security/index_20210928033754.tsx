import React from 'react'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
// import { Meter } from '../../../compositions/Meter'

import { Text } from '../../../primitives/Text'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Progress, ProgressIndicator } from '../../../primitives/Progress'

const meterValueAtom = atom(10)


// Your app...
export const ProgressDemo = () => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        setTimeout(() => setProgress(8), 300)
    }, [])

    return (
      <Progress value={progress}>
        <ProgressIndicator style={{ width: `${progress}%` }} />
      </Progress>
    );
};

  
export const SecurityTabContent = () => {
    const meterValue = useAtomValue(meterValueAtom)

    return (
        <CentralControlGroup>
             <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
                    <> Encryption </>
                    <InfoCircledIcon />
                </Text>
            </Label>
            {/* <Meter
                id={'security-pct-meter-label'}
                label={'ENCRYPTION'}
                showValueLabel={true}
                formatOptions={{ style: 'percent' }}
                valueLabel={`1 of 4`}
                value={meterValue}
                minValue={0}
                maxValue={100}
            /> */}
            <ProgressDemo /> 
        </CentralControlGroup>
    ); 
}
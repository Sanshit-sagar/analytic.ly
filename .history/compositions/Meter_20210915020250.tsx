import React, { ReactNode } from 'react' 
import { styled } from '../stitches.config'
import { useMeter } from '@react-aria/meter'

import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { Text } from '../primitives/Text'
import { TextField } from '../primitives/TextField'

import { 
    meterValueAtom, 
    passwordAtom, 
    setMeterAndPasswordAtom,
    meterPercentageAtom, 
    meterColorAtom 
} from '../atoms/password'
im

interface AriaMeterProps {
    label: ReactNode;
    showValueLabel: boolean;
    formatOptions?: Intl.NumberFormatOptions;
    valueLabel?: ReactNode;
    value: number;
    minValue: number;
    maxValue: number; 
    id?: string;
}

export const Password = () => {
    const password = useAtomValue(passwordAtom)
    const setMeterAndPassword = useUpdateAtom(setMeterAndPasswordAtom)

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => setMeterAndPassword(event.currentTarget.value)

    return (
        <TextField
            value={password}
            onChange={updatePassword}
            label={'Password'} 
            placeholder='Start typing...'
        />
    )
}


export const Meter = ({ label, showValueLabel = !!label, value = 10, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps, labelProps } = useMeter(props)
    
    const meterPct = useAtomValue(meterPercentageAtom)
    const meterColor = useAtomValue(meterColorAtom)

    return (
        <MeterContainer {...meterProps}>
            <MeterInfoBar>
                {label && <MeterLabel {...labelProps}> {label} </MeterLabel>}
                {showValueLabel && <MeterProgress> {`${meterPct}%`} </MeterProgress>}
            </MeterInfoBar>

            <MeterOutline>
                <ColoredMeterBar 
                    css={{ 
                        width: `${meterPct * 5.4}px`,
                        backgroundColor: meterColor 
                    }} 
                />
            </MeterOutline>

            <Password />
        </MeterContainer>
    )
}
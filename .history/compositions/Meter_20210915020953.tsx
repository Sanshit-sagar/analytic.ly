import React, { ReactNode } from 'react' 
import { useMeter } from '@react-aria/meter'

import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { TextField } from '../primitives/TextField'

import { 
    meterValueAtom, 
    passwordAtom, 
    setMeterAndPasswordAtom,
    meterPercentageAtom, 
    meterColorAtom 
} from '../atoms/password'
import {
    MeterContainer,
    MeterOutline,
    MeterInfoBar,
    MeterLabel,
    MeterProgress,
    ColoredMeterBar,
} from '../primitives/Meter'

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

const ColoredMeter = () => {
    const meterPct = useAtomValue(meterPercentageAtom)
    const meterColor = useAtomValue(meterColorAtom)

    return (
        <MeterOutline>
            <ColoredMeterBar 
                css={{ 
                    width: `${meterPct * 5.4}px`, 
                    bc: meterColor 
                }} 
            />
        </MeterOutline>
    )
}

const ColoredMeterText = () => {
    let { labelProps } = useMeter(props)
    return (
        <MeterInfoBar>
            {label && <MeterLabel {...labelProps}> {label} </MeterLabel>}
            {showValueLabel && <MeterProgress> {`${meterPct}%`} </MeterProgress>}
        </MeterInfoBar>
    )
}


export const Meter = ({ label, showValueLabel = !!label, value = 10, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps, labelProps } = useMeter(props)
    
    
    

    return (
        <MeterContainer {...meterProps}>
            <ColoredMeterText labelProps={labelProps} label={label} />
            <ColoredMeter />
            <Password />
        </MeterContainer>
    )
}
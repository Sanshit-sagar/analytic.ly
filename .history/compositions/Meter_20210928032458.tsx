import React, { ReactNode, ChangeEvent } from 'react' 
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

    const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setMeterAndPassword(event.currentTarget.value)
    }

    return (
        <TextField
            value={password}
            onChange={updatePassword}
            placeholder='Start typing...'
        />
    )
}

const ColoredMeter = ({ meterProps }) => {
    const meterPct = useAtomValue(meterPercentageAtom)
    const meterColor = useAtomValue(meterColorAtom)

    return (
        <MeterOutline>
            <ColoredMeterBar 
                {...meterProps}
                css={{ 
                    width: `${meterPct * 5.25}px`, 
                    bc: meterColor 
                }} 
            />
        </MeterOutline>
    )
}

const MeterText = ({ props }: { props: AriaMeterProps }) => {
    let { labelProps } = useMeter(props)
    const meterValue = useAtomValue(meterValueAtom)

    return (
        <MeterInfoBar>
            {props.label && <MeterLabel {...labelProps}> meterValue==='' </MeterLabel>}
            {props.showValueLabel && <MeterProgress> {`${meterValue}%`} </MeterProgress>}
        </MeterInfoBar>
    )
} 


export const Meter = ({ label, showValueLabel = !!label, value = 10, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps } = useMeter(props)

    return (
        <>
            <MeterText props={props} />
            <ColoredMeter meterProps={meterProps}/>
            <Password />
        </>
    )
}
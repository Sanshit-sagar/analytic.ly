import React, { ReactNode } from 'react' 
import { styled } from '../stitches.config'
import { useMeter } from '@react-aria/meter'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Text } from '../primitives/Text'
import { TextField } from '../primitives/TextField'

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

const MeterContainer = styled('div', {
    position: 'absolute',
    top: 250,
    left: 250,
    width: '600px', 
    height: '200px',
    display: 'flex', 
    padding: '2.5%',
    fd: 'column',
    jc: 'center',
    ai: 'stretch',
    gap: '$3',
    border: 'thin solid white'
});

const MeterOutline = styled('div', {
    height: '30%', 
    width: '555px', 
    backgroundColor: '$panel', 
    border: '2px solid white', 
    br: '$1'
});

const ColoredMeterBar = styled('div', {
    height: '100%',
    border: 'thin solid transparent',
    br: '$2'
});

const MeterInfoBar = styled('span', {
    width: '100%',
    display: 'flex',
    flexDirection: 'row', 
    jc: 'space-between', 
    ai: 'flex-start',
    gap: '$2',
    mb: '$3', 
    color: '$text',
});

const MeterLabel = styled(Text, {
    color: '$funky', 
    fontSize: 24,
    fontWeight: 400,
    '&:hover': { 
        textDecoration: 'underline' 
    } 
});

const MeterProgress = styled(Text, {
    color: 'inherit'
});

const meterValueAtom = atom(5)
const meterMaxMinAtom = atom({ min: 0, max: 100 })
const passwordAtom = atom('')
const isCondition1MetAtom = atom((get) => get(passwordAtom).length >= 5)
const isCondition2MetAtom = atom((get) => get(passwordAtom).length >= 8)
const isCondition3MetAtom = atom((get) => get(passwordAtom).length >= 12)
const isCondition4MetAtom = atom((get) => get(passwordAtom).length >= 15)
const isCondition5MetAtom = atom((get) => get(passwordAtom).length >= 20)

const setMeterAndPasswordAtom = atom(
    null,
    (get, set, update: React.SetStateAction<string>) => {
        set(passwordAtom, update);

        let cond1Met = get(isCondition1MetAtom)
        let cond2Met = get(isCondition2MetAtom)
        let cond3Met = get(isCondition3MetAtom)
        let cond4Met = get(isCondition4MetAtom)
        let cond5Met = get(isCondition5MetAtom)

        if(cond1Met) {
            
        }

        set(meterValueAtom, )
)
const meterPercentageAtom = atom(
    (get) => {
        let {min, max} = get(meterMaxMinAtom)
        let val = get(meterValueAtom)

        return ((val-min)/max - min)*100
    }
);
const meterColorAtom = atom(
    (get) => {
        let val = get(meterValueAtom)
        return val <= 10 ? 'black' 
            : val <= 30 ? 'red' 
            : val <= 50 ? 'orange' 
            : val <= 70 ? 'yellow' 
            : val <= 90 ? 'lime' 
            : 'green'
    }
)

const allConditionsMetAtom = atom(
    (get) => {
        let res1 = get(isCondition1MetAtom)
        let res2 = get(isCondition2MetAtom)
        let res3 = get(isCondition3MetAtom)
        let res4 = get(isCondition4MetAtom)
        let res5 = get(isCondition5MetAtom)
        return res1 && res2 && res3 && res4 && res5
    };
)

 // React.useEffect(() => {
     // if(cond1Met && meterValue <= 20) incr(10)
     // if(cond2Met && meterValue <= 30) incr(10)
     // if(cond3Met && meterValue <= 40) incr(10) 
 // }, [cond1Met, cond2Met, cond3Met, meterValue]);

export const Password = () => {
    const [meterValue, setMeterValue] = useAtom(meterValueAtom)
    const [password, setPassword] = useAtom(passwordAtom)

    const incr = (amt: number) => setMeterValue(Math.min(100, amt + meterValue))
    // const decr = (amt: number) => setMeterValue(Math.max(0, amt - meterValue))

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)

    return (
        <TextField
            value={password}
            onChange={updatePassword}
            label={'password'} 
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

 // const [meterMinMax, setMeterMinMax] = useAtom(meterMaxMinAtom)
 // const [meterValue, setMeterValue] = useAtom(meterValueAtom)
 // const incr = () => setMeterValue(meterValue + 10 <= 100 ? meterValue + 10 : 100)
 // const decr = () => setMeterValue(meterValue - 10 >= 0 ? meterValue - 10 : 0)
  {/* <button onClick={decr}> decrement </button> */}
  {/* <button onClick={incr}> increment </button> */}
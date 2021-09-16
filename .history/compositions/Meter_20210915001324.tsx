import React, { ReactNode } from 'react' 
import { styled } from '../stitches.config'
import { useMeter } from '@react-aria/meter'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'

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
    width: '95%', 
    backgroundColor: '$neutral', 
    padding: '$1', 
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
    margin: '$1',  
    mb: '$3', 
    color: '$text',
    bc: '$funky',
    '&:hover': {
        bc: '$text',
    },
});

const MeterLabel = styled(Text, {
    color: '$text', 
    '&:hover': { 
        textDecoration: 'underline' 
    } 
});

const MeterProgress = styled(Text, {
    color: 'inherit'
});

const meterValueAtom = atom(10)
const meterMaxMinAtom = atom({ min: 0, max: 100 })
const meterPercentage = atom(
    (get) => {
        let {min, max} = get(meterMaxMinAtom)
        let val = get(meterValueAtom)

        return Math.round(((val-min)/max - min)*100)
    }
);
const meterColor = atom(
    (get) => {
        let val = get(meterValueAtom)
        return val <= 20 ? 'red' : val <= 40 ? 'orange'
    }

export const Meter = ({ label, showValueLabel = !!label, value = 10, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps, labelProps } = useMeter(props)
  
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;

    let barColor = 'green'
  
    return (
        <MeterContainer {...meterProps}>
            <MeterInfoBar>
                {label && <MeterLabel {...labelProps}> {label} </MeterLabel> }
                {showValueLabel && <MeterProgress> {meterProps['aria-valuetext']} </MeterProgress> }
            </MeterInfoBar>

            <MeterOutline>
                <ColoredMeterBar 
                    css={{ 
                        width: barWidth, 
                        backgroundColor: barColor 
                    }} 
                />
            </MeterOutline>
        </MeterContainer>
       
    );
}
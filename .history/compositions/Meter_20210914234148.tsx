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

const SecurityTabContent = styled('div', {
    fd: 'column', 
    jc: 'center', 
    ai: 'center', 
    height: '650px',
    width: '1350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}) 
const MeterContainer = styled('div', {
    position: 'absolute',
    top: 250,
    left: 250,
    width: '600px', 
    height: '200px',
    display: 'flex', 
    fd: 'column',
    jc: 'center',
    ai: 'stretch',
    gap: '$3',
    border: 'thin solid white'
})


export const Meter = ({ label, showValueLabel = !!label, value, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps, labelProps } = useMeter(props)
  
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;
  
    return (
       
            <MeterContainer {...meterProps}>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                  {label && <span {...labelProps}> <Text> {label} </Text> </span>}
                  {showValueLabel && <span> <Text> {meterProps['aria-valuetext']} </Text> </span>}
                </Flex>

                <Box css={{ height: '30%', width: '100%', background: '$neutral', padding: '$1', border: '2px solid white', br: '$2' }}>
                    <div style={{ width: barWidth, height: '100%', background: 'green'}} />
                </Box>
            </MeterContainer>
       
    );
}
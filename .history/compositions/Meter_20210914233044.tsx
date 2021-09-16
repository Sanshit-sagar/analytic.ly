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
    fd: 'column', 
    jc: 'center', 
    ai: 'center', 
    height: '100%', 
    width: '100%', 
    mt: '25%', 
    ml: '50%', 
    padding: '$2'
})


export const Meter = ({ label, showValueLabel = !!label, value, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps, labelProps } = useMeter(props)
  
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;
  
    return (
        <Flex css={{ fd: 'column', jc: 'center', ai: 'center', height: '100%', width: '100%', mt: '25%', ml: '50%', padding: '$2' }}>
            <Box {...meterProps} style={{ width: 500, height: 200}}>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
                  {label && <span {...labelProps}> <Text> {label} </Text> </span>}
                  {showValueLabel && <span> <Text> {meterProps['aria-valuetext']} </Text> </span>}
                </Flex>

                <Box css={{height: 40, background: '$neutral',  border: '2px solid white', br: '$2' }}>
                    <div style={{ width: barWidth, height: 35, background: 'green'}} />
                </Box>
            </Box>
        </Flex>
    );
}
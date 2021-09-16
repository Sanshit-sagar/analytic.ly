import React, { ReactNode } from 'react' 
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

const MeterText = ({ contents }: string) => <span {...labelProps}> <Text> {label} </Text> </span>

export const Meter = ({ label, showValueLabel = !!label, value, minValue = 0, maxValue = 100 }: AriaMeterProps) => {
    const props = { label, showValueLabel, value, minValue, maxValue }
    let { meterProps, labelProps } = useMeter(props)
  
    let percentage = (value - minValue) / (maxValue - minValue);
    let barWidth = `${Math.round(percentage * 100)}%`;
  
    return (
        <Box {...meterProps} style={{width: 200}}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start' }}>
              {label && <span {...labelProps}> <Text> {label} </Text> </span>}
              {showValueLabel && <span> <Text> {meterProps['aria-valuetext']} </Text> </span>}
            </Flex>

            <Box css={{height: 10, background: '$neutral'}}>
                <div style={{width: barWidth, height: 10, background: 'green'}} />
            </Box>
        </Box>
    );
}
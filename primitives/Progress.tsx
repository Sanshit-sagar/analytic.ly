import React from 'react'
import { styled } from '@stitches/react'

import { Text } from './Text'
import * as ProgressPrimitive from '@radix-ui/react-progress';

// type ProgressColorType = 'green' | 'yellow' | 'orange' | 'red' | 'contrast'
type Progress = { progress: number };

const SECURE = 'SECURE'
const INSECURE = 'INSECURE'

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: 'relative',
  backgroundColor: '$neutral',
  width: '100%',
  height: 8,
  margin: '$4 0 $2 0',
  border: '1px solid $border',
  br: '$4',
  '&:hover': {
      borderColor: '$border3'
  }
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: '$funky',
  height: '100%',
  transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)',
})

const getColor = (p: number) => (p>80) ? 'green' : (p>60) ? 'yellow' : (p>40) ? 'orange' : 'red'
const isSecure = (p: number): boolean => (p>80)

const StyledProgressText = ({ progress = 0 }: Progress) => (
    <Text size='2' css={{ color: getColor(progress) }}>
        {progress}%
    </Text>
)

const StyledStatusText = ({ progress = 0 }: Progress) => (
    <Text size='2' css={{ color: getColor(progress) }}>
        {isSecure(progress) ? SECURE : INSECURE}
    </Text>
)

export const Progress = StyledProgress
export const ProgressIndicator = StyledIndicator
export const ProgressText = StyledProgressText
export const StatusText = StyledStatusText
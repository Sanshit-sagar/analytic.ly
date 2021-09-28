import React from 'react'
import { styled } from '@stitches/react'
import { blackA } from '@radix-ui/colors'

import { Text } from './Text'
import * as ProgressPrimitive from '@radix-ui/react-progress';

type ProgressColorType = 'green' | 'yellow' | 'orange' | 'red' | 'contrast'

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: 'relative',
  bc: '$loContrast',
  border: '1px solid $border',
  br: '$4',
  width: '100%',
  height: 8,
  margin: '$4 0 $2 0',
  '&:hover': {
      borderColor: '$border3'
  }
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: 'white',
  height: '100%',
  transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});

const StyledProgressText = ({ 
    progress, 
    color 
}: { 
    progress: number, 
    color: ProgressColorType 
}) => (
    <Text 
        size='2' 
        css={{ color: color==='contrast' ? '$hiContrast' : color }}
    >
        {progress}%
    </Text>
)

export const Progress = StyledProgress
export const ProgressIndicator = StyledIndicator
export const ProgressText = StyledProgressText
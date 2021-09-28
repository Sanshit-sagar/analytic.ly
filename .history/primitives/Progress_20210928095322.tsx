import React from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: 'relative',
  overflow: 'hidden',
  background: blackA.blackA9,
  borderRadius: '99999px',
  width: '100%',
  height: 8,
  margin: '$4 0 $2 0'
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: 'white',
  height: '100%',
  transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});

const StyledProgressText = ({ progress, color }: { progress: number, color: ColorType }) => {}
    <Text size='2' css={{ color: }}
)

// Exports
export const Progress = StyledProgress;
export const ProgressIndicator = StyledIndicator;

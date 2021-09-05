
import React from 'react';
import { styled } from '../stitches.config';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Slot } from '@radix-ui/react-slot';
import { Box } from './Box';
import { Text } from './Text';

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement;
    content: React.ReactNode;
    multiline?: boolean;
};

const Content = styled(TooltipPrimitive.Content, {
  backgroundColor: '$transparentPanel',
  borderRadius: '$1',
  padding: '$1 $2',

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
});

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root 
        open={open} 
        defaultOpen={defaultOpen} 
        onOpenChange={onOpenChange}
        delayDuration={0}
    >
        <TooltipPrimitive.Trigger as={Slot}>
            {children}
        </TooltipPrimitive.Trigger>

        <Content 
            {...props} 
            side="top" 
            align="center" 
            sideOffset={5} 
            multiline={multiline}
            css={{ 
                backgroundColor: '$hiContrast', 
                color: '$loContrast', 
                border: 'thin solid',
                borderColor: '$border1',
                borderRadius: '$2'
            }}
        >
            <Text
              size="2"
              as="p"
              css={{
                color: '$accentSecondaryContrast',
                fontWeight: 400,
                lineHeight: multiline ? '20px' : undefined,
              }}
            >
              {content}
            </Text>
            <Box css={{ color: '$hiContrast' }}>
              <TooltipPrimitive.Arrow
                offset={5}
                width={11}
                height={5}
                style={{
                  fill: 'currentColor',
                }}
              />
            </Box>
        </Content>
    </TooltipPrimitive.Root>
  );
}
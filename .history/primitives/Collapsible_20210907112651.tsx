import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const StyledCollapsible = styled(CollapsiblePrimitive.Root, { width: 300 });

export const Collapsible = StyledCollapsible;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = CollapsiblePrimitive.Content;

// Your app...
const Flex = styled('div', { display: 'flex' });
const Text = styled('span', {
  fontSize: 15,
  lineHeight: '25px',
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&[data-state="closed"]': { backgroundColor: 'white' },
  '&[data-state="open"]': { backgroundColor: violet.violet3 },
  '&:hover': { backgroundColor: violet.violet3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const Filter = styled('div', {
  backgroundColor: 'white',
  borderRadius: 4,
  margin: '10px 0',
  padding: 10,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});
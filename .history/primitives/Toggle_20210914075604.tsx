import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA, mauve } from '@radix-ui/colors';
import { TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon } from '@radix-ui/react-icons';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import * as TogglePrimitive from '@radix-ui/react-toggle'

const StyledToggle = styled(TogglePrimitive.Root, {
    backgroundColor: 'transparent', 
    color: '$accent',
    border: 'thin solid',
    borderColor: '$accent',
    borderRadius: '5px',
    marginLeft: '$2',
    marginRight: '$2',
    padding: '$1 $2',
    '&[data-state=on]': { 
        color: '$hiContrast'
    },
    '&:hover': {
        color: '$accent',
        backgroundColor: '$accentHover',
        opacity:0.9,
    }
});


const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
    display: 'inline-flex',
    backgroundColor: mauve.mauve6,
    borderRadius: 4,
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
  });
  
  const StyledItem = styled(ToggleGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'white',
    color: mauve.mauve11,
    height: 35,
    width: 35,
    display: 'flex',
    fontSize: 15,
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    '&:first-child': { marginLeft: 0, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
    '&:last-child': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
    '&:hover': { backgroundColor: violet.violet3 },
    '&[data-state=on]': { backgroundColor: violet.violet5, color: violet.violet11 },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
  });
  
  // Exports
export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupButon = StyledItem;

export const ToggleButton = StyledToggle
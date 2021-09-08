import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

const open = keyframes({
    from: { height: 0 },
    to: { height: 'var(--radix-accordion-content-height)' },
});
  
const close = keyframes({
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: 0 },
});

const StyledAccordion = styled(AccordionPrimitive.Root, {
    minWidth: '150px',
    maxWidth: '350px',
    height: '100%',
    backgroundColor: '$loContrast',
    border: '2px solid $accent',
    borderRadius: '$2'
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  marginTop: 1,
  borderBottom: '1px solid $border',
  borderLeft: '1px solid $border',
  borderRight: '1px solid $border',

  '&:first-child': {
    marginTop: 0,
    borderTop: '1px solid $border',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    '&:hover': {
        borderTopColor: '$border3'
    }
  },
  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    '&:hover': {
        borderBottomColor: '$border3'
    }
  },
  '&:hover': {
    borderLeftColor: '$border3',
    borderRightColor: '$border3',
    borderBottomColor: '$border3',
  }
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    bc: 'red',
    padding: '$2 $4',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    lineHeight: 1,
    color: '$accent',
    '&[data-state="open"]': {
        backgroundColor: '$accentDulled',
    }
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: '$panelDark',
  backgroundColor: '$loContrast',
  border: '2px solid $border',

  '&[data-state="open"]': {
    animation: `${open} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${close} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const StyledContentText = styled('div', {
    padding: '$2 $4',
});

const AccordionChevron = styled(ChevronDownIcon, {
    transition: 'transform 300ms',
    '[data-state=open] &': { 
        transform: 'rotate(180deg)' 
    },
});

const StyledAccordianTrigger = React.forwardRef(({ children, ...props }, forwardedRef) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <AccordionChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
));
 
const StyledAccordianContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
));


// Exports
export const Accordion = StyledAccordion
export const AccordionItem = StyledItem
export const AccordionTrigger = StyledAccordianTrigger
export const AccordionContent = StyledAccordianContent
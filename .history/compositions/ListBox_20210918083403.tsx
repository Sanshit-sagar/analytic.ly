/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"
import { styled, keyframes } from '../stitches.config'
import type { Node } from '@react-types/shared'

import { useListBox, useOption, AriaListBoxOptions } from '@react-aria/listbox'
import { CheckboxIcon } from '@radix-ui/react-icons'
import type { ListState } from '@react-stately/list'
import { Text } from '../primitives/Text'

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
}


const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  
const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const List = styled('div', {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { 
                animationName: slideDownAndFade 
            },
            '&[data-side="right"]': { 
                animationName: slideLeftAndFade 
            },
            '&[data-side="bottom"]': { 
                animationName: slideUpAndFade 
            },
            '&[data-side="left"]': { 
                animationName: slideRightAndFade 
            },
        },
    },
});

const ListItem = styled('li', {
    position: 'relative',
    width: '100%',
    color: '$hiContrast',
    border: '1px solid',
    borderColor: '$border',
    borderTop: 'none',
    backgroundColor: '$loContrast',
    display: 'flex',
    fd: 'row',
    jc: 'space-between',
    alignItems: 'stretch',
    padding: '$1 $2',
    userSelect: 'none',
    '&[data-disabled]': {
        color: '$accentContrast',
        pointerEvents: 'none',
    },
    '&:focus': {
        color: '$accentContrast',
        bc: '$accentFull',
        borderColor: '$border3',
    },
    '&:hover': {
        backgroundColor: '$accent',
        borderColor: '$border3',
    },
    '&:first-child': {
        borderTop: 'thin solid $border',
        borderTopRadius: 0,
    },
    "&:last-child": {
        borderBottomRightRadius: '$2',
        borderBottomLeftRadius: '$2',
        borderBottomColor: '$border',
    },
});

export function ListBox(props: ListBoxProps) {
  let ref = React.useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <List {...listBoxProps} ref={listBoxRef}>
        {[...state.collection].map((item) => (
            <Option 
                key={item.key} 
                item={item} 
                state={state} 
            />
        ))}
    </List>
  );
}

interface OptionContextValue {
  labelProps: React.HTMLAttributes<HTMLElement>;
  descriptionProps: React.HTMLAttributes<HTMLElement>;
}

const OptionContext = React.createContext<OptionContextValue>({
  labelProps: {},
  descriptionProps: {}
});

interface IUseOptionsProps {
    optionProps:React. HTMLAttributes<HTMLElement>; 
    labelProps: React.HTMLAttributes<HTMLElement>; 
    descriptionProps: React.HTMLAttributes<HTMLElement>;
    isSelected?: boolean;
    isFocused?: boolean; 
    isPressed?: boolean;
    isDisabled?: boolean;
}

function Option({ item, state }: OptionProps) {
  let ref = React.useRef<HTMLLIElement>(null);
  let {
    optionProps,
    labelProps,
    descriptionProps,
    isSelected,
    isFocused,
} : IUseOptionsProps = useOption({ key: item.key }, state, ref);

  return (
    <ListItem
      {...optionProps}
      ref={ref}
      isFocused={isFocused}
      isSelected={isSelected}
    >
        <OptionContext.Provider value={{ labelProps, descriptionProps }}>
          <Text> {item.rendered} </Text>
        </OptionContext.Provider>
        {isSelected && (<CheckboxIcon  aria-hidden="true" />)}
    </ListItem>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  let { labelProps } = React.useContext(OptionContext);
  return <div {...labelProps}>{children}</div>;
}

const StyledDescription = styled('div', {
  fontWeight: 'normal',
  fontSize: '12px',
});

export function Description({ children }: { children: React.ReactNode }) {
  let { descriptionProps } = React.useContext(OptionContext);
  return (
    <StyledDescription {...descriptionProps}>
        {children}
    </StyledDescription>
  );
}

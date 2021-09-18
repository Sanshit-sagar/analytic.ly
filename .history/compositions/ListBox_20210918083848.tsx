/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"
import type { Node } from '@react-types/shared'

import { useListBox, useOption, AriaListBoxOptions } from '@react-aria/listbox'
import { CheckboxIcon } from '@radix-ui/react-icons'
import type { ListState } from '@react-stately/list'
import { Text } from '../primitives/Text'

import { ListBox, ListBoxItem, ListBoxDescription } from '../'

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
}

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

export function Description({ children }: { children: React.ReactNode }) {
  let { descriptionProps } = React.useContext(OptionContext);
  return (
    <StyledDescription {...descriptionProps}>
        {children}
    </StyledDescription>
  );
}

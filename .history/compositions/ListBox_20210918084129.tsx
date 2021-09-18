/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"
import type { Node } from '@react-types/shared'

import { useListBox, useOption, AriaListBoxOptions } from '@react-aria/listbox'
import type { ListState } from '@react-stately/list'

import { 
    ListBox as ListBoxPrimitive, 
    ListBoxItem, 
    ListBoxDescription 
} from '../primitives/ListBox'

import { Text } from '../primitives/Text'

import { CheckboxIcon } from '@radix-ui/react-icons'

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
    <ListBoxPrimitive {...listBoxProps} ref={listBoxRef}>
        {[...state.collection].map((item) => (
            <Option 
                key={item.key} 
                item={item} 
                state={state} 
            />
        ))}
    </ListBoxPrimitive>
  );
}}

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
    <ListBoxItem
      {...optionProps}
      ref={ref}
      isFocused={isFocused}
      isSelected={isSelected}
    >
        <OptionContext.Provider value={{ labelProps, descriptionProps }}>
          <Text> {item.rendered} </Text>
        </OptionContext.Provider>
        {isSelected && (<CheckboxIcon  aria-hidden="true" />)}
    </ListBoxItem>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  let { labelProps } = React.useContext(OptionContext);
  return <div {...labelProps}>{children}</div>;
}

export function Description({ children }: { children: React.ReactNode }) {
  let { descriptionProps } = React.useContext(OptionContext);
  return (
    <ListBoxDescription {...descriptionProps}>
        {children}
    </ListBoxDescription>
  );
}
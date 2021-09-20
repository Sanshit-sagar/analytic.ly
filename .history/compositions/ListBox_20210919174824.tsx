/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"

import { 
    useListBox, 
    useListBoxSection,
    useOption, 
    AriaListBoxOptions 
} from '@react-aria/listbox'

import type { Node } from '@react-types/shared'
import type { ListState } from '@react-stately/list'
import { useHover } from '@react-aria/interactions'
import { mergeProps } from '@react-aria/utils'
import { HoverEvent } from './interfaces'

import { 
    ListBox as ListBoxPrimitive, 
    ListBoxItem, 
    ListBoxItemLabel,
    ListBoxItemDescription,
    ListBoxSection as ListBoxSectionItem,
    ListBoxSectionLabel,
    ListBoxSectionGroup
} from '../primitives/ListBox'

import { CheckboxIcon, ChevronRightIcon } from '@radix-ui/react-icons'

interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
}

interface SectionProps {
    section: Node<unknown>;
    state: ListState<unknown>;
}

interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
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

export function ListBox(props: ListBoxProps) {
    let ref = React.useRef<HTMLUListElement>(null)
    
    let { listBoxRef = ref, state,  } = props
    let { listBoxProps } = useListBox(props, state, listBoxRef)

    return (
        <ListBoxPrimitive 
            {...listBoxProps} 
            ref={listBoxRef}
        >
            {[...state.collection].map((item) => (
                item.type==='section' ? (
                    <ListBoxSection
                        key={item.key}
                        section={item}
                        state={state}
                    />
                ) : (
                    <Option 
                        key={item.key} 
                        item={item} 
                        state={state} 
                    />
                )
            ))}
        </ListBoxPrimitive>
    )
}

interface IListBoxSectionLabelProps {
    props?: React.HTMLAttributes<HTMLElement>;
    icon?: any; 
    sectionName: string; 
    sectionDescription?: string; 
    minimize: boolean; 
    href?: any; 
}


function ListBoxSection({ section, state }: SectionProps) {
    
    let { itemProps, headingProps, groupProps } = useListBoxSection({
        heading: section.rendered,
        'aria-label': section['aria-label']
    });
    

    return (
        <ListBoxSectionItem {...itemProps}>
            {section.rendered && (
                <ListBoxSectionLabel 
                    props={headingProps} 
                    icon={<ChevronRightIcon />}
                    sectionName={section.rendered}
                    sectionDescription={'this is a description'} 
                    href={'https://sanshitsagar.com'}
                    minimize={false} 
                >
                    {section.rendered}
                </ListBoxSectionLabel>
            )}
            <ListBoxSectionGroup {...groupProps}>
                {[...section.childNodes].map((node) => (
                    <Option 
                        key={node.key} 
                        item={node} 
                        state={state} 
                    />
                ))}
            </ListBoxSectionGroup>
        </ListBoxSectionItem>
    )
}

function Option({ item, state }: OptionProps) {
  let ref = React.useRef<HTMLLIElement>(null)

    let {
        optionProps,
        labelProps,
        descriptionProps,
        isSelected,
        isFocused,
        isDisabled,
        isPressed
    } : IUseOptionsProps = useOption({ key: item.key }, state, ref);
    
    // todo : set props for context above
    let { hoverProps, isHovered } = useHover({
        onHoverStart: (_: HoverEvent) => console.log(`hovering: ${item.key}`),
        onHoverEnd: (_: HoverEvent) => console.log(`hovering: ${item.key}`),
    });

    return (
        <ListBoxItem
            ref={ref}
            props={mergeProps(optionProps, hoverProps)}
            isHovered={isHovered}
            isFocused={isFocused}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isPressed={isPressed}
        >
            <OptionContext.Provider 
                value={{ labelProps, descriptionProps }}
            >
                 {item.rendered} 
            </OptionContext.Provider>

            {isSelected && (
                <CheckboxIcon aria-hidden="true" />
            )}
        </ListBoxItem>
    );
}

export function Label({ itemName }: { itemName: string  }) {
    let { labelProps } = React.useContext(OptionContext);
    return (
        <ListBoxItemLabel 
            props={labelProps} 
            leftSlot={children} 
        /> 
    );
}

export function Description({ children }: { children: React.ReactNode }) {
    let { descriptionProps } = React.useContext(OptionContext);
    return (
        <ListBoxItemDescription
            props={descriptionProps} 
            leftSlot={'leftSlot'}
            middleSlot={'middleSlot'}
            rightSlot={'rightSlot'}
        />
    );
}

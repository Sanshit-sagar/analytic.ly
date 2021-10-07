import React from 'react'
import { PrimitiveAtom, useAtom } from 'jotai'

import { 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectRadioGroup, 
    SelectRadioItem
} from '../primitives/Select'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { SelectionOption } from './interfaces'

import { ChevronDownIcon } from '@radix-ui/react-icons'

interface IntervalProps {
    menuName: string;
    openAtom: PrimitiveAtom<boolean>;
    selectedIndexAtom: PrimitiveAtom<number>; 
    selectionOptions: SelectionOption[];
}

export const Select = ({ 
    menuName, 
    openAtom, 
    selectedIndexAtom,
    selectionOptions,
}: IntervalProps) => {    

    const [selectOpen, setSelectOpen] = useAtom(openAtom)
    const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom); 
           
    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
            <SelectRoot
                open={selectOpen || false}
                onOpenChange={() => setSelectOpen(!selectOpen)}
            >
                <SelectTrigger>
                    <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'stretch', gap: '$3' }}>
                        {selectionOptions[selectedIndex].label} 
                        <ChevronDownIcon />
                    </Flex>
                </SelectTrigger>

                <SelectContent>
                    <SelectRadioGroup>
                        {selectionOptions.map((option: SelectionOption, index: number) => {
                            return (
                                <SelectRadioItem
                                    key={index}
                                    onSelect={() => setSelectedIndex(index)}
                                    css={{ textTransform: 'uppercase' }}
                                >
                                    <Text size='1'>{option.label}</Text> 
                                </SelectRadioItem>
                            );
                        })}
                    </SelectRadioGroup>
                </SelectContent>
            </SelectRoot>
        </Flex>
    )
} 



export function ListBox(props: ListBoxProps) {
    let ref = React.useRef<HTMLUListElement>(null)
    
    let { listBoxRef = ref, state,  } = props
    let { listBoxProps } = useListBox(props, state, listBoxRef)

    return (
    <ScrollArea>
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
                        deleteItem={props.deleteItem}
                    />
                )
            ))}
        </ListBoxPrimitive>
    </ScrollArea>
    )
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

function Option({ key, item, state, deleteItem }: OptionProps) {
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
            <OptionContext.Provider value={{ labelProps, descriptionProps }}>
                 <Text size='1'> 
                    {item.rendered} 
                </Text> 
            </OptionContext.Provider>

        
            <Flex css={{ width: '100%', fd: 'row', jc: 'flex-end', ai: 'center', gap: '$1' }}>
                {isSelected && (
                    <Text css={{  color: isHovered ? 'green' : '$funkyText',  mt: '1px' }}>
                        <CheckboxIcon aria-hidden="true" />
                    </Text>
                )}
                {isHovered && (
                    <Tooltip content={'Delete'}>
                        <Text 
                            onClick={() => deleteItem(item.key)}
                            css={{  color: isHovered ? 'red' : '$funkyText',  mt: '1px' }}
                        >
                            <TrashIcon /> 
                        </Text>
                    </Tooltip>
                )}
            </Flex>
        </ListBoxItem>
    );
}

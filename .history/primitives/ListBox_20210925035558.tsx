import React from 'react'

import { styled, keyframes } from '../stitches.config'
import { Text } from './Text'
import { Flex } from './Flex'


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


const List = styled('ul', {
    width: 'inherit',
    height: 'inherit',
    mb: '$2',
    backgroundColor: 'transparent',
    outline: 'none',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-start',
    margin: 0,
    padding: 0,
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
    border: '1px solid $border',
    borderTop: 'none',
    bc: '$panel',
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

interface ICustomListItemProps {
    props: React.HTMLAttributes<HTMLElement>; 
    ref: React.RefObject<HTMLLIElement>; 
    isFocused: boolean; 
    isPressed: boolean; 
    isHovered: boolean; 
    isSelected: boolean; 
    isDisabled: boolean;
    children: any;
};

const AriaListItem = ({ props, ref, isFocused, isPressed, isSelected, isHovered, isDisabled, children }: ICustomListItemProps) => (
    <ListItem 
        {...props} 
        ref={ref}
        css={{ 
            border:'thin solid $border', 
            bc: isHovered ? '$darkestPanel' : '$panel',
            borderColor: isFocused ? '$funkyText' : isSelected ? '$border3' : '$border',
            // isSelected ? '$border' : isHovered ? '$accentHover' :  isPressed ? '$accentPressed' : isDisabled ? '$canvas' : '$accent',
            borderLeft: isSelected ? '5px solid $border3' : 'none',
            borderRight: 'none'
        }}
    >
        <Text 
            size='1'
            css={{ 
                color: '$text',
                width: '100%', 
                display: 'flex', 
                fd: 'justifyContent', 
                jc: 'space-between', 
                ai: 'flex-start',
                fontSize: '11px'
            }}
        >
            {children} 
        </Text>
    </ListItem>
);

export const ListBoxSection = styled('ul', {
    width: '100%',
    height: '100%',
    marginTop: '$1',
    padding: '0px',
    bc: '$neutral',
    color: '$hiContrast',
})

export const ListBoxSectionGroup = styled('div', {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column', 
    bc: '$accent',
    color: '$text',
    jc: 'flex-start',
    mt: '$1'
});

interface IListBoxSectionLabelProps {
    children: true | React.ReactChild | React.ReactFragment | React.ReactPortal;
    props: React.HTMLAttributes<HTMLElement>; 
    icon: Element; 
    sectionName: true | React.ReactChild | React.ReactFragment | React.ReactPortal;
    sectionDescription?: string; 
    href: string; 
    minimize?: boolean;
}

interface IMinimizableDescriptionProps { 
    text: string | undefined;
    isMinimized: boolean; 
    toggleMinimize: () => void; 
}


const MinimizableDescription = ({ text, isMinimized, toggleMinimize }: IMinimizableDescriptionProps) => (
    <> 
        {!text || !text?.length ? null :
            <Text 
                css={{ 
                    textOverflow: 'ellipses', height: '15px', width: '100%', fontSize: '8px',
                    color: '$text', display: 'flex', fd: 'row', jc: 'flex-start', ai: 'flex-start' 
                }}
            >
               {text}
            </Text> 
        }
    </>
)

export const ListBoxSectionLabel = ({ 
    props, 
    icon, 
    sectionName, 
    sectionDescription, 
    minimize = false, 
    href 
}: IListBoxSectionLabelProps) => {

    const [isMinimized, setIsMinimized] = React.useState(false)

    const toggleMinimize = () => setIsMinimized(!isMinimized)

    return (
        <Flex 
            css={{ 
                height: '100%', width: '80%', display: 'flex', fd: 'column', 
                jc: 'flex-start', ai: 'flex-start', gap: '1px', ml: '$2', mt: '$2'
            }}
        >
           
            <Text 
                {...props}
                size='2'
                css={{ 
                    fontWeight: 'bolder', textTransform: 'uppercase', color: '$funkyText', fontSize: '0.75em', 
                    display: 'flex', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1', mb: '$2',
                }}
            >
                <> {href?.length  ? <a href={href}>  {sectionName}S </a> : {sectionName}} </>
                {icon || ''} 
            </Text>
            

          {isMinimized &&  (
            <MinimizableDescription 
                text={sectionDescription} 
                isMinimized={isMinimized} 
                toggleMinimize={toggleMinimize}
            /> )}
        </Flex> 
    )
}

interface IListBoxItemProps {
    leftSlot?: string;
    rightSlot?: string; 
    props: any;
};

interface IListBoxItemLabelProps {
    itemName: string;
    props: any; 
};

export const ListBoxItemDescription = ({ leftSlot, rightSlot, props }: IListBoxItemProps) => (
    <label {...props}>
        <Text 
            css={{ display: 'flex', fd: 'row', jc: 'space-between', 
                ai: 'center', fontStyle: 'oblique', fontWeight: 'lighter',
                color: '$text',  margin: 0, padding: 0, fontSize: '1em', width: '100%'
            }}
        > 
            {leftSlot} 
        </Text>
    </label>
);

export const ListBoxItemLabel = ({ itemName, props }: IListBoxItemLabelProps) => (
    <Text 
        {...props} 
        size='2' /* eslint-disable @typescript-eslint/no-use-before-define */
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
        
        import { ScrollArea } from '../primitives/ScrollArea'
        
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
                    itemName={itemName} 
                /> 
            );
        }
        
        export function Description({ leftSlot, rightSlot }: { leftSlot:string;  rightSlot: string; }) {
            let { descriptionProps } = React.useContext(OptionContext);
            return (
                <ListBoxItemDescription
                    props={descriptionProps} 
                    leftSlot={leftSlot}
                    rightSlot={rightSlot}
                />
            );
        }
        
        css={{ 
            color: '$funkyText', ml: '1px', mt: '1px', mb: '$1', 
            width: '100%', display: 'flex', fd: 'row', jc: 'space-between', ai: 'flex-start'
        }}
    >
        {itemName}
    </Text>
);

export const ListBox = List
export const ListBoxItem = AriaListItem
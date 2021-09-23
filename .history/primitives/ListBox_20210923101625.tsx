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
    maxHeight: '150px',
    backgroundColor: 'transparent',
    outline: 'none',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-start',
    marginTop: 0,
    marginBottom: 0,
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
    color: 'transparent',
    bc: '$panel',
    display: 'flex',
    fd: 'row',
    jc: 'space-between',
    alignItems: 'stretch',
    padding: '$2 $5',
    userSelect: 'none',
    '&[data-disabled]': {
        color: '$accentContrast',
        pointerEvents: 'none',
    },
    '&:first-child': {
        borderTop: 'none',
        borderTopRadius: 0,
    },
    "&:last-child": {
        borderBottomRightRadius: '$2',
        borderBottomLeftRadius: '$2',
        borderBottomColor: '$border',
        marginBottom: 0
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

export const AriaListItem = ({ props, ref, isFocused, isPressed, isSelected, isHovered, isDisabled, children }: ICustomListItemProps) => (
    <ListItem 
        {...props} 
        ref={ref}
        css={{ 
            width: '100%',
            border:'thin solid $border', 
            bc: isHovered ? '$accentDulled' : '$loContrast',
            borderColor: isFocused ? '$border3' : '$border',
            borderTop: 'none',
            padding: '$1 $2',
            // isSelected ? '$border' : isHovered ? '$accentHover' :  isPressed ? '$accentPressed' : isDisabled ? '$canvas' : '$accent',
            // borderLeft: isSelected ? '1px solid $border3' : '1px solid $border',
        }}
    >
        <Text 
            size='$2'
            css={{ 
                color: '$text',
                width: '100%', 
                display: 'flex', 
                fd: 'justifyContent', 
                jc: 'space-between', 
                ai: 'flex-start'
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
        size='2' 
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
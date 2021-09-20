import React from 'react'

import { styled, keyframes } from '../stitches.config'
import { Text } from './Text'
import { Flex } from './Flex'
import { Icon } from './Icon'

import { DotFilledIcon } from '@radix-ui/react-icons'

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
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'auto',
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
            bc: isHovered ? '$neutral' : '$panel',
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
    margin: 0,
    padding: 0,
    bc: '$neutral',
    color: '$hiContrast',
    '&:hover': {
        color: '$hiContrast'
    }
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
    ai: 'stretch',
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
            <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$1' }}>
                <Text 
                    {...props}
                    size='2'
                    css={{ 
                        fontWeight: 500, textTransform: 'uppercase', color: '$funkyText', fontSize: 10, 
                        display: 'flex', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$2', mb: '$2',
                        textDecoration: 'underline', textDecorationColor: '$text'
                    }}
                >
                    <> {href?.length  ? <a href={href}>  {sectionName}S </a> : {sectionName}} </>
                </Text>

                <Icon label={'External link'}>
                    {icon || ''} 
                </Icon> 
            </Flex>

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

        <Flex 
            css={{ width: '100%', display: 'flex', flexDirection: 'row', jc: 'space-between', ai: 'center',
                gap: '$1', flexWrap: 'nowrap' 
            }}
        > 
            <Text size='1' css={{ color: '$text' }}> 
                {leftSlot} 
            </Text>
        
            <p style={{ color: 'green', paddingTop: '$1', fontSize: '0.25em', fontStyle: 'oblique', fontWeight: 'lighter' }}> 
                hihi
            </p>
        </Flex>
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
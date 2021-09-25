import React from 'react'

import { styled, keyframes } from '../stitches.config'
import { Text } from './Text'
import { Flex } from './Flex'


export interface SectionLabelProps {
    children: React.ReactNode; 
    props: React.HTMLAttributes<HTMLElement>; 
    icon: React.ReactNode; 
    sectionName: string | React.ReactNode;
    sectionDescription?: string; 
    href: string; 
    minimize?: boolean;
}

export interface ListItemProps {
    props: React.HTMLAttributes<HTMLElement>; 
    ref: React.RefObject<HTMLLIElement>; 
    isFocused: boolean; 
    isPressed: boolean; 
    isHovered: boolean; 
    isSelected: boolean; 
    isDisabled: boolean;
    children: any;
};

export interface SectionDescriptionProps { 
    text: string | undefined;
    isMinimized: boolean; 
    toggleMinimize: () => void; 
};

interface DescriptionProps {
    text: string; 
    isMinimized: boolean;
    toggleMinimize: () => void; 
};


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


const StyledList = styled('ul', {
    maxHeight: '150px',
    backgroundColor: 'transparent',
    outline: 'none',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-start',
    marginTop: 0,
    marginBottom: '$2',
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

const StyledItem = styled('li', {
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

const StyledText = styled(Text, {
    color: '$text',
    width: '100%', 
    height: '4.25em',
    display: 'flex', 
    fd: 'justifyContent', 
    jc: 'space-between', 
    ai: 'flex-start', 
    fontSize: '$2',
});

export const StyledSection = styled('ul', {
    width: '100%',
    height: '100%',
    marginTop: '$1',
    padding: '0px',
    bc: '$neutral',
    color: '$hiContrast',
})

export const Ste = styled('div', {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column', 
    bc: '$accent',
    color: '$text',
    jc: 'flex-start',
    mt: '$1',
    fontSize: '$2'
});

export const StyledDescription = styled(Text, {
    textOverflow: 'ellipses', 
    height: '15px', 
    width: '100%', 
    color: '$text', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'flex-start', 
    fontSize: '$1'
}) 

export const StyledLabel = styled(Text, {
    color: '$funkyText', 
    ml: '1px',
    mt: '1px', 
    mb: '$1', 
    width: '100%', 
    display: 'flex', 
    fd: 'row', 
    jc: 'space-between', 
    ai: 'flex-start'
})

export const AriaListItem = ({ 
    props, 
    ref,
    isFocused, 
    isHovered, 
    isPressed, 
    isSelected, 
    isDisabled, 
    children 
}: ListItemProps) => (
    <StyledItem 
        {...props} 
        ref={ref}
        css={{
            border:'thin solid $border', 
            bc: isHovered ? '$accentDulled' : '$loContrast',
            borderColor: isFocused ? '$border3' : '$border',
            borderTop: 'none'
        }}
    >
        <StyledText> {children} </StyledText>
    </StyledItem>
);

const MinimizableDescription = ({ 
    text, 
    isMinimized, 
    toggleMinimize 
}: DescriptionProps) => (
    text?.length ? <StyledDescription> {text} </StyledDescription> : null
);

export const ListBoxSectionLabel = ({ 
    props, 
    icon, 
    sectionName, 
    sectionDescription, 
    minimize = false, 
    href 
}: StyledLabelProps) => {

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
    slot: string | React.ReactNode; 
    props: HTMLAttributes<HTMLLabelElement>;
};

interface IListBoxItemLabelProps {
    itemName: string;
    props: any; 
};

export const ListBoxItemDescription = ({ slot, props }: IListBoxItemProps) => (
    <Label {...props}>
       <StyledDescription> {slot} </StyledDescription> 
    </Label>
);

export const ListBoxItemLabel = ({ itemName, props }: IListBoxItemLabelProps) => (
    <StyledSectionLabel {...props}>{itemName}</StyledSectionLabel>
);

export const ListBox = List
export const ListBoxItem = AriaListItem
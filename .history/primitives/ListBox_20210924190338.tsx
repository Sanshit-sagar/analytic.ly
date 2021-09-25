import React from 'react'
import Link from 'next/link'

import { Text } from './Text'
import { styled, keyframes } from '../stitches.config'

export interface SectionProps {
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

export interface DescriptionProps { 
    text: string | undefined;
    isMinimized: boolean; 
    toggleMinimize: () => void; 
};

interface ItemLabelProps {
    interface: ItemLabelProps;
    props: React.HTMLAttributes<HTMLLabelElement>;
    icon: React.ReactNode | null; 
    sectionName: string;
    sectionDescription: string;
    minimize: boolean; 
    href: string; 
}

export const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
export const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  });
  
export const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
export const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
})

const StyledList = styled('ul', {
    maxHeight: '150px',
    bc: 'transparent',
    outline: 'none',
    display: 'flex',
    fd: 'column',
    jc: 'flex-start',
    ai: 'flex-start',
    mt: 0,
    mb: '$2',
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
})

export  const StyledItem = styled('li', {
    bc: '$panel',
    color: 'transparent',
    position: 'relative',
    display: 'flex',
    fd: 'row',
    jc: 'space-between',
    ai: 'stretch',
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

export const StyledText = styled(Text, {
    color: '$text',
    width: '100%', 
    height: '4.25em',
    display: 'flex', 
    fd: 'column', 
    jc: 'flex-start', 
    ai: 'stretch',
    fontSize: '$2',
    gap: 0, 
});

export const StyledSection = styled('ul', {
    width: '100%',
    height: '100%',
    marginTop: '$1',
    padding: '0px',
    bc: '$neutral',
    color: '$hiContrast',
})

export const SectionWrapper = styled('div', {
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

export const StyledItemLabel = styled(Text, {
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


export const SectionFieldset = styled('fieldset', {
    height: '100%', 
    width: '80%',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'flex-start', 
    gap: '1px', 
    ml: '$2', 
    mt: '$2'
})

export const SectionLabelName = styled('label', {
    fontWeight: 'bolder', 
    textTransform: 'uppercase', 
    color: '$funkyText', 
    fontSize: '0.75em', 
    display: 'flex', 
    fd: 'row', 
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1', 
    mb: '$2'
});

export const AriaListItem = ({ 
    props, 
    ref,
    isFocused, 
    isHovered, 
    // isPressed, 
    // isSelected, 
    // isDisabled, 
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

const ResponsiveDescription = (props: DescriptionProps) => (
        props?.text?.length  ? <StyledDescription> {props.text} </StyledDescription> : null
);

export const SectionLabelGroup = ({ 
    props, 
    icon, 
    sectionName, 
    sectionDescription, 
    minimize = true, 
    href 
}: ItemLabelProps) => {

    const [isMinimized, setIsMinimized] = React.useState(minimize)

    const toggleMinimize = () => setIsMinimized(!isMinimized)

    return (
        <SectionFieldset>
            <SectionLabelName {...props}>
                {sectionName?.length 
                ? <Link href={href}> {sectionName} </Link> 
                : {icon}} 
            </SectionLabelName>
    
          {isMinimized &&  (
            <ResponsiveDescription 
                text={sectionDescription} 
                isMinimized={isMinimized} 
                toggleMinimize={toggleMinimize}
            /> )}
        </SectionFieldset> 
    );
}

export const ListBox = StyledList 
export const ListBoxItem = AriaListItem
export const ListBoxSection = SectionLabelGroup
export const LbResponsiveDescription = ResponsiveDescription
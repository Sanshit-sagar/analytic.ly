
import { styled, keyframes } from '../stitches.config'


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

const StyledDescription = styled('div', {
    fontWeight: 'normal',
    fontSize: '12px',
});
  

export 
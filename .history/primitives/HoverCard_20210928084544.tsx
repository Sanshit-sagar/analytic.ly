import { styled, keyframes } from '@stitches/react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { 
        opacity: 0, 
        transform: 'translateX(-2px)' 
    },
    '100%': { 
        opacity: 1, 
        transform: 'translateX(0)' 
    },
})

const slideDownAndFade = keyframes({
    '0%': { 
        opacity: 0, 
        transform: 'translateY(-2px)' 
    },
    '100%': { 
        opacity: 1, 
        transform: 'translateY(0)' 
    },
})

const slideLeftAndFade = keyframes({
    '0%': { 
        opacity: 0, 
        transform: 'translateX(2px)' 
    },
    '100%': { 
        opacity: 1, 
        transform: 'translateX(0)' 
    },
})

const StyledContent = styled(HoverCardPrimitive.Content, {
    borderRadius: 6,
    padding: 20,
    width: 300,
    backgroundColor: '$accent',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
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

const StyledArrow = styled(HoverCardPrimitive.Arrow, {
    fill: 'white',
})

// const IconTrigger = styled('a', {
//     all: 'unset',
//     cursor: 'pointer',
//     borderRadius: '100%',
//     display: 'inline-block',
//     '&:focus': { 
//         boxShadow: `0 0 0 2px white` 
//     },
// })

const HoverCard = ({ 
    openDelay = 700,
    closeDelay = 300,
}: { 
    openDelay: number; 
    closeDelay: number; 
    open: boolean; 
    onOpenChange: () => void;
}) => {

}

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardContent = StyledContent;
export const HoverCardArrow = StyledArrow; 
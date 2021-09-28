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

const slideDown = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  });
  
const slideUp = keyframes({
'0%': { opacity: 0, transform: 'translateY(10px)' },
'100%': { opacity: 1, transform: 'translateY(0)' },
});
const scaleIn = keyframes({
'0%': { opacity: 0, transform: 'scale(0)' },
'100%': { opacity: 1, transform: 'scale(1)' },
});
  
  

const StyledContent = styled(HoverCardPrimitive.Content, {
    borderRadius: 6,
    padding: 20,
    width: 300,
    backgroundColor: '$accent',
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    
    '@media (prefers-reduced-motion: no-preference)': {
        '&[data-side="top"]': { 
            animationName: slideUp 
        },
        '&[data-side="bottom"]': { 
            animationName: slideDown 
        },
        animationDuration: '0.6s',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'var(--radix-hover-card-content-transform-origin)',
        animation: `${scaleIn} 0.5s ease-out`,
    },
})

const StyledArrow = styled(HoverCardPrimitive.Arrow, {
    fill: 'white',
})

export const HoverCard = ({ 
    openDelay = 700,
    closeDelay = 300,
    children
}: { 
    openDelay: number; 
    closeDelay: number; 
    children: React.ReactNode;
}) => (
    <HoverCardPrimitive.Root
        openDelay={openDelay}
        closeDelay={closeDelay}
    >
        {children}
    </HoverCardPrimitive.Root>
); 

export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export const HoverCardContent = StyledContent;
export const HoverCardArrow = StyledArrow; 
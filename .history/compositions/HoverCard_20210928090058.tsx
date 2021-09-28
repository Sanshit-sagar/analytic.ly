import { Fragment } from 'react'
import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardContent,
    HoverCardArrow
} from '../primitives/HoverCard'

// type HoverSideType = 'top' | 'bottom' | 'left' | 'right';
// type HoverAlignType = 'start' | 'end' | 'center'

export const HoverCard = ({ 
    trigger, 
    content 
}: { 
    trigger: React.ReactNode; 
    content: React.ReactNode; 
}) => {

    return (
        <HoverCardPrimitive 
            openDelay={0} 
            closeDelay={500}
        >
            <HoverCardTrigger asChild>
                {trigger}
            </HoverCardTrigger>

            <HoverCardContent 
                sideOffset={5} 
                side={'top'}
                avoidCollisions={true}
                align={'center'}
                alignOffset={0}
                // collisionTolerance={0}
            >
                <Fragment>  
                    {content} 
                </Fragment> 
                <HoverCardArrow />
            </HoverCardContent>
        </HoverCardPrimitive>
    )
}
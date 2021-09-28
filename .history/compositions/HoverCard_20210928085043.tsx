import { Fragment } from 'react'
import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardContent,
    HoverCardArrow
} from '../primitives/HoverCard'

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

            <HoverCardContent sideOffset={5}>
                 <Fragment>  {content} </Fragment> 
                <HoverCardArrow />
            </HoverCardContent>
        </HoverCardPrimitive>
    )
}
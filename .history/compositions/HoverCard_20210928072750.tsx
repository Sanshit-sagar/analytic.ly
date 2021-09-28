import { Flex } from '../primitives/Flex'
import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardContent,
    HoverCardArrow,
    HoverCardTriggerIcon
} from '../primitives/HoverCard'



export const HoverCard = ({ 
    trigger, 
    content 
}: { 
    trigger: React.ReactNode; 
    content: React.ReactNode; 
}) => {

    return (
        <HoverCardPrimitive>
            <HoverCardTrigger asChild>
                {trigger}
            </HoverCardTrigger>

            <HoverCardContent sideOffset={5}>
                <Flex css={{ flexDirection: 'column', gap: 7 }}>
                   {content} 
                </Flex>
                <HoverCardArrow />
            </HoverCardContent>
        </HoverCardPrimitive>
    )
}
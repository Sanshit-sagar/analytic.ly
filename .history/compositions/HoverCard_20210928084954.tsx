import { Flex } from '../primitives/Flex'
import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardContent,
    HoverCardArrow
} from '../primitives/HoverCard'

export const HoverCard = ({ 
    label,
    trigger, 
    content 
}: { 
    label: string; 
    trigger: React.ReactNode; 
    content: React.ReactNode; 
}) => {

    return (
        <HoverCardPrimitive 
            openDelay={0} 
            closeDelay={500}>
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
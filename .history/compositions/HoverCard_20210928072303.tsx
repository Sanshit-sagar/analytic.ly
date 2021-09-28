import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardContent,
    HoverCardArrow 
} from '../primitives/HoverCard'

const HoverCard = ({ trigger, }) => {

    return (
        <HoverCardPrimitive>
            <HoverCardTrigger asChild>
                {trigger}
            </HoverCardTrigger>

            <HoverCardContent sideOffset={5}>
                <Flex css={{ flexDirection: 'column', gap: 7 }}>
                   
                </Flex>
                <HoverCardArrow />
            </HoverCardContent>
        </HoverCardPrimitive>
    )
}
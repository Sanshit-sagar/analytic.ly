import { Flex } from '../primitives/Flex'
import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardContent,
    HoverCardArrow 
} from '../primitives/HoverCard'

const ImageTrigger = styled('a', {
    all: 'unset',
    cursor: 'pointer',
    borderRadius: '100%',
    display: 'inline-block',
    '&:focus': { boxShadow: `0 0 0 2px white` },
  });

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
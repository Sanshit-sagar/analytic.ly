import { 
    HoverCard as HoverCardPrimitive, 
    HoverCardTrigger, 
    HoverCardArrow 
} from '../primitives/HoverCard'

const HoverCard = () => {

    return (
        <HoverCardPrimitive>
            <HoverCardTrigger asChild>
                <ImageTrigger href="https://twitter.com/radix_ui" target="_blank" rel="noreferrer noopener">
                    <Img src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png" />
                </ImageTrigger>
            </HoverCardTrigger>

            <HoverCardContent sideOffset={5}>
                <Flex css={{ flexDirection: 'column', gap: 7 }}>
                    <Img
                    size="large"
                    src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                    />
                    <Flex css={{ flexDirection: 'column', gap: 15 }}>
                    <Text>
                        <Text bold>Radix</Text>
                        <Text faded>@radix_ui</Text>
                    </Text>
                    <Text>
                        Components, icons, colors, and templates for building high-quality, accessible UI. Free
                        and open-source.
                    </Text>
                    <Flex css={{ gap: 15 }}>
                        <Flex css={{ gap: 5 }}>
                        <Text bold>0</Text> <Text faded>Following</Text>
                        </Flex>
                        <Flex css={{ gap: 5 }}>
                        <Text bold>2,900</Text> <Text faded>Followers</Text>
                        </Flex>
                    </Flex>
                    </Flex>
                </Flex>
                <HoverCardArrow />
            </HoverCardContent>
        </HoverCardPrimitive>
    )
}
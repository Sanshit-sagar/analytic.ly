import { Flex } from '../primitives/Flex'
import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <Flex css={{ width: '100%', height: '100vh', fd: 'row', jc: 'space-between', ai: 'stretch', gap: 0}}>
            <Flex css={{ width: '20%', height: '100%', display: 'flex', fd: 'column', jc: 'space-between', ai:'stretch'}}>
                {children}
            </div>
            <Flex css={{ width: '80%', height: '100%', display: 'flex', jc: 'stretch', ai: 'stretch'}}>
                <SteamGraph />
            </Flex>
        </Flex>
    );
}
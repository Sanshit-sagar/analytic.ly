import { Flex } from '../primitives/Flex'
import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <Flex css={{ width: '100%', height: '100vh', fd: 'row', jc: 'flex-start', ai: 'stretch', gap: 0}}>
            <div className="sidebar">
                {children}
            </div>
            
            <SteamGraph />
        </Flex>
    );
}
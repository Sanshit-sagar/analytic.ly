import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <div 
            style={{ 
                height: '100vh', 
                width: '100%',
                overflowY: 'hidden',
                overflowX: 'hidden',
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'stretch' 
            }}
        >
            <div style={{ height: '100vh', width: '300px'}}>
                {children}
            </div>
            <div style={{ height: '100vh', width: '900px', marginLeft: '10px'}}>
                <SteamGraph />
            </div>
        </div>
    );
}
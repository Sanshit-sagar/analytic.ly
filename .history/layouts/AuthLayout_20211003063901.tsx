import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode;
    pageMetadata: M
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
            <div style={{ height: '100vh', width: '460px', backgroundColor: 'white' }}>
                {children}
            </div>
            <div style={{ height: '100vh', width: '1000px'}}>
                <SteamGraph />
            </div>
        </div>
    );
}
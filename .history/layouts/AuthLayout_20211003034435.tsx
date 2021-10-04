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
                width: '1500px', 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'stretch' 
            }}
        >
            <div className='sidebar'>
                {children}
            </div>
            <div style={{ height: '100vh', width: '900px', }}>
                <SteamGraph />
            </div>
        </div>
    );
}
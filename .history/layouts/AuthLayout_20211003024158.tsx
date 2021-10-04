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
            <div 
                style={{ 
                    width: '200px', 
                    height: '100vh', 
                    float: 'left' 
                }}
            >
                {children}
            </div>
            <div>
                <SteamGraph />
            </div>
        </div>
    );
}
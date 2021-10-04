import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
            <div style={{ width: '300px', height: '100%', float: 'left' }}>
                {children}
            </div>
            <div style={{ width: '1000px', float: 'right' }}>
                <SteamGraph />
            </div>
        </div>
    );
}
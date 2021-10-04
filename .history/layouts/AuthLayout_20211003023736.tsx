import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div className="sidebar">
                {children}
            </div>
            <div style={{ width: '1000px', float: 'right' }}>
                <SteamGraph />
            </div>
        </div>
    );
}
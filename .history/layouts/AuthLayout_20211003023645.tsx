import { SteamGraph } from '../components/SteamGraph'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
        <div className='container'>
            <div className="sidebar">
                {children}
            </div>
            <
            <SteamGraph />
        </div>
    );
}
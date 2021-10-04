import { styled } from '../stitches.config'
import { SteamGraph } from '../components/SteamGraph'

const AuthContainer = styled('div', {

})

export function AuthLayout({ 
    children,
    pageMetadata
}: { 
    children: React.ReactNode;
    pageMetadata: { 
        [key: string]: string 
    }; 
}) {

    return (
        <div 
            style={{ 
               
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
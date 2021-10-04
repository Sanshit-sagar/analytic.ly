import { styled } from '../stitches.config'
import { SteamGraph } from '../components/SteamGraph'

const AuthContainer = styled('div', {
    height: '100vh', 
    width: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'stretch' 
});

const ClerkFormSidebar = styled('div', {
    height: '100vh', 
    width: '460px', 
    backgroundColor: 'white'
});

const SteamGraphWrapper = styled('div', {
    height: '100vh', 
    width: '1000px'
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
    const metadata = {
        title: 'sign up for analytic.ly',
        description: 'more than just another url shortener',
        cardImage:'',
       ...pageMetadata,
    }

    return (
        <AuthContainer>
            <ClerkFormSidebar>
                {children}
            </ClerkFormSidebar>
            <SteamGraphWrapper>
                <SteamGraph />
            </SteamGraphWrapper>
        </AuthContainer>
    );
}
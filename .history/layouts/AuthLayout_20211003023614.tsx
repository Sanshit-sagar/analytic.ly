import Image from 'next/image'
import { Flex } from '../primitives/Flex'
import authbg from '../public/images/authbg.png'
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
            <SteamGraph />
        </div>
    );
}
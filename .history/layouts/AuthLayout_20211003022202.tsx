import Image from 'next/image'
import authbg from '../public/images/authbg.png'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
      <div className="container">
        <div className="sidebar">{children}</div>
        <div className='cover"></div>
      </div>
    );
}
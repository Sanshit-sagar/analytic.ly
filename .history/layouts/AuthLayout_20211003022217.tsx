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
        <Image 
            src={authbg}
            alt='Authentication Screen'
        /> 
      </div>
    );
}
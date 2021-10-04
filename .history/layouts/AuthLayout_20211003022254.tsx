import Image from 'next/image'
import authbg from '../public/images/authbg.png'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {

    return (
      <Flex css={{ width: '100%', height: '100%', fd: 'row', jc: 'flex-start', ai: 'stretch', gap: 0}}>
        <div className="sidebar">{children}</div>
        <Image 
            src={authbg}
            alt='Authentication Screen'
        /> 
      </Flex>
    );
}
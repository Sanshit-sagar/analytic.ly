export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
      <div className="container">
        <div className="sidebar">{children}</div>
        <Image 
            src={'/images/authbg'}
            alt='Authentication Screen'}
            height={'100vh'}
            width={'1000px'}
        /> 
      </div>
    );
}

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
      <div className="container">
        <div className="sidebar">{children}</div>
        <Image 
            src=
            alt='Authentication Screen'
            
      </div>
    );
}
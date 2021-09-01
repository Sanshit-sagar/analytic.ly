import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Link as StyledLink } from '../../primitives/Link'

interface ILinkProps {
    children: ReactNode; 
    href: string; 
    className: string;
}

const ActiveLink = ({ children, href, className }: ILinkProps) => {
    const router = useRouter();
    return (
      <Link href={href} scroll={false}>
        <StyledLink variant={ router.pathname === href ? 'subtle' : 'blue' } />
          {children}
        </a>
      </Link>
    );
};

export default ActiveLink
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Link as StyledLink } from '../../primitives/Link'

interface ILinkProps {
    children: ReactNode; 
    href: string; 
}

export const ActiveLink = ({ children, href }: ILinkProps) => {
    const router = useRouter();
    return (
        <Box css={{ marginLeft: '$2', mr: '$2' }}>
        <Link href={href} scroll={false}>
                <StyledLink variant={ router.pathname === href ? 'subtle' : 'blue' }>
                {children}
                </StyledLink>
            </Link>
        </Box>
    );
}
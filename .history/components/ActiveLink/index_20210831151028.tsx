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
        <StyledLink
          className={`${
           
              ? "text-gray-900 border-gray-800"
              : "text-gray-600 hover:text-gray-700 border-transparent"
          } ${className} block pb-4 font-semibold text-sm sm:text-base border-b-2 focus:outline-none focus:text-gray-900 whitespace-no-wrap`}
        >
          {children}
        </a>
      </Link>
    );
};

export default ActiveLink
import { useRouter } from 'next/router'
import Link from 'next/link'



const ActiveLink = ({ children, href, className }: ILink) => {
    const router = useRouter();
    return (
      <Link href={href} scroll={false}>
        <a
          className={`${
            router.pathname === href
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
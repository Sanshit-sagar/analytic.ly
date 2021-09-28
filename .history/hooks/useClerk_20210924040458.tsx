import { useClerk } from '@clerk/nextjs'

export const useClerkSession = () => {
    const { primaryEmailAddress } = useClerk()
    return { primaryEmailAddress }
}

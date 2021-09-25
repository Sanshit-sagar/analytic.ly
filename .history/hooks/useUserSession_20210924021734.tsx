import { useClerk } from '@clerk/nextjs'

export const useClerkSession = () => {
    const { session } = useClerk()
    return { primaryEmailAddress }
}

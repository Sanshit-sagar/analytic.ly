import { useClerk } from '@clerk/nextjs'

export const useUserSession = () => {
    const { primaryEmailAddress } = useClerk()
    return { primaryEmailAddress }
}

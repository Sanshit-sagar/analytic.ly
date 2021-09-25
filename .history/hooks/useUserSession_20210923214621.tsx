import { useClerk } from '@clerk/nextjs'

const useUserSession = () => {
    const { primaryEmailAddress } = useClerk()
    return { primaryEmailAddress }
}

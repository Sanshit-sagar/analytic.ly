
const useUserSession = () => {
    const { primaryEmailAddress } = useClerk()
    return { primaryEmailAddress }
}

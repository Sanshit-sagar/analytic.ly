

const useSubmit = () => {
    const { user, loading, error } = useUserAuth()

    const urlResults = useAtomValue(destinationResultsAtom) // TODO: Call 
    const expirationResults = useAtomValue(expirationResultsAtom)
    const passwordResults = useAtomValue(passwordResultsAtom)
    const utmResults = useAtomValue(utmStrAtom)


}
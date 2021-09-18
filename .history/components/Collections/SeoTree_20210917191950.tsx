import {
    seoSourceAtom, 
    seoMediumAtom
}




const SeoResults = () => {
    const source = useAtomValue(seoSourceAtom)
    const medium = useAtomValue(seoMediumAtom)
    const term = useAtomValue(seoTermAtom)
    const content = useAtomValue(seoContentAtom)
    const campaign = useAtomValue(seoCampaignAtom)
    const destination = useAtomValue(destinationInputAtom)
    const utmStr = useAtomValue(utmStrAtom)

    return (
        
    )
}


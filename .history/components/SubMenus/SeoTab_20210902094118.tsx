

const SeoTabContent = () => {
    const [seo, setSeo] = useState({ medium: '', term: '', source: '', campaign: '', content: '', templatedId: ''})

    return (
        <Box>
            {Object.entries(seo).map((seo))}
            <TextField
                size='1'
                type='text'
                value={}

        </Box>
    )
}
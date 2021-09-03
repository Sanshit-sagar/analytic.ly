

const SeoTabContent = () => {
    const [seo, setSeo] = useState({ medium: '', term: '', source: '', campaign: '', content: '', templatedId: ''})

    const 
    return (
        <Box>
            {Object.entries(seo).map((seoEntry, i) => {
                return (
                    <TextField
                        size='1'
                        type='text'
                        value={seoEntry[1] || ''}
                        onChange={handleSeoTagUpdate}
                        placeholder={`e.g: ${i}`} 
                    />
                );
            })}

        </Box>
    )
}
import { Box } from '../../primitives/Box'
import { }

const SeoTabContent = () => {
    const [seo, setSeo] = useState({ medium: '', term: '', source: '', campaign: '', content: '', templatedId: ''})

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>) => {
        setSeo({
            ...seo
            ['test']: event.currentTarget.value,
        });
    }
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
import { Box } from '../../primitives/Box'
import { TextField } from '../../'

const SeoTabContent = () => {
    const [seo, setSeo] = useState({ medium: '', term: '', source: '', campaign: '', content: '', templatedId: ''})

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>, id: string) => {
        setSeo({
            ...seo
            [id]: eve
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
                        onChange={(event) => handleSeoTagUpdate(event, seoEntry[0])}
                        placeholder={`e.g: ${i}`} 
                    />
                );
            })}
        </Box>
    )
}
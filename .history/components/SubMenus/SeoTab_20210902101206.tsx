import React, { useState } from 'react'

import { Box } from '../../primitives/Box'
import { UrlFieldSet as FieldSet, Label } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'
import { Text } from '../../primitives/Text'

const examples = [
    'medium1, medium2',
    'term1, term2',
]
const SeoTabContent = () => {
    const [seo, setSeo] = useState({ medium: '', term: '', source: '', campaign: '', content: '', templatedId: ''})

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>, id: string) => {
        setSeo({
            ...seo,
            [id]: event.currentTarget.value
        });
    }
    return (
        <Box>
            {Object.entries(seo).map((seoEntry, i) => {
                return (
                    <FieldSet> 
                        <Label> {seoEntry[0].toUpperCase()} </Label>
                        <TextField
                            size='1'
                            type='text'
                            value={seoEntry[1] || ''}
                            onChange={(event: React.ChangeEventHandler<HTMLInputElement>) => {
                                handleSeoTagUpdate(event, seoEntry[0]);
                            }}
                            placeholder={`e.g: ${examples[i]}`} 
                        />
                    </FieldSet>
                );
            })}
        </Box>
    );
}

export default SeoTabContent
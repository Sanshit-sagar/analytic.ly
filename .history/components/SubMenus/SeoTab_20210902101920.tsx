import React, { useState } from 'react'

import { Box } from '../../primitives/Box'
import { UrlFieldSet as FieldSet, Label } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'
import { Text } from '../../primitives/Text'

const examples = [
    'medium1, medium2',
    'term1, term2',
    'source1, source2',
    'campaign1, campaign2',
    'content1', 'content2',
];

const SeoTabContent = () => {
    const [seo, setSeo] = useState({ medium: '', term: '', source: '', campaign: '', content: '', templatedId: ''})

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>, id: string) => {
        setSeo({
            ...seo,
            [id]: event.currentTarget.value
        });
    }
    return (
        <Box css={{ width: '100%', height: '100%', margin: '$1', padding: '$1 $2', border: 'thin solid black', br: '$2' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$1', flexWrap: 'wrap' }}>
                {Object.entries(seo).map((seoEntry, i) => {
                    return (
                        <FieldSet css={{ border: 'thin solid' m}}> 
                            <Label> {seoEntry[0].toUpperCase()} </Label>
                            <TextField
                                size='1'
                                type='text'
                                value={seoEntry[1] || ''}
                                onChange={(event: React.ChangeEventHandler<HTMLInputElement>) => {
                                    handleSeoTagUpdate(event, seoEntry[0]);
                                }}
                                placeholder={i>=5 ? '' : `e.g: ${examples[i]}`} 
                            />
                        </FieldSet>
                    );
                })}
            </Flex>
        </Box>
    );
}

export default SeoTabContent
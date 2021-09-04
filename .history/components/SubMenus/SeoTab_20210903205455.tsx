import React, { useState } from 'react'
import { FieldSetGroup, Label, UrlFieldSet as FieldSet } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'

import { atom, useAtom } from 'jotai'

interface ISeoParams {
    medium: string;
    term: string;
    source: string; 
    campaign: string; 
    content: string; 
}

const examples = [
    'medium1, medium2',
    'term1, term2',
    'source1, source2',
    'campaign1, campaign2',
    'content1', 'content2',
];
const EMPTY_SEO_TAGS = { medium: '', term: '', source: '', campaign: '', content: ''}
const titles = { 
    medium: 'Medium', 
    term: 'Term', 
    source: 'Source', 
    campaign: 'Campaign', 
    content: 'Content', 
    template: 'Template'
}

const seoAtom = atom<ISeoParams>(
    read: {  medium: '', term: '', source: '', campaign: '', content: '' })

const SeoTabContent = () => {
    const [seo, setSeo] = useAtom(seoAtom)

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>, id: string) => {
        setSeo({
            ...seo,
            [id]: event.currentTarget.value
        });
    }
    return (
        <FieldSetGroup>
            {Object.entries(seo).map((seoEntry, i) => {
                return (
                    <FieldSet css={{ width: '47%', padding: '$1', mb: '$1', bc: '$panel', border: 'thin solid transparent', br: '$2' }}> 
                        <Label css={{  color: '$text', textTransform: 'uppercase' }}>
                            {titles[seoEntry[0]]} 
                        </Label>

                        <TextField
                            size='1'
                            type='text'
                            value={seoEntry[1] || ''}
                            onChange={(event: React.ChangeEventHandler<HTMLInputElement>) => {
                                handleSeoTagUpdate(event, seoEntry[0]);
                            }}
                            placeholder={`e.g: ${examples[i]}`} 
                            css={{ 
                                mt: '$2',
                                border: '1px solid', 
                                borderColor: '$border', 
                                backgroundColor: '$lightPanel',
                                color: '$text',
                                '&:hover': { 
                                    borderColor: '$hiContrast',
                                },

                            }}
                        />
                    </FieldSet>
                );
            })}
        </FieldSetGroup>
    );
}

export default SeoTabContent
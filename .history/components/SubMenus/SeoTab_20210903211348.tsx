import React from 'react'
import { FieldSetGroup, Label, UrlFieldSet as FieldSet } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'

import { atom, useAtom } from 'jotai'
import { focusAtom } from 'jotai/optics'

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
const titles = { 
    medium: 'Medium', 
    term: 'Term', 
    source: 'Source', 
    campaign: 'Campaign', 
    content: 'Content', 
    template: 'Template'
}

const seoAtom = atom<ISeoParams>({  medium: '', term: '', source: '', campaign: '', content: '' });
const seoMediumAtom = focusAtom(seoAtom, (optic) => optic.prop('medium'))
const seoTermAtom = focusAtom(seoAtom, (optic) => optic.prop('term'))
const seoSourceAtom = focusAtom(seoAtom, (optic) => optic.prop('source'))
const seoCampaignAtom = focusAtom(seoAtom, (optic) => optic.prop('campaign'))
const seoContentAtom = focusAtom(seoAtom, (optic) => optic.prop('content'))

const SeoTabContent = () => {
    const [medium, setMedium] = useAtom(seoMediumAtom)
    const [term, setTerm] = useAtom(seoTermAtom)
    const [source, setSource] = useAtom(seoSourceAtom)
    const [campaign, setCampaign] = useAtom(seoCampaignAtom)
    const [content, setContent] = useAtom(seoContentAtom)

    const handleSeoTagUpdate = (event: React.ChangeEventHandler<HTMLInputElement>, id: string) => {
        if(id==='medium') setMedium(event.currentTarget.value)
        else if(id==='term') setTerm(event.currentTarget.value)
        else if(id==='source') setSource(event.currentTarget.value)
        else if(id==='campaign') setCampaign(event.currentTarget.value)
        else if(id==='content') setContent(event.currentTarget.value)
    }

    return (
        <FieldSetGroup>
            {Object.entries(seo).map((seoEntry, i) => {
                return (
                    <FieldSet 
                        key={i} 
                        css={{ width: '47%', p: '$1', mb: '$1', bc: '$panel', border: 'thin solid transparent', br: '$2' }}
                    > 
                        <Label css={{  color: '$text', textTransform: 'uppercase' }}>
                            {titles[seoEntry[0]]} 
                        </Label>

                <TextField
                    size='1'
                    type='text'
                    value={seoEntry[1] || ''}
                    onChange={(event: React.ChangeEventHandler<HTMLInputElement>) => handleSeoTagUpdate(event, seoEntry[0])}
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
import React, { useState } from 'react'
import { FieldSetGroup, Label, ControlGroup, FieldSetInputGroup } from '../../primitives/FieldSet' 

import { Text } from '../../primitives/Text'
import { Button } from '../../primitives/Button'
import { TextField } from '../../primitives/TextField'

import { atom, useAtom } from 'jotai'
import { focusAtom } from 'jotai/optics'

import { CaretDownIcon } from '@radix-ui/react-icons'

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

export const seoAtom = atom<ISeoParams>({  medium: '', term: '', source: '', campaign: '', content: '' });
export const seoMediumAtom = focusAtom(seoAtom, (optic) => optic.prop('medium'))
export const seoTermAtom = focusAtom(seoAtom, (optic) => optic.prop('term'))
export const seoSourceAtom = focusAtom(seoAtom, (optic) => optic.prop('source'))
export const seoCampaignAtom = focusAtom(seoAtom, (optic) => optic.prop('campaign'))
export const seoContentAtom = focusAtom(seoAtom, (optic) => optic.prop('content'))

export const focussedAtom = atom('medium')
export const focussedParamAtom = atom(
    (get) => get(focussedAtom),
    (_get, set, update: React.SetStateAction<string>) => set(focussedAtom, update)
)

export const utmAtom = atom('')
export const utmSourceStrAtom = atom((get) => get(seoSourceAtom) ? `utm_source${get(seoSourceAtom)}&` : '')
export const utmMediumStrAtom = atom((get) => get(seoMediumAtom) ? `utm_medium${get(seoMediumAtom)}&` : '')
export const utmTermStrAtom = atom((get) => get(seoTermAtom) ? `utm_term=${get(seoTermAtom)}&` : '')
export const utmStrAtom = atom((get) => `${get(utmSourceStrAtom)}${get(utmTermStrAtom)}${get(utmMediumStrAtom)}`)

type SeoOpticsEvent = React.ChangeEvent<HTMLInputElement>;

const SeoTabContent = () => {
    const [medium, setMedium] = useAtom(seoMediumAtom)
    const [term, setTerm] = useAtom(seoTermAtom)
    const [source, setSource] = useAtom(seoSourceAtom)
    const [campaign, setCampaign] = useAtom(seoCampaignAtom)
    const [content, setContent] = useAtom(seoContentAtom)

    const [focussed, setFocussed] = useAtom(focussedParamAtom)
    const [utmStr, setUtmStr] = useAtom(utmStrAtom)
    const [counter, setCounter] = useState(0);


    const seoParams = [
        { id: 'medium', value: medium, setter: (event: SeoOpticsEvent) => setMedium(event.currentTarget.value)},
        { id: 'term', value: term, setter: (event: SeoOpticsEvent) => setTerm(event.currentTarget.value)},
        { id: 'source', value: source,  setter: (event: SeoOpticsEvent) => setSource(event.currentTarget.value)},
        { id: 'campaign', value: campaign, setter: (event: SeoOpticsEvent) => setCampaign(event.currentTarget.value)},
        { id: 'content', value: content,  setter: (event: SeoOpticsEvent) => setContent(event.currentTarget.value)},
        { id: 'focussed', value: focussed, setter: (event: SeoOpticsEvent) => setFocussed(event.currentTarget.value)},
        { id: 'utmStr', value: utmStr, setter: (_: SeoOpticsEvent) => setCounter(counter + 1)}
    ];

    const showPreviousInputs = (paramId: string) => setFocussed(paramId);
    }

    return (
        <>
            {seoParams.map((seoParam, i) => {
                return (
                    <ControlGroup>
                        <Label css={{ color: '$text', mt: '$2' }}> 
                            <Text size='1' css={{ color: '$text' }}>
                                {seoParam.id}
                            </Text>
                        </Label>

                        <TextField
                            size='1'
                            type='text'
                            value={seoParam?.value || ''}
                            onChange={(event: SeoOpticsEvent) =>{
                                seoParam.setter(event)
                                if(focussed !== seoParam.id) setFocussed(seoParam.id);
                            }}
                            placeholder={`e.g: ${examples[i]}`} 
                            css={{ border: 'none' }}
                        />
                    </ControlGroup>
                );
            })}
        </>
    );
}

export default SeoTabContent
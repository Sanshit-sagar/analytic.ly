import React from 'react'
import { Label, ControlGroup } from '../../primitives/FieldSet' 

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
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
export const utmSourceStrAtom = atom((get) => get(seoSourceAtom) ? `utm_source=${get(seoSourceAtom)}&` : '')
export const utmMediumStrAtom = atom((get) => get(seoMediumAtom) ? `utm_medium=${get(seoMediumAtom)}&` : '')
export const utmTermStrAtom = atom((get) => get(seoTermAtom) ? `utm_term=${get(seoTermAtom)}&` : '')
export const utmContentStrAtom = atom((get) => get(seoContentAtom) ? `utm_content=${get(seoContentAtom)}&` : '')
export const utmCampaignStrAtom = atom((get) => get(seoCampaignAtom) ? `utm_campaign=${get(seoCampaignAtom)}` : '')
export const utmStrAtom = atom((get) => {
   return `${get(utmCampaignStrAtom)}${get(utmSourceStrAtom)}${get(utmTermStrAtom)}${get(utmMediumStrAtom)}${get(utmContentStrAtom)}`;
});

type SeoOpticsEvent = React.ChangeEvent<HTMLInputElement>;

const InputUrlWithInputUtmTags:React.FC = () => {
    const utmUrl = useAtomValue<string>(utmStrAtom)
    const focussed = useAtomValue<string>(focussedParamAtom)

    return (
        <Box css={{ 
            width: '100%', order: 'thi oslid nlpadding: '$1', br: '$2',
         fd: 'column',jc: 'flex-start', ai: 'stretch', gap: '1' }}>
            <Text css={{ color: '$accent', textDecoration: 'underline' }}> 
                {focussed} 
            </Text>
            <Text css={{ color: '$text' }}>
               Result:{utmUrl}
            </Text>
        </Box>
    )
}

const SeoTabContent = () => {
    const [medium, setMedium] = useAtom<string>(seoMediumAtom)
    const [term, setTerm] = useAtom<string>(seoTermAtom)
    const [source, setSource] = useAtom<string>(seoSourceAtom)
    const [campaign, setCampaign] = useAtom<string>(seoCampaignAtom)
    const [content, setContent] = useAtom(seoContentAtom)

    const [focussed, setFocussed] = useAtom(focussedParamAtom)

    const seoParams = [
        { id: 'medium', value: medium, setter: (event: SeoOpticsEvent) => setMedium(event.currentTarget.value)},
        { id: 'term', value: term, setter: (event: SeoOpticsEvent) => setTerm(event.currentTarget.value)},
        { id: 'source', value: source,  setter: (event: SeoOpticsEvent) => setSource(event.currentTarget.value)},
        { id: 'campaign', value: campaign, setter: (event: SeoOpticsEvent) => setCampaign(event.currentTarget.value)},
        { id: 'content', value: content,  setter: (event: SeoOpticsEvent) => setContent(event.currentTarget.value)}
    ];

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start',  gap: '$1' , flexWrap: 'wrap'}}>
            {seoParams.map((seoParam, i) => {
                return (
                    <>
                        <ControlGroup>
                            <Label css={{ color: '$text' }}> 
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
                    </>
                );
            })}
             <InputUrlWithInputUtmTags />
        </Flex>
    );
}

export default SeoTabContent
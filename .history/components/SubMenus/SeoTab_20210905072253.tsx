import React from 'react'

import { atom, useAtom } from 'jotai'
import { focusAtom } from 'jotai/optics'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'
import { Label, ControlGroup } from '../../primitives/FieldSet' 

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

const SeoTabContent = () => {
    const [medium, setMedium] = useAtom(seoMediumAtom)
    const [term, setTerm] = useAtom(seoTermAtom)
    const [source, setSource] = useAtom(seoSourceAtom)
    const [campaign, setCampaign] = useAtom(seoCampaignAtom)
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
                    <ControlGroup key={`Control group ${i}`}>
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
                );
            })}
        </Flex>
    );
}

interface IParamsList {
    params: string[];
    index: number; 
}

const ParamsList = ({ params, index }: IParamsList) => {

    return (
        <Box key={i} css={{ border: 'thin solid $text', br: '$2', padding: '$1', margin: '$1' }}>
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>

        </Flex>
        </Box>
    )
}


const SeoParametersLibrary = () => {
    const savedParams = {
        'campaign': ['word1', 'word2'],
        'term': ['word3', 'word4'],
        'medium': ['word5', 'word6', 'word7'],
        'source': ['word8', 'word9'],
        'content': ['word10', 'word11'],
    };

    const categories = ['campaign', 'term', 'medium', 'source', 'content'];

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start',  gap: '$1' , flexWrap: 'wrap'}}>
            {Object.keys(savedParams).map((paramCategory: number, i: number) => (
               
               
                        <ParamsList 
                            params={savedParams[paramCategory]} 
                            index={i} 
                        />
                    </Flex>
                </Box>
            ))}
        </Flex>
    )
}

export default SeoTabContent
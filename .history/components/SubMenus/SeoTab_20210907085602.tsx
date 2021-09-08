import React from 'react'

import { atom, useAtom } from 'jotai'
import { focusAtom } from 'jotai/optics'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'
import { Label, ControlGroup } from '../../primitives/FieldSet'

import {IUtmParameters } from './interfaces'

const examples = [
    'medium1, medium2',
    'term1, term2',
    'source1, source2',
    'campaign1, campaign2',
    'content1', 'content2',
];

import {
    CursorTextIcon,
    EyeOpenIcon,
    CursorArrowIcon
} from '@radix-ui/react-icons'

export const seoAtom = atom<IUtmParameters>({  medium: '', term: '', source: '', campaign: '', content: '' });
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

export const clickedAtom = atom('')
export const clickedParamAtom = atom(
    (get) => get(clickedAtom),
    (_get, set, update: React.SetStateAction<string>) => set(clickedAtom, update)
)

export const hoveredAtom = atom('')
export const hoveredParamAtom = atom(
    (get) => get(hoveredAtom),
    (_get, set, update: React.SetStateAction<string>) => set(hoveredAtom, update)
)

export const focussedParamInputAtom = atom(
    (get) => {
        const fAtom = get(focussedParamAtom)
        return fAtom==='medium'   ? get(seoMediumAtom) 
             : fAtom==='source'   ? get(seoSourceAtom) 
             : fAtom==='term'     ? get(seoTermAtom)
             : fAtom==='campaign' ? get(seoCampaignAtom)
             : fAtom==='content'  ? get(seoContentAtom)
             : null; 
    }
);

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

const SeoParamsInputs = () => {
    const [medium, setMedium] = useAtom(seoMediumAtom)
    const [term, setTerm] = useAtom(seoTermAtom)
    const [source, setSource] = useAtom(seoSourceAtom)
    const [campaign, setCampaign] = useAtom(seoCampaignAtom)
    const [content, setContent] = useAtom(seoContentAtom)

    const [focussed, setFocussed] = useAtom(focussedParamAtom)
    const [clicked, setClicked] = useAtom(clickedParamAtom)
    const [hovered, setHovered] = useAtom(hoveredParamAtom)

    const seoParams = [
        { id: 'medium', value: medium, setter: (event: SeoOpticsEvent) => setMedium(event.currentTarget.value)},
        { id: 'term', value: term, setter: (event: SeoOpticsEvent) => setTerm(event.currentTarget.value)},
        { id: 'source', value: source,  setter: (event: SeoOpticsEvent) => setSource(event.currentTarget.value)},
        { id: 'campaign', value: campaign, setter: (event: SeoOpticsEvent) => setCampaign(event.currentTarget.value)},
        { id: 'content', value: content,  setter: (event: SeoOpticsEvent) => setContent(event.currentTarget.value)}
    ];

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'center',  gap: '$1' , flexWrap: 'wrap'}}>
            {seoParams.map((seoParam, i) => {
                return (
                    <ControlGroup 
                        key={`Control group ${i}`}
                        onMouseOver={() => {if(hovered !== seoParam.id) {setHovered(seoParam.id)}}}
                        onMouseOut={() => setHovered('')}
                    >
                        <Label css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}> 
                            <Text size='1' css={{ color: '$text' }}>
                                {seoParam.id}  
                            </Text>
                            <Text size='1' css={{ color: focussed===seoParam.id ? 'green' : 'transparent' }}>
                                {focussed===seoParam.id ? <CursorTextIcon /> : null}
                            </Text>
                            <Text size='1' css={{ color: clicked===seoParam.id ? 'yellow' : 'transparent' }}>
                                {clicked===seoParam.id ? <EyeOpenIcon /> : null}
                            </Text>
                            <Text size='1' css={{ color: hovered===seoParam.id ? 'orange' : 'transparent' }}>
                                {clicked===seoParam.id ? <CursorArrowIcon /> : null}
                            </Text>
                        </Label>

                        <TextField
                            size='1'
                            type='text'
                            value={seoParam?.value || ''}
                            onClick={() => {
                                if(focussed !== seoParam.id) setClicked(seoParam.id);
                            }}
                            onChange={(event: SeoOpticsEvent) =>{
                                seoParam.setter(event)
                                if(focussed !== seoParam.id) setFocussed(seoParam.id);
                            }}
                            placeholder={`e.g: ${examples[i]}`} 
                        />
                    </ControlGroup>
                );
            })}
        </Flex>
    );
}


const SeoParamsCacbe = () => {

    return (
        <Flex css={{ fd: 'row', jc: 'center', ai: 'stretch', gap: '$2' }}>
            <SeoParamsInputs /> 
            {/* <UtmParameters />  */}
        </Flex>
    )
}

export default SeoParamsCacbe
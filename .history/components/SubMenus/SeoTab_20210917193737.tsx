import React from 'react'

import { useAtom, WritableAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'
import { Label, ControlGroup } from '../../primitives/FieldSet'

import { 
    FlexStartCenterRow, 
    FlexEndCenterRow,
    FlexCenterCenterRow,
    FlexCenterCenterColumn
} from '../../primitives/Shared'

import { 
    seoSourceAtom, 
    seoMediumAtom, 
    seoTermAtom, 
    seoCampaignAtom,
    seoContentAtom,
    focussedParamAtom,
    clickedParamAtom,
    hoveredParamAtom
} from '../../atoms/urchins'


import { darkModeAtom } from '../../pages/index'
import { useAsyncJotai } from '../../hooks/useAsyncJotai'

import ComboBox from '../../components/ComboBox'

import {
    CursorTextIcon,
    EyeOpenIcon,
    CursorArrowIcon
} from '@radix-ui/react-icons'


const examples = [
    'medium1, medium2',
    'term1, term2',
    'source1, source2',
    'campaign1, campaign2',
    'content1', 'content2',
];
const NO_CONTENT = ''
// 
// export const seoAtom = atom<IUtmParameters>({  medium: '', term: '', source: '', campaign: '', content: '' });
// export const seoMediumAtom = focusAtom(seoAtom, (optic) => optic.prop('medium'))
// export const seoTermAtom = focusAtom(seoAtom, (optic) => optic.prop('term'))
// export const seoSourceAtom = focusAtom(seoAtom, (optic) => optic.prop('source'))
// export const seoCampaignAtom = focusAtom(seoAtom, (optic) => optic.prop('campaign'))
// export const seoContentAtom = focusAtom(seoAtom, (optic) => optic.prop('content'))
// 
// export const focussedAtom = atom('')
// export const focussedParamAtom = atom(
    // (get) => get(focussedAtom),
    // (_get, set, update: React.SetStateAction<string>) => set(focussedAtom, update)
// )
// 
// export const clickedAtom = atom('')
// export const clickedParamAtom = atom(
    // (get) => get(clickedAtom),
    // (_get, set, update: React.SetStateAction<string>) => set(clickedAtom, update)
// )
// 
// export const hoveredAtom = atom('')
// export const hoveredParamAtom = atom(
    // (get) => get(hoveredAtom),
    // (_get, set, update: React.SetStateAction<string>) => set(hoveredAtom, update)
// )
// 
// export const focussedParamInputAtom = atom(
    // (get) => {
        // const fAtom = get(focussedParamAtom)
        // return fAtom==='medium'   ? get(seoMediumAtom) 
            //  : fAtom==='source'   ? get(seoSourceAtom) 
            //  : fAtom==='term'     ? get(seoTermAtom)
            //  : fAtom==='campaign' ? get(seoCampaignAtom)
            //  : fAtom==='content'  ? get(seoContentAtom)
            //  : null; 
    // }
// );
// 
// export const utmAtom = atom('')
// export const utmSourceStrAtom = atom((get) => get(seoSourceAtom) ? `utm_source=${get(seoSourceAtom)}&` : '')
// export const utmMediumStrAtom = atom((get) => get(seoMediumAtom) ? `utm_medium=${get(seoMediumAtom)}&` : '')
// export const utmTermStrAtom = atom((get) => get(seoTermAtom) ? `utm_term=${get(seoTermAtom)}&` : '')
// export const utmContentStrAtom = atom((get) => get(seoContentAtom) ? `utm_content=${get(seoContentAtom)}&` : '')
// export const utmCampaignStrAtom = atom((get) => get(seoCampaignAtom) ? `utm_campaign=${get(seoCampaignAtom)}` : '')
// export const utmStrAtom = atom((get) => {
//    return `${get(utmCampaignStrAtom)}${get(utmSourceStrAtom)}${get(utmTermStrAtom)}${get(utmMediumStrAtom)}${get(utmContentStrAtom)}`;
// });
// 
type SeoOpticsEvent = React.ChangeEvent<HTMLInputElement>;

interface ISeoParameter {
    id: string; 
    value: string;
    atom: WritableAtom<string, React.SetStateAction<string>>;
    setter: (event: SeoOpticsEvent) => void;
}

interface ISeoGroupConfigColors {
    on: string;
    off?: string; 
}

type SeoGroupEventType = 'focussed' | 'clicked' | 'hovered'

interface SeoGroupEventConfig {
    eventType: SeoGroupEventType;
    atom: WritableAtom<string, React.SetStateAction<string>>;
    colors: ISeoGroupConfigColors;
    icon: JSX.Element | React.ReactNode; 
}

interface SeoGroupConfig {
    focussed: SeoGroupEventConfig;
    clicked: SeoGroupEventConfig;
    hovered: SeoGroupEventConfig;
}

interface IEventIconsGroupProps { 
    seoGroup: SeoGroupEventConfig; 
    seoParam: ISeoParameter 
};


interface IFilteredResultsProps { 
    category: string; 
    userInput: string | undefined; 
    isReady: boolean; 
    filteredUrchins: any[] | undefined | null;
}

const seoGroups: SeoGroupConfig = {
    focussed: { eventType: 'focussed', atom: focussedParamAtom, colors: { on: 'green' }, icon: <CursorTextIcon /> },
    clicked:  { eventType: 'clicked', atom: clickedParamAtom, colors: { on: 'yellow' }, icon: <EyeOpenIcon /> },
    hovered:  {  eventType: 'hovered', atom: hoveredParamAtom, colors: { on: 'orange'}, icon: <CursorArrowIcon /> },
}

const EventIconsGroup = ({ seoGroup, seoParam }: IEventIconsGroupProps) => {
    let eventCulprit = useAtomValue(seoGroup.atom)
    let didCauseEvent = eventCulprit===seoParam.id
    let eventColor = didCauseEvent ? seoGroup.colors.on : seoGroup.colors.off
    let eventContent = didCauseEvent ? seoGroup.icon : NO_CONTENT
    return <Text css={{ color: eventColor }}> {eventContent} </Text>;
}
    // 
// const SeoControlGroupLabel = ({ seoParam, index }: { seoParam: ISeoParameter; index: number }) => {

    // return (
        // <Label>
            {/* <FlexStartCenterRow> */}
                {/* <Text>{seoParam.id}</Text> */}
                {/* <FlexEndCenterRow> */}
                    {/* {Object.entries(seoGroups).map((sgcEntry: [string, SeoGroupEventConfig], cfgIdx: number) => ( */}
                        // <EventIconsGroup 
                            // key={`group-${sgcEntry[0]}-${index}-item-${cfgIdx}`}
                            // seoGroup={sgcEntry[1]}
                            // seoParam={seoParam}
                        // />
                    // ))}
                {/* </FlexEndCenterRow> */}
            {/* </FlexStartCenterRow> */}
        {/* </Label> */}
    // )
}
// 
// const SeoParamsInput = ({ seoParam, index }: { seoParam: ISeoParameter, index: number}) => {
    // const setFocussed = useUpdateAtom(focussedParamAtom)
    // const setClicked = useUpdateAtom(clickedParamAtom)
    // const setHovered = useUpdateAtom(hoveredParamAtom)
// 
    // return (
        // <ControlGroup 
            // key={`Control group ${index}`}
            // onMouseOver={() => setHovered(seoParam.id)}
            // onMouseOut={() => setHovered('')}
        // >
            {/* <SeoControlGroupLabel  */}
                // seoParam={seoParam} 
                // index={index} 
            // />
{/*  */}
            {/* <TextField */}
                // size='1'
                // type='text'
                // value={seoParam?.value || ''}
                // onClick={() => setClicked(seoParam.id)}
                // onChange={(event: SeoOpticsEvent) => {
                    // setFocussed(seoParam.id)
                    // seoParam.setter(event)
                // }}
                // placeholder={`e.g: ${examples[index]}`} 
            // />
        {/* </ControlGroup> */}
    // );
// }
// 
// const CategorizedUrchins = ({ category, filteredUrchins, isReady, userInput }: IFilteredResultsProps) => {
    // const isDark = useAtomValue(darkModeAtom)
// 
    // if(!userInput?.length) return (
        // <Text> {filteredUrchins ? filteredUrchins.length : 0} {category} urchins </Text>
    // );
// 
    // if(!filteredUrchins || filteredUrchins?.length === 0) {
        // return (
            // <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'flex-start', gap: '$1'}}>
                {/* <Text> No matches,  */}
                    {/* <a  */}
                        // as="button" 
                        // onClick={() => alert('saving...')}
                        // style={{ 
                            // marginLeft: '1.5px', 
                            // textDecoration: 'underline', 
                            // textDecorationColor: isDark ? 'silver' : 'black',
                            // cursor: 'pointer'
                        // }}
                    // >
                        {/* save */}
                    {/* </a> ?  */}
                {/* </Text>  */}
            {/* </Flex> */}
        // );
    // }
// 
    // return (
        // <Flex css={{ display: 'flex', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
             {/* <FilterResults  */}
                // category={category} 
                // userInput={userInput} 
                // isReady={isReady} 
                // filteredUrchins={filteredUrchins}
            // />
            {/* {filteredUrchins.map((urchin: string) =>  ( */}
                // <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: 0 }}>
                    {/* <Text css={{ color: '$funky' }}>  */}
                        {/* {userInput}  */}
                    {/* </Text>  */}
                    {/* <Text css={{ color: '$text' }}>  */}
                        {/* {!userInput?.length ? urchin : urchin.substring(userInput?.length || 0)}  */}
                    {/* </Text>  */}
                {/* </Flex> */}
            // ))}
        {/* </Flex> */}
    // )
// }

const FilterResults = ({ category, userInput, isReady, filteredUrchins }: IFilteredResultsProps) => {

    return (
        <Text id={`${userInput}s-urchins-for-${category}`}> 
            {isReady? `${filteredUrchins?.length}` : '00'} matches 
        </Text>
    )
}

interface IAsyncJotaiResults {
    data: any, 
    loading: boolean,
    error: any | null | undefined,
}; 

const SeoParamsCacbe = () => {

    const { data, loading, error }: IAsyncJotaiResults = useAsyncJotai('/api/urchins/user/sanshit.sagar@gmail.com')

    const [medium, setMedium] = useAtom(seoMediumAtom)
    const [term, setTerm] = useAtom(seoTermAtom)
    const [source, setSource] = useAtom(seoSourceAtom)
    const [campaign, setCampaign] = useAtom(seoCampaignAtom)
    const [content, setContent] = useAtom(seoContentAtom)

    const seoParams: ISeoParameter[] = [
{ id: 'medium', atom: seoMediumAtom, value: medium, setter: (event: SeoOpticsEvent) => setMedium(event.currentTarget.value)},
{ id: 'term', atom: seoTermAtom, value: term, setter: (event: SeoOpticsEvent) => setTerm(event.currentTarget.value)},
{ id: 'source', atom: seoSourceAtom, value: source, setter: (event: SeoOpticsEvent) => setSource(event.currentTarget.value)},
{ id: 'campaign', atom:seoCampaignAtom,value: campaign,setter: (event: SeoOpticsEvent) =>setCampaign(event.currentTarget.value)},
{ id: 'content', atom: seoContentAtom, value: content,  setter: (event: SeoOpticsEvent) => setContent(event.currentTarget.value)}
    ];    

    let isReady = !loading && !error && data && data!==null
    let categorizedUrchins = !isReady ? [] : data?.userUrchins

    return (
        <FlexCenterCenterColumn>
            <FlexCenterCenterRow>
                {seoParams.map((seoParam: ISeoParameter, index: number) => {
                    let urchinsForCategory = categorizedUrchins && categorizedUrchins[seoParam.id] && categorizedUrchins[seoParam.id].length ? categorizedUrchins[seoParam.id] : []
                    
                        return (
                            <Flex key={index} css={{ fd: 'column', jc: 'center', ai: 'stretch', gap: '$1' }}>
                                <ComboBox
                                    key={index} 
                                    utmCategory={seoParam.id} 
                                    utmCategoryAtom={seoParam.atom}
                                    index={index} 
                                    initOptions={urchinsForCategory}
                                />
                            </Flex>
                        );
                    }
                )}
            </FlexCenterCenterRow>
        </FlexCenterCenterColumn>
    )
}

export default SeoParamsCacbe
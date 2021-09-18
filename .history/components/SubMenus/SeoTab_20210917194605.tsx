import React from 'react'

import { Flex } from '../../primitives/Flex'

import { 
    FlexCenterCenterRow,
    FlexCenterCenterColumn
} from '../../primitives/Shared'

import { 
    seoSourceAtom, 
    seoMediumAtom, 
    seoTermAtom, 
    seoCampaignAtom,
    seoContentAtom,
} from '../../atoms/urchins'

import { useAsyncJotai } from '../../hooks/useAsyncJotai'
import ComboBox from '../../components/ComboBox'

import { useAtom, WritableAtom } from 'jotai'
// import { useAtomValue, useUpdateAtom } from 'jotai/utils'

// import {
    // focussedParamAtom,
    // clickedParamAtom,
    // hoveredParamAtom
// } from '../../atoms/urchins'
// 
// import {
    // CursorTextIcon,
    // EyeOpenIcon,
    // CursorArrowIcon
// } from '@radix-ui/react-icons'

// const NO_CONTENT = ''

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

// type SeoGroupEventType = 'focussed' | 'clicked' | 'hovered'
// 
// interface SeoGroupEventConfig {
    // eventType: SeoGroupEventType;
    // atom: WritableAtom<string, React.SetStateAction<string>>;
    // colors: ISeoGroupConfigColors;
    // icon: JSX.Element | React.ReactNode; 
// }
// 
// interface SeoGroupConfig {
    // focussed: SeoGroupEventConfig;
    // clicked: SeoGroupEventConfig;
    // hovered: SeoGroupEventConfig;
// }
// 
// interface IEventIconsGroupProps { 
    // seoGroup: SeoGroupEventConfig; 
    // seoParam: ISeoParameter 
// };

// 
// interface IFilteredResultsProps { 
    // category: string; 
    // userInput: string | undefined; 
    // isReady: boolean; 
    // filteredUrchins: any[] | undefined | null;
// }
// 
// const seoGroups: SeoGroupConfig = {
    // focussed: { eventType: 'focussed', atom: focussedParamAtom, colors: { on: 'green' }, icon: <CursorTextIcon /> },
    // clicked:  { eventType: 'clicked', atom: clickedParamAtom, colors: { on: 'yellow' }, icon: <EyeOpenIcon /> },
    // hovered:  {  eventType: 'hovered', atom: hoveredParamAtom, colors: { on: 'orange'}, icon: <CursorArrowIcon /> },
// }
// 
// const EventIconsGroup = ({ seoGroup, seoParam }: IEventIconsGroupProps) => {
    // let eventCulprit = useAtomValue(seoGroup.atom)
    // let didCauseEvent = eventCulprit===seoParam.id
    // let eventColor = didCauseEvent ? seoGroup.colors.on : seoGroup.colors.off
    // let eventContent = didCauseEvent ? seoGroup.icon : NO_CONTENT
    // return <Text css={{ color: eventColor }}> {eventContent} </Text>;
// }

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
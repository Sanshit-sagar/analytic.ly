import React from 'react'

import { useAtom, WritableAtom } from 'jotai'
import { useAsyncJotai } from '../../hooks/useAsyncJotai'

import { 
    seoSourceAtom, 
    seoMediumAtom, 
    seoTermAtom, 
    seoCampaignAtom,
    seoContentAtom,
} from '../../atoms/urchins'

import { 
    FlexCenterCenterRow,
    FlexCenterCenterColumn
} from '../../primitives/Shared'

import ComboBox from '../../components/ComboBox'


type SeoOpticsEvent = React.ChangeEvent<HTMLInputElement>;

interface ISeoParameter {
    id: string; 
    value: string;
    atom: WritableAtom<string, React.SetStateAction<string>>;
    setter: (event: SeoOpticsEvent) => void;
}

interface IAsyncJotaiResults {
    data: any, 
    loading: boolean,
    error: any | null | undefined,
}; 

function getMapContentsAtIndex(map: {[key: string]: string }, key: string)  {
    return (map && map[key] && map[key].length) ? map[key] : null
}

const seoParams: ISeoParameter[] = [
    { id: 'medium', atom: seoMediumAtom, value: medium, setter: (event: SeoOpticsEvent) => setMedium(event.currentTarget.value)},
    { id: 'term', atom: seoTermAtom, value: term, setter: (event: SeoOpticsEvent) => setTerm(event.currentTarget.value)},
    { id: 'source', atom: seoSourceAtom, value: source, setter: (event: SeoOpticsEvent) => setSource(event.currentTarget.value)},
    { id: 'campaign', atom:seoCampaignAtom,value: campaign,setter: (event: SeoOpticsEvent) =>setCampaign(event.currentTarget.value)},
    { id: 'content', atom: seoContentAtom, value: content,  setter: (event: SeoOpticsEvent) => setContent(event.currentTarget.value)}
];    

const SeoParamsCacbe = () => {

    const { data, loading, error }: IAsyncJotaiResults = useAsyncJotai('/api/urchins/user/sanshit.sagar@gmail.com')

    const [medium, setMedium] = useAtom(seoMediumAtom)
    const [term, setTerm] = useAtom(seoTermAtom)
    const [source, setSource] = useAtom(seoSourceAtom)
    const [campaign, setCampaign] = useAtom(seoCampaignAtom)
    const [content, setContent] = useAtom(seoContentAtom)

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error </Text> 
    if(!data) return <Text> no data </Text> 

    let categorizedUrchins = (!loading && !error && data) ? data?.userUrchins : []

    return (
        <FlexCenterCenterColumn>
            <FlexCenterCenterRow>
                {seoParams.map((seoParam: ISeoParameter, index: number) => {
                    let urchinsForCategory = getMapContentsAtIndex(categorizedUrchins, seoParam.id) || []
                    return (
                        <FlexCenterCenterColumn key={index}>
                            <ComboBox
                                key={index} 
                                utmCategory={seoParam.id} 
                                utmCategoryAtom={seoParam.atom}
                                index={index} 
                                initOptions={urchinsForCategory}
                            />
                        </FlexCenterCenterColumn>
                    )}
                )}
            </FlexCenterCenterRow>
        </FlexCenterCenterColumn>
    )
}

export default SeoParamsCacbe
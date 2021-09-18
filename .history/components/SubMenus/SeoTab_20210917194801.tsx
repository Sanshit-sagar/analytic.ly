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

import ComboBox from '../../components/ComboBox'

import { useAtom, WritableAtom } from 'jotai'
import { useAsyncJotai } from '../../hooks/useAsyncJotai'

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
                    let urchinsForCategory = key? categorizedUrchins[seoParam.id] : []
                    
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
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
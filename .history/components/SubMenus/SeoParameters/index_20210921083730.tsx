import React from 'react'

import { useAtom, WritableAtom } from 'jotai'
import { useAsyncJotai } from '../../../hooks/useAsyncJotai'

import { 
    seoSourceAtom, 
    seoMediumAtom, 
    seoTermAtom, 
    seoCampaignAtom,
    seoContentAtom,
} from '../../../atoms/urchins'

import { 
    FlexCenterCenterRow,
    FlexCenterCenterColumn
} from '../../../primitives/Shared'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { AriaComboBox } from '../../ComboBox'

import { FullUrlWithParams } from './UrlDisplay'
import { PopoverVariantTypeEnum } from '../../ComboBox'

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

const emptyMappings: string[] = [];

function getMappingsAtIndex(map: {[key: string]: string[]}, key: string): string[] {
    return (map && map[key] && map[key].length) ? map[key] : emptyMappings
}

const SeoParamsCacbe = () => {
    const { data, loading, error }: IAsyncJotaiResults = useAsyncJotai('/api/urchins/user/sanshit.sagar@gmail.com')

    // const [medium, setMedium] = useAtom(seoMediumAtom)
    // const [term, setTerm] = useAtom(seoTermAtom)
    // const [source, setSource] = useAtom(seoSourceAtom)
    // const [campaign, setCampaign] = useAtom(seoCampaignAtom)
    // const [content, setContent] = useAtom(seoContentAtom)

    const seoParams: ISeoParameter[] = [
        { id: 'medium', atom: seoMediumAtom, value: medium, setter: (event: SeoOpticsEvent) => setMedium(event.currentTarget.value)},
        { id: 'term', atom: seoTermAtom, value: term, setter: (event: SeoOpticsEvent) => setTerm(event.currentTarget.value)},
        { id: 'source', atom: seoSourceAtom, value: source, setter: (event: SeoOpticsEvent) => setSource(event.currentTarget.value)},
        { id: 'campaign', atom:seoCampaignAtom },
        { id: 'content', atom: seoContentAtom}
    ];    

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error </Text> 
    if(!data) return <Text> no data </Text> 

    let categorizedUrchins =  data?.userUrchins ?? []

    return (
        <Flex css={{ height: '400px', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$4'}}>
            <FlexCenterCenterRow>
                {seoParams.map((seoParam: ISeoParameter, index: number) => (
                    <FlexCenterCenterColumn key={index}>
                        <AriaComboBox
                            key={`${index}`}
                            index={index} 
                            label={seoParam.id}
                            datumAtom={seoParam.atom}
                            popoverVariant={PopoverVariantTypeEnum.SMALL}
                            initItems={getMappingsAtIndex(categorizedUrchins, seoParam.id)}
                        />
                    </FlexCenterCenterColumn>
                ))}
            </FlexCenterCenterRow>

            <FullUrlWithParams />
        </Flex>
    )
}

export default SeoParamsCacbe
import React, { SetStateAction } from 'react'
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
import { 
    PopoverVariantTypeEnum, 
    PopoverVariantType } from '../../../compositions/ComboBox'

interface StringMap { 
    [key:string]: string[] 
};

interface ISeoParameter {
    id: string; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

interface IAsyncJotaiResults {
    data: any, 
    loading: boolean,
    error: any | null | undefined,
}

interface IComboBoxWrapperProps {
    key: string;
    index: number;
    label: string; 
    datumAtom: WritableAtom<string, SetStateAction<string>>; 
    popoverVariant: PopoverVariantType;
    initItems: string[];
}

const emptyMappings: string[] = [];
const keyedMapping = (map: StringMap, key: string): string[] => (
   (map && map[key] && map[key].length) ? map[key] : emptyMappings
);

const ComboBoxWrapper = (props: IComboBoxWrapperProps) => {
    const [value, setValue] = useAtom(props.datumAtom)

    const handleChange = (updatedValue: string) => setValue(updatedValue)

    return (
        <AriaComboBox
            key={props.key}
            label={props.label}
            index={props.index}
            value={value} 
            updateValue={handleChange}
            initItems={[...props.initItems]}
            popoverVariant={props.popoverVariant}
        />
    )
}

// TODO: use asynclist for loading the items instead, 
// so that user isnt waiting for loading to enter items initially
const SeoParamsCacbe = () => {
    const { data, loading, error }: IAsyncJotaiResults = useAsyncJotai('/api/urchins/user/sanshit.sagar@gmail.com')

    const seoParams: ISeoParameter[] = [
        { id: 'medium', atom: seoMediumAtom },
        { id: 'term', atom: seoTermAtom },
        { id: 'source', atom: seoSourceAtom },
        { id: 'campaign', atom: seoCampaignAtom },
        { id: 'content', atom: seoContentAtom }
    ]

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error </Text> 
    if(!data) return <Text> no data </Text> 

    let categorizedUrchins =  data?.userUrchins ?? []

    return (
        <Flex css={{ height: '400px', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$4'}}>
            <FlexCenterCenterRow>
                {seoParams.map((seoParam: ISeoParameter, index: number) => (
                    <FlexCenterCenterColumn key={index}>
                        <ComboBoxWrapper
                            key={`${index}`}
                            index={index} 
                            label={seoParam.id}
                            datumAtom={seoParam.atom}
                            popoverVariant={PopoverVariantTypeEnum.SMALL}
                            initItems={keyedMapping(categorizedUrchins, seoParam.id)}
                        />
                    </FlexCenterCenterColumn>
                ))}
            </FlexCenterCenterRow>

            <FullUrlWithParams />
        </Flex>
    )
}

export default SeoParamsCacbe
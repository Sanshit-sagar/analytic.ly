import React, { SetStateAction } from 'react'
import { useAtom, WritableAtom } from 'jotai'

import { useUserUrchins } from '../../../hooks/useUserCollections'

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


interface ISeoParameter {
    id: string; 
    atom: WritableAtom<string, SetStateAction<string>>;
}

interface IComboBoxWrapperProps {
    key: string;
    index: number;
    label: string; 
    datumAtom: WritableAtom<string, SetStateAction<string>>; 
    loading: boolean;
    error: any | null | undefined;
}

const ComboBoxWrapper = (props: IComboBoxWrapperProps) => {
    const [value, setValue] = useAtom(props.datumAtom)

    const handleChange = (updatedValue: string) => setValue(updatedValue)

    if(props.loading) return <Text> {props.label} loading... </Text>
    if(props.error) return <Text> Error in retrieving {props.label} </Text> 

    return (
        <AriaComboBox
            key={props.key}
            label={props.label}
            index={props.index}
            value={value} 
            updateValue={handleChange}
        />
    )
}

export const SeoParametersTab = () => { 
    const { data, loading, error } = useUserUrchins()

    const seoParams: ISeoParameter[] = [
        { id: 'medium', atom: seoMediumAtom },
        { id: 'term', atom: seoTermAtom },
        { id: 'source', atom: seoSourceAtom },
        { id: 'campaign', atom: seoCampaignAtom },
        { id: 'content', atom: seoContentAtom }
    ]

    return (
        <Flex css={{ height: '600px', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '225px'}}>
            <FlexCenterCenterRow>
                {seoParams.map((seoParam: ISeoParameter, index: number) => (
                    <FlexCenterCenterColumn key={index}>
                        <ComboBoxWrapper
                            key={`${index}`}
                            index={index} 
                            label={seoParam.id}
                            datumAtom={seoParam.atom}
                            loading={loading}
                            error={error}
                        />
                    </FlexCenterCenterColumn>
                ))}
            </FlexCenterCenterRow>

            <FullUrlWithParams />
        </Flex>
    )
}
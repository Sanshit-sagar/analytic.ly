import React from 'react'

import { SearchAutocomplete } from '../../compositions/SearchField'
import { Item, Section } from '@react-stately/collections';
import { Label, Description } from '../../compositions/ListBox'

import { 
    sources, 
    mediums, 
    terms, 
    contents, 
    campaigns, 
    slugs, 
    Urchin
} from './mocks'

type UrlParameterType = 'utm' | 'custom'
enum UrlParameterEnum {
    UTM = 'utm',
    CUSTOM = 'custom',
}; 
interface IUrlParameter {
    utm: { };
    custom: any;
}

enum UtmParametersEnum {
    SOURCE = 'source',
    MEDIUM = 'medium',
    TERM = 'term',
    CONTENT = 'content',
    CAMPAIGN = 'campaign'
}

type UtmCategory = 'source' | 'medium' | 'term' | 'campaign' | 'content'
const utmCategories: UtmCategory[] = ['source', 'medium', 'term', 'campaign', 'content']

export interface Urchin {
    id: string;
    category: UtmCategory; 
    parameters: string[];
}

const getUserData = (): Map<UtmCategory, Urchin[]> => {

    let utmParameters: Map<UtmCategory, Urchin[]> = new Map<UtmCategory, Urchin[]>()
    utmCategories.map((category: UtmCategory) => utmParameters.set(category, []))

    utmParameters.set(UtmParametersEnum.SOURCE, sources?.length ? [...sources] : [])
    utmParameters.set(UtmParametersEnum.MEDIUM, mediums?.length ? [...mediums] : []);
    utmParameters.set(UtmParametersEnum.TERM, terms?.length ? [...terms] : []);
    utmParameters.set(UtmParametersEnum.CONTENT, campaigns?.length ? [...campaigns] : []);
    utmParameters.set(UtmParametersEnum.CAMPAIGN, contents?.length ? [...contents] : []);

    //todo: set custom parameters here as well
    return utmParameters
}

export const GlobalSearch = () => {
    const userUrlParameters: Map<UtmCategory, Urchin[]> = getUserData()

    if(!userUrlParameters || ! userUrlParameters.keys()) return <Text> No data to show </Text>
   
    return (
        <SearchAutocomplete label='Search' placeholder='Looking for something?' allowsCustomValue>
            {utmCategories.map((category: UtmCategory, categoryIndex: number) => {
                if(!userUrlParameters.has(category)) return null;

                let entryForCategory = userUrlParameters.get(category)
                let paramsForCategory = entryForCategory.parameters ?? []
                let hasParams = paramsForCategory && paramsForCategory?.length

                if(!hasParams || !paramsForCategory) return null;

                return (
                    <Section key={categoryIndex} title={category}>
                        {paramsForCategory.map((param, paramIndex) => {

                            return (
                            <Item key={index} textValue={category}> 
                                <div>
                                    <Label> {item} </Label>
                                    <Description> description: {index} </Description>  
                                </div>
                            </Item>
                            );
                        ))
                    </Section>
                )
            })}
        </SearchAutocomplete>
    );
}
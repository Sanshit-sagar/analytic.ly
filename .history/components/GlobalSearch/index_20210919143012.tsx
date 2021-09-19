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
   
    return (
        <SearchAutocomplete
            label='Search'
            placeholder='Looking for something?'
            allowsCustomValue
            // autoComplete='off'
            // type='search'
            // inputMode='text'
        >
            {utmParameters.keys().map((category: UtmCategory, index: number) => {
                let paramsForCategory = utmParameters.get(key).parameters
                let hasParams = paramsForCategory && paramsForCategory?.length

                return (
                <Section key={index} title={category}>
                    
                        <Item key={index} textValue={category}> 
                            <div>
                                <Label> {item} </Label>
                                <Description> description: {index} </Description>  
                            </div>
                        </Item>
                    ))}
                </Section>
        </SearchAutocomplete>
    );
}
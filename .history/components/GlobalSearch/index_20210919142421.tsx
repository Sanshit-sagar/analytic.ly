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
    slugs: string[];
}

const getUserData = () => {
   
    let utmParameters: Map<UtmCategory, Urchin[]> = new Map<UtmCategory, Urchin[]>();

    utmCategories.map((category: UtmCategory) => utmParameters.set(category, []))
    utmParameters.set(UtmParametersEnum.SOURCE, sources?.length ? [...sources] : [])
    utmParameters.set(UtmParametersEnum.MEDIUM, mediums?.length ? [...mediums] : []);
    utmParameters.set(UtmParametersEnum.TERM, terms?.length ? [...terms] : []);
    utmParameters.set(UtmParametersEnum.CONTENT, campaigns?.length ? [...campaigns] : []);
    utmParameters.set(UtmParametersEnum.CAMPAIGN, contents?.length ? [...contents] : []);

      //todo: set custom parameters here as well
    return urlParameters
}

export const GlobalSearch = () => {
    const userUrlParameters: IUrlParameter = getUserData()
    const userUtms = userUrlParameters[UrlParameterEnum.UTM]
    const userCustomParameters = userUrlParameters[UrlParameterEnum.CUSTOM]
    const items = [userUtms, userCustomParameters]

    return (
        <SearchAutocomplete
            label='Search'
            placeholder='Looking for something?'
            allowsCustomValue
            // autoComplete='off'
            // type='search'
            // inputMode='text'
            
        >
            <Section title='Items'>
                {items.map((urlParameters: utmType, index: number) => (
                    <Item key={index} textValue={item}> 
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
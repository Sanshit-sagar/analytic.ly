import React from 'react'

import { SearchAutocomplete } from '../../compositions/SearchField'
import { Item, Section } from '@react-stately/collections';
import { Label, Description } from '../../compositions/ListBox'
import { Text } from '../../primitives/Text'

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

type UtmParams = {
    [utmCategory in keyof UtmCategory]: Urchin[]
}

const getUserData = () => {
    
    let utmParameters  = utmCategories.map((category: UtmCategory) => utmParameters[category] = [])

    utmParameters[UtmParametersEnum.SOURCE] = sources?.length ? [...sources] : []
    utmParameters[UtmParametersEnum.MEDIUM] = mediums?.length ? [...mediums] : []
    utmParameters[UtmParametersEnum.TERM] = terms?.length ? [...terms] : []
    utmParameters[UtmParametersEnum.CONTENT] = campaigns?.length ? [...campaigns] : []
    utmParameters[UtmParametersEnum.CAMPAIGN] = contents?.length ? [...contents] : []

    //todo: set custom parameters here as well
    return utmParameters
}


export const GlobalSearch = () => {
    const userLibrary = getUserData()
    if(!userUrlParameters || ! Object.keys(userUrlParameters)) return <Text> No data to show </Text>

    return (
        <SearchAutocomplete label='Search' placeholder='Looking for something?' allowsCustomValue>
            {utmCategories.map((category: UtmCategory, categoryIndex: number) => {
                if(!userUrlParameters || !userUrlParameters[category]?.length) return null;
                if(!userUrlParameters[category] || !userUrlParameters[category]?.length) return null;
                let urchins: Urchin[] = userUrlParameters[category] 

                return (
                    <Section 
                        key={categoryIndex} 
                        title={category}
                    >
                        {urchins.map((param, urchinIndex) => (
                            <Item 
                                key={urchinIndex} 
                                textValue={param.id}
                            > 
                                <div>
                                    <Label> {param.id} </Label>
                                    <Description> 
                                        {param.category}: {param.slugs.length} 
                                    </Description>  
                                </div>
                            </Item>
                        ))}
                    </Section>
                )
            })}
        </SearchAutocomplete>
    );
}
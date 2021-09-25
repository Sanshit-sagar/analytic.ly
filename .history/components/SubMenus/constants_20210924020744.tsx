export enum HoverTypeEnum {
    START = 'start',
    END = 'end',
    CHANGE = 'change',
    NONE = 'none'
}

export enum UrchinCategoryEnum {
    MEDIUM   = 'medium',
    TERM     = 'term',
    SOURCE   = 'source',
    CAMPAIGN = 'campaign',
    CONTENT  = 'content',
    NONE     = 'none'
};

export enum ColorsEnum {
    RED     =  'red',
    ORANGE  =  'orange',
    YELLOW  =  'yellow',
    GREEN   =  'green',
    CLEAR   =  'transparent'
};

export enum LoadingStatusEnum {
    LOADING         = 'loading',
    LOADING_MORE    = 'loadingMore',
    SORTING         = 'sorting',
    FILTERING       = 'filtering',
    IDLE            = 'idle',
    ERROR           = 'error'
};

export enum SortDirectionEnum {
    ASC     =   'ascending',
    DESC    =   'descending'
}

export enum ServiceStateEnum {
    INIT     ='init',
    LOADING  = 'loading',
    LOADED   = 'loaded',
    ERROR    = 'error'
}



// enum InteractionEnum {
//     FOCUS = 'focus',
//     HOVER = 'hover',
//     BLUR = 'blur',
//     CLICK = 'click',
// };
// type InteractionType = InteractionEnum.FOCUS | InteractionEnum.HOVER | InteractionEnum.BLUR | InteractionEnum.CLICK

type FocusEvent = { 
    target: HTMLElement; 
    pointerType: 'mouse' | 'pen'; 
    type: 'hoverstart' | 'hoverend';
};

type CategoryType = 
    | UrchinCategoryEnum.MEDIUM 
    | UrchinCategoryEnum.SOURCE 
    | UrchinCategoryEnum.TERM 
    | UrchinCategoryEnum.CAMPAIGN
    | UrchinCategoryEnum.CONTENT 
    | UrchinCategoryEnum.NONE

type HoverType = 
    | HoverTypeEnum.START 
    | HoverTypeEnum.END 
    | HoverTypeEnum.CHANGE 
    | HoverTypeEnum.NONE

    
export const descriptions: any = Object.values({
    'destination': 'Enter or type the URL that you would like to slugify',
    'slug': 'Customize the settings to generate a slug that best fits your needs',
    'seo': 'Start fine-tuning your analytics by templating SEO and UTM parameters',
    'abtesting': 'Split traffic and measure customer responses to new features',
    'timeframe': 'When should this slug self-detonate?',
    'security': 'Reset or toggle a passord at any time',
    'qrCode': 'Make your content avilable at the click of a picture',
    'share': 'Generate shareable links and messages for all your favourite platforms'
})
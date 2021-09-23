import { atom, Atom, WritableAtom } from 'jotai'

// enum InteractionEnum {
//     FOCUS = 'focus',
//     HOVER = 'hover',
//     BLUR = 'blur',
//     CLICK = 'click',
// };
// type InteractionType = InteractionEnum.FOCUS | InteractionEnum.HOVER | InteractionEnum.BLUR | InteractionEnum.CLICK

enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    SOURCE = 'source',
    TERM = 'term',
    CAMPAIGN = 'campaign',
    CONTENT = 'content',
    NONE = 'none'
}
export enum HoverTypeEnum {
    START = 'start',
    END = 'end',
    CHANGE = 'change',
    NONE = 'none'
}

type FocusEvent { 
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

enum ColorsEnum {
    RED     =   'red',
    ORANGE  =   'orange',
    YELLOW  =   'yellow',
    GREEN   =   'green',
    CLEAR   =   'transparent'
}

export interface HoverDetails {
    isHovered: boolean;
    hoveredParameter: CategoryType;
    hoveredType: HoverType
}

function mapIdToParameter(id: string): CategoryType {
    let map =[
        UrchinCategoryEnum.MEDIUM,
        UrchinCategoryEnum.TERM, 
        UrchinCategoryEnum.SOURCE, 
        UrchinCategoryEnum.CAMPAIGN, 
        UrchinCategoryEnum.CONTENT
    ];
    return map[parseInt(id)]; 
}

const isHoveredAtom = atom<boolean>(false)
const hoveredTypeAtom = atom<HoverType>(HoverTypeEnum.NONE)
const hoveredParamAtom = atom<UrchinCategoryEnum>(UrchinCategoryEnum.NONE)

const hoverDetailsGroupAtom = atom(
    (get) => {
        let isHovered = get(isHoveredAtom)
        let hoveredType = get(hoveredTypeAtom) || undefined
        let hoveredParameter =get(hoveredParamAtom) || undefined

        return { isHovered, hoveredType, hoveredParameter };
    },
    (_get, set, { isHovered, hoveredType, hoveredParameter }) => {
        set(isHoveredAtom, isHovered)
        set(hoveredTypeAtom, hoveredType)
        set(hoveredParamAtom, hoveredParameter)
    }
)

const writeHoverEventAtom = atom(
    null,
    (_get, set, updateEvent: FocusEvent) => {
        set(hoverDetailsGroupAtom, { 
            isHovered: updateEvent.type === 'hoverend' ? false : true,
            hoveredType: updateEvent.type === 'hoverend' ? HoverTypeEnum.END : HoverTypeEnum.START,
            hoveredParameter: mapIdToParameter(updateEvent.target.id) 
        })
    }
)

const writeHoverChangeAtom = atom(
    null,
    (_get, set, changeEvent: React.ChangeEvent) => {
        set(hoverDetailsGroupAtom, { 
            isHovered: true,
            hoveredType: HoverTypeEnum.CHANGE,
            hoveredParameter: mapIdToParameter(changeEvent.target.id)
        })
    }
)

const hoverColorAtom = atom(
    (get) => {
        return (
                get(hoveredTypeAtom) === HoverTypeEnum.START ? ColorsEnum.GREEN 
            :   get(hoveredTypeAtom) === HoverTypeEnum.CHANGE ? ColorsEnum.YELLOW
            :   get(hoveredTypeAtom) === HoverTypeEnum.END ? ColorsEnum.RED  
            :   ColorsEnum.CLEAR
        );
    }
)

const isHovered = () => {
    const isHovered = useAtomValue(isHoveredAtom)
    return <Text size='$1c ss={{ color: '$text'  }}> {isHovered ? 'hovering...' : ''} </Text> 
}

export const InteractionsView = () => {
    

}
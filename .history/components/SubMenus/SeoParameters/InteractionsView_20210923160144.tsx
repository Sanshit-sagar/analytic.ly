import { atom } from 'jotai'
import { styled } from '../../../stitches.config'
import { useAtomValue } from 'jotai/utils'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

// enum InteractionEnum {
//     FOCUS = 'focus',
//     HOVER = 'hover',
//     BLUR = 'blur',
//     CLICK = 'click',
// };
// type InteractionType = InteractionEnum.FOCUS | InteractionEnum.HOVER | InteractionEnum.BLUR | InteractionEnum.CLICK

const InteractionsContainer = styled('div', {
    display: 'flex',
    fd: 'row', 
    jc: 'space-evenly',
    ai: 'center', 
    gap: '$1',
    width: '200px'
})

const TextElem = styled(Text, {
    fontSize: '$2',
    color: '$text',
}); 

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

enum UrchinCategoryEnum {
    MEDIUM = 'medium',
    TERM = 'term',
    SOURCE = 'source',
    CAMPAIGN = 'campaign',
    CONTENT = 'content'
}
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
    return <TextElem> T/F:  {isHovered ? 'hovering...' : ''} </TextElem> 
}

const HoveredParameter = () => {
    const param = useAtomValue(hoveredParamAtom)
    return <TextElem> Name: {param} </TextElem> 
}

const HoveredType = () => {
    const type = useAtomValue(hoveredTypeAtom) 
    return <TextElem> Type: {type} </TextElem> 
}

export const InteractionsView = () => {
    const color = useAtomValue(hoverColorAtom)

    return (
        <InteractionsContainer>
            <Flex css={{ color: 'red' }}>
                <isHovered />
                <HoveredParameter />
                <HoveredType /> 
            </Flex>
        </InteractionsContainer>
    )
}
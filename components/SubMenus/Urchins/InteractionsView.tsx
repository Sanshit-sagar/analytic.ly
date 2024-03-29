import { styled } from '../../../stitches.config'

import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { 
    HoverType, 
    CategoryType 
} from '../interfaces'

import {
    ColorsEnum,
    HoverTypeEnum,
    UrchinCategoryEnum,
} from '../constants'


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

function mapIdToParameter(id: string | undefined): CategoryType | undefined {
    if(!id) return undefined; 
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
            hoveredParameter: mapIdToParameter(updateEvent?.currentTarget?.id || undefined) 
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

const HoveredAsserter = () => {
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
            <Flex css={{ color: `${color}` }}>
                <HoveredAsserter />
                <HoveredParameter />
                <HoveredType /> 
            </Flex>
        </InteractionsContainer>
    )
}
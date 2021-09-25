import React from 'react'

import { NumberField } from '../../compositions/NumberField'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'

import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { useSuggestedSlug } from '../../hooks/useSuggestedSlugs'

import { 
    MixIcon,
    LetterCaseCapitalizeIcon,
    DotIcon, 
    DashIcon, 
    StarIcon
} from '@radix-ui/react-icons'

import SelectMenu from '../../compositions/SelectMenu'

const SlugSelectionContainer = styled(Flex, {
    fd: 
});

const OptionsSelectors = styled(Flex, {
    fd: 'row', 
    jc: 'center', 
    ai: 'stretch', 
    gap: '$1',
});



type SaltTypeType = 'string' | 'number' | 'mixed';

interface ISaltType {
    id: SaltTypeType; 
    icon: JSX.Element; 
}

interface ISelectMenuProps {
    textValue: string;
    value: string;
    alt?: string | undefined;
    icon?: JSX.Element | undefined;  
    description?: string | undefined;
    groupName: string;  
}

const slugCategories: ISelectMenuProps[] = [
    { textValue: 'Random', value: 'random', icon: <MixIcon />, description: '', alt: '', groupName: 'category' },
    { textValue: 'Custom', value: 'custom', icon: <StarIcon />, description: '', alt: '', groupName: 'category' },
];

const separators: ISelectMenuProps[] = [
    { textValue: '-', value: 'hyphen', alt: 'dash', icon: <DashIcon />, description: '', groupName: 'separator' },
    { textValue: '_', value: 'underscore', alt: undefined, icon: undefined, description: '', groupName: 'separator' },
    { textValue: '*', value: 'star', alt: 'asterisk', icon: <StarIcon />, description: '', groupName: 'separator' }, 
    { textValue: '.', value: 'dot', alt: 'period', icon: <DotIcon />, description: '', groupName: 'separator' }
];

const saltTypes: ISaltType[] = [
    { id: 'number', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'string', icon: <LetterCaseCapitalizeIcon /> },
    { id: 'mixed', icon: <MixIcon /> },
];

export const numStringsAtom = atom(2)
export const saltLengthAtom = atom(3)
export const saltTypeIndexAtom = atom(0)
export const separatorIndexAtom = atom(0)

export const separatorAtom = atom((get) => separators[get(separatorIndexAtom)].textValue)
export const separatorTextAtom = atom((get) => separators[get(separatorIndexAtom)].value)
export const saltTypeAtom = atom((get) => saltTypes[get(saltTypeIndexAtom)].id)

export const NUM_STRINGS_LABEL = 'Number of Strings'
export const SALT_LENGTH_LABEL = 'Salt Length'
export const SEPARATOR_LABEL = 'Separator'


export const SEPARATOR_NAME = 'STRING SEPARATOR'
export const SALT_LENGTH_NAME = 'SALT LENGTH'
export const SLUG_CATEGORY = 'SLUG CATEGORY'

export const suggestedSlugAtom = atom('')

const SuggestedSlug  = () => {
    const numStrings = useAtomValue(numStringsAtom)
    const saltLength = useAtomValue(saltLengthAtom)
    const separator = useAtomValue(separatorAtom)
    const saltType = useAtomValue(saltTypeAtom)
    let isManly = false; 

    const { suggestion, loading, error } = useSuggestedSlug({ saltLength, numStrings, separator, saltType, isManly })

    if(loading) return <Text size='4'> loading... </Text>
    if(error) return <Text size='4'> error! {error.message} </Text>

    return (
        <Text size='6' css={{ color: '$funkyText'}}>
            {suggestion} 
        </Text>
    )
}

const slugCategoryIndexAtom = atom<number>(0)
const slugCategoryAtom = atom<string>(slugCategories[0].textValue)

const SlugCategorySelector = () => {
    
    const [slugCateogoryIndex, setSlugCategoryIndex] = useAtom(slugCategoryIndexAtom)
    const slugCategory = useAtomValue(slugCategoryAtom) 

    const SelectedCategoryIconAndTextValue = () => (
        <Flex css={{ width: '100%', fd: 'row', jc: 'space-between', ai: 'center', gap: '$2' }}>
            <Text>{slugCategory}</Text>
        </Flex>
    ); 

    return (
        <SelectMenu
            selectOnly={false}
            items={slugCategories}
            selectedIndex={slugCateogoryIndex}
            setSelectedIndex={setSlugCategoryIndex}
            selectedValue={<SelectedCategoryIconAndTextValue />}
            selectedTextValue={slugCategory}
            group={SLUG_CATEGORY}
        />
    )
}


const NumStringsFieldSet = () => {
    const [numStrings, setNumStrings] = useAtom(numStringsAtom)

    return (
        <NumberField
            label={NUM_STRINGS_LABEL}
            value={numStrings} 
            onChange={(value: number) => setNumStrings(value)}
        />
    );
}

const SaltLengthFieldSet = () => {
    const [saltLength, setSaltLength] = useAtom(saltLengthAtom)

    return (
        <NumberField
            label={SALT_LENGTH_LABEL}
            value={saltLength} 
            onChange={(value: number) => setSaltLength(value)}
        />
    )
}

const SeperatorSelector = () => {
    const [separatorIndex, setSeparatorIndex] = useAtom(separatorIndexAtom)
    const separator = useAtomValue(separatorAtom)
    const separatorText = useAtomValue(separatorTextAtom)

    return (
        <SelectMenu 
            selectOnly={false}
            items={separators}
            selectedIndex={separatorIndex}
            setSelectedIndex={setSeparatorIndex}
            selectedValue={separator}
            selectedTextValue={separatorText}
            group={SEPARATOR_LABEL}
        />
    )
}

export const SlugSelectionTab = () => (
    <SlugSelectionContainer>
        <OptionsSelectors>
            <SlugCategorySelector />
            <NumStringsFieldSet />
            <SaltLengthFieldSet />
            <SeperatorSelector />
        </OptionsSelectors>

        <SuggestedSlug />
    </SlugSelectionContainer>
);

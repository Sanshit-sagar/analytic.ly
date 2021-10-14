import React, { useEffect } from 'react'

import { atom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import toast from 'react-hot-toast'
import { useSlugsWithViews } from './hooks'

import { Text } from '../../primitives/Text'
import { AreaDifference } from './AreaDifference'
import { ParentSizeProps, IItem } from './interfaces'

import { 
    MenuBar, 
    LargeContainer,
} from './styled'
import SelectMenu from '../../compositions/SelectMenu'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

function SelectPropsFactory(keys: string[]): IItem[] {
    return keys.map((key: string, i: number) => {
        return {
            id: `${i}`,
            value: key,
            textValue: `${key}`,
            icon: undefined,
            alt: undefined,
        }
    })
}

const endpointAtom = atom({ 'slug1': '',  'slug2': '' })
const setEndpointAtom = atom(
    (get) => get(endpointAtom),
    (get, set, update: { name: string; value: string; }) => {
        set(endpointAtom, { 
            ...get(endpointAtom), 
            [`${update.name}`]: `${update.value}` 
        });
    }
)

const SlugSelector = ({ 
    slugId, 
    userSlugs,
    selectedIndex,
    endpoint
}: { 
    slugId: string; 
    userSlugs: string[]; 
    selectedIndex: number;
    endpoint: string;
}) => {

    const setEndpoint = useUpdateAtom(setEndpointAtom)
  
    const handleUpdate = (name: string, value: string) => {
        setEndpoint({ name, value })
        toast.success(`Selected ${value}, [${value}]`)
    }
    
    let slugItems: IItem[] = SelectPropsFactory(userSlugs?.length ? userSlugs : [''])   

    useEffect(() => {
        setEndpoint({ name: slugId, value: endpoint })
    })

    return (
        <SelectMenu
            selectOnly={true}
            group={'Slugs'}
            items={slugItems} 
            selectedIndex={selectedIndex}
            setSelectedIndex={(val: number) => handleUpdate(slugId, userSlugs[val])}
            selectedTextValue={slugItems[selectedIndex].textValue}
            selectedValue={slugItems[selectedIndex].value}
        /> 
    )
}

// export const Endpoints = () => {
//     const endpoints = useAtomValue(endpointAtom)
//     return  <Text> {JSON.stringify(endpoints)} </Text>;
// }


const SelectionMenu = ({ userSlugs }: { userSlugs: string[]; }) => (
    <MenuBar> 
        <SlugSelector 
            slugId={'slug1'}
            userSlugs={userSlugs} 
            selectedIndex={2}
            endpoint={`/api/metrics/slug/avenged-darkness-singe-aqvnz/views`}
        />
        {/* <Endpoints />  */}
        <SlugSelector 
            slugId={'slug2'}
            userSlugs={userSlugs} 
            selectedIndex={4}
            endpoint={`/api/metrics/slug/brave-delay-damage-7rgys/views`}
        />
    </MenuBar>
)


export const ThresholdChart = () => {
    const { data, loading, error } = useSlugsWithViews()

    if(loading) return <Text> loading... </Text> 
    if(error) return <Text> error! </Text> 

    let userSlugs: string[] = !loading && !error && data ? Object.keys(data) : []

    return (
        <ParentSize>
            {({ height, width }: ParentSizeProps) => (
                <AreaDifference 
                    slugs={userSlugs}
                    height={height} 
                    width={width} 
                />
            )}
        </ParentSize>
    );
}

interface ThresholdProps {
    isLarge?: boolean
}; 

export const Threshold = ({ isLarge = false }: ThresholdProps) => (
        isLarge 
    ?   <LargeContainer> <ThresholdChart /> </LargeContainer>
    :   <SmallContainer> <ThresholdChart /> </SmallContainer>
);

// /api/users/sanshit.sagar@gmail.com/rankings/uniques

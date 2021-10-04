import React from 'react'
import { styled } from '../../stitches.config'

import { useAtom } from 'jotai'
import {
    zoomOptions,
    rangeOptions,
    rangeIndexAtom,
    intervalOptions,
    intervalIndexAtom,
    clickstreamZoomIndexAtom,
    statisticOptions,
    statisticIndexAtom,
    IItem
} from '../../atoms/timeseries'

import { Text } from '../../primitives/Text'
import { Toolbar } from '../../primitives/Toolbar'
import { ToolbarButtonGroup, ToolbarSeparator } from '../../primitives/Toolbar'

import SelectMenu from '../../compositions/SelectMenu'
import { ToggleGroup } from '../../compositions/ToggleButtonsGroup'

import { 
    SpaceEvenlyHorizontallyIcon, 
    CalendarIcon, 
    BarChartIcon 
} from '@radix-ui/react-icons'

const ToolbarMenu = styled(Toolbar, {
    height: 30, 
    border: 'none', 
    boxShadow: 'none', 
    width: '98.5%' 
});

const Selected = ({ 
    icon, 
    options 
}: { 
    icon: React.ReactNode; 
    options: string 
}) => (
    <>
        {icon}
        <Text size='1'> {options.textValue} </Text>
    </>
); 

export const Range = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(rangeIndexAtom)

    return (
        <SelectMenu
            selectOnly={true} 
            group={'Presets'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={rangeOptions[selectedIndex].textValue}
            selectedTextValue={
                <Selected 
                    icon={<CalendarIcon />} 
                    text={rangeOptions[selectedIndex]} 
                />
            }
            items={rangeOptions}
        />
    );
}

export const Increments = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(intervalIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Interval Length'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedTextValue={
                <Selected 
                    icon={SpaceEvenlyHorizontallyIcon} 
                    text={intervalOptions[selectedIndex]} 
                />
            }
            items={intervalOptions}
        />
    )
}

export const Statistic = () => {
    const [selectedIndex, setSelectedIndex] = useAtom(statisticIndexAtom)

    return (
        <SelectMenu
            selectOnly={true}
            group={'Statistic Selector'}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            selectedValue={`statisticOptions[selectedIndex].value`}
            selectedTextValue={
                <Selected 
                    icon={BarChartIcon} 
                    text={statisticOptions[selectedIndex]} 
                />
            }
            items={statisticOptions}
        />
    )
}

export const Zoom = () => {
    const [zoomIndex, setZoomIndex] = useAtom(clickstreamZoomIndexAtom)

    return (
        <ToggleGroup 
            type='single'
            selectedIndex={`${zoomIndex}`}
            setSelectedIndex={(value: number) => setZoomIndex(value || 0)}
            selectedValue={`${zoomIndex}`}
            selectedTextValue={`${zoomOptions[zoomIndex].value}`}
            selectedTextValue={
                <Selected 
                    icon={BarChartIcon} 
                    text={statisticOptions[selectedIndex]} 
                />
            }
            items={zoomOptions}
            groupName={'Clickstream Zoom'}
        />
    );
}

const Controller = () => {

    return (
        <ToolbarMenu aria-label='Timeseries-controls'>
            <ToolbarButtonGroup>
               
                <ToolbarSeparator />
                <Zoom />
                <ToolbarSeparator />
                <Range />
                <Increments />
                <ToolbarSeparator />
                <Statistic />
            </ToolbarButtonGroup>
        </ToolbarMenu>
    )
}

export default Controller
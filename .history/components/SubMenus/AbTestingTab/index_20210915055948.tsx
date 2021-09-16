import React from 'react'

import { styled } from '../../../stitches.config'

import { Flex } from '../../../primitives/Flex'
import { Text } from '../../../primitives/Text'

import { Toolbar, ToolbarSeparator } from '../../../primitives/Toolbar'

import { RangeSlider } from '../../../compositions/Slider'
import { NumberField } from '../../../compositions/NumberField'

import { useAtom, atom } from 'jotai' 
import { useUpdateAtom, useAtomValue } from 'jotai/utils'

export const ONE_PERCENT = 0.01
export const ONE_HUNDRED_PERCENT = 1.00
export const MIN_ALTERNATES = 2
export const MAX_ALTERNATES = 10

export const VALID_URL_REGEX: RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const alternateCountAtom = atom(MIN_ALTERNATES)

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'flex-start', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});

const handleInitValues = (alternateCount: number, stepSize: number): number[] => {
    let temp: number[] = [...Array(alternateCount)]; 
    temp[0] = 0
    for(let i = 1; i<=alternateCount; i++) temp[i] = Math.round((temp[i-1] + stepSize) * 100)/100
    return temp
}

const minValue = ONE_PERCENT
const maxValue = ONE_HUNDRED_PERCENT

export const abTestGroupDiversionPercentAtom = atom([0.5, 0.5])

const Controller = () => {
    const setAbTestPercentages = useUpdateAtom(abTestGroupDiversionPercentAtom)
    const [alternateCount, setAlternateCount] = useAtom(alternateCountAtom)
    let stepSize = (maxValue-minValue)/alternateCount    
    const [values, setValues] = React.useState([...handleInitValues(alternateCount, stepSize)])

    const handleAlternateCountChange = (updatedAltCount: number) => {
        setAlternateCount(updatedAltCount)
        stepSize = (maxValue-minValue)/updatedAltCount

        const temp = handleInitValues(updatedAltCount, stepSize)

        setAbTestPercentages([...temp])
        setValues([...temp])
    }

    return (
        <Box
            css={{ 
                bc: '$neutral', display: 'flex', fd: 'column', jc: 'flex-start', ai: 'flex-end', gap: '$3',
                border: 'thin solid $border', '&:hover': { borderColor: '$border3' }, 
            }}
        >
            <NumberField
                label='Alternates'
                value={alternateCount}
                onChange={handleAlternateCountChange}
                minValue={MIN_ALTERNATES}
                maxValue={MAX_ALTERNATES}
            />
            <ToolbarSeparator /> 
            <RangeSlider
                id={`Alt-Url-Split-for-${alternateCount}-for-${maxValue}-to-${minValue}`}
                label={`Alternate-URLs`}
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[...values]}
                values={values}
                step={0.01}
            />
        </Toolbar>
    );
}

const AbPercentages = () => {
    const abTestPercentages = useAtomValue(abTestGroupDiversionPercentAtom)

    return (
        <Flex css={{ fd: 'row', jc: 'space-evenly', ai: 'center', gap: '$3' }}>
            {abTestPercentages.map((abpct: number, index: number) => (
                <Text 
                    key={index}
                    size='4' 
                    css={{ color: '$funkyText', '&:hover': { color: '$funky' }}}
                >
                    {`${Math.round(abpct*100)}`}
                </Text>
            ))}
        </Flex>
    )
}


function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}

export const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <Controller />
            <AbPercentages /> 
        </AbTestingContainer>
    )
}

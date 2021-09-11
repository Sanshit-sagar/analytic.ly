import React, { useRef } from 'react'

import { styled } from '../../../stitches.config'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { Box } from '../../../primitives/Box'
import { CentralControlGroup, Label } from '../../../primitives/FieldSet'

import { useSliderState } from '@react-stately/slider'
import { useSlider, useSliderThumb } from '@react-aria/slider'

import { useFocusRing } from '@react-aria/focus'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { mergeProps } from '@react-aria/utils'
import { useNumberFormatter } from '@react-aria/i18n'

const AbTestingContainer = styled('div', {
    height: '100%',
    width: '100%',
    padding: 10,
    display: 'flex',
    fd: 'column',
    jc: 'center', 
    ai: 'center', 
    gap: '$1',
    margin: 0
});






























accent' : '$accentFull' 













;









































const AbTestingTab = () => {

    return (
        <AbTestingContainer>
            <RangeSlider
                label="Grade Range"
                formatOptions={{ style: 'percent' }}
                maxValue={1}
                defaultValue={[0.20, 0.50]}
                step={0.01}
            />
        </AbTestingContainer>
    )
}

export default AbTestingTab
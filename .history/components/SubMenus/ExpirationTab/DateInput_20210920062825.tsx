import React, { useState, useMemo, useRef, useLayoutEffect } from 'react'
import { styled } from '../../../stitches.config'

import { FocusScope, useFocusManager } from '@react-aria/focus'
import { useFocus } from '@react-aria/interactions'

import { useDateFormatter } from '@react-aria/i18n'
import { mergeProps, isIOS } from '@react-aria/utils'
import { useSpinButton } from '@react-aria/spinbutton'
import { NumberParser } from '@internationalized/number'

const DateInputContainer = styled('div', {
    display: 'inline-block',
    fontSize: 32,
    padding: '$1 $2',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
});

const CustomDateInput = () => {


    return (
        <DateInputContainer 
            role='group' 
            aria-label='Date'
        >
            <FocusScope>
                <Segment aria-label='Month' max={12}>
                    12
                </Segment>
                -
                <Segment aria-label='Day' max={31}>
                    02
                </Segment>
                -
                <Segment aria-label='Year' max={2023}>
                    2021    
                </Segment> 
            </FocusScope>
        </DateInputContainer>
    )
}

interface ISegmentProps {
    children: React.ReactElement | React.ReactNode | null; 
    ariaLabel: string;
    max: number; 
}

function Segment({ children, "aria-label": ariaLabel, max }: ISegmentProps) {

    let [isFocused, setFocused] = useState(false)
    let { focusProps } = useFocus({ onFocusChange: setFocused })

    let numberParser = useMemo(() => new NumberParser("en-US"), []);
    let focusManager = new useFocusManager() 

    let [value, setValue] = useState(children)

    let ref = useRef()
    let timeoutRef = useRef()

    useLayoutEffect(() => {
        let handler((e) => {
            e.preventDefault(); 

            switch(e.inputType) {
                case 'insertText': 
                    setValue((value) => {
                        let newValue = value 
                    })
            }
        })
    })
}

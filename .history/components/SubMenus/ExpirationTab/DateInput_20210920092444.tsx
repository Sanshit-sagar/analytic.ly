import React, { useState, useMemo, useRef, useEffect } from 'react'
import { styled } from '../../../stitches.config'

import { FocusScope, useFocusManager } from '@react-aria/focus'
import { useFocus, useFocusVisible } from '@react-aria/interactions'

import { mergeProps, isIOS } from '@react-aria/utils'
import { useSpinButton } from '@react-aria/spinbutton'
import { NumberParser } from '@internationalized/number'

import { useGloballyConsistentColors } from '../../../hooks/useColors'

const DateInputContainer = styled('div', {
    display: 'inline-block',
    fontSize: 32,
    padding: '$1 $2',
    border: '1px solid $border',
    '&:hover': {
        borderColor: '$border3'
    }
});

interface ISegmentProps {
    children: React.ReactElement | React.ReactNode | null; 
    ariaLabel: string;
    max: number; 
}

function Segment({ children, "aria-label": ariaLabel, max }) {

    let [isFocused, setFocused] = useState(false)

    let {focusProps} = useFocus({ 
        onFocusChange:((isFocused) => setFocused(isFocused)),
    })

    let numberParser = new NumberParser('en-US')
    let focusManager = useFocusManager();

    let [value, setValue] = useState(children)
    let ref: React.RefObject<HTMLSpanElement> = useRef()
    let timeoutRef = useRef()

    useLayoutEffect(() => {
        let handler = (e: InputEvent) => {
            e.preventDefault(); 

            switch(e.inputType) {
                case 'insertText': 
                    setValue((value: string) => {
                        let newValue: string = value + e.data 

                        if(numberParser.isValidPartialNumber(newValue)) {
                            let parsed = numberParser.parse(newValue)

                            if(!isNaN(parsed) && parsed > max) {
                                if(e?.data) {
                                    newValue = e.data
                                }
                            }

                            if (parsed * 10 > max) {
                                clearTimeout(timeoutRef.current);

                                if(timeoutRef && timeoutRef?.current) {
                                    timeoutRef.current = setTimeout(() => {
                                        focusManager.focusNext();
                                    }, 0);
                                }
                            }
                            return newValue;
                        }
                        return value
                    });
                break;
            default:
                break;
        }
    };
        
    ref?.current?.addEventListener("beforeinput", handler)
    
    return () => {
            if(ref && ref?.current) {
                ref.current.removeEventListener("beforeinput", handler);
            } else {
                return null; 
            }
        };
    }, []);
    

    let onKeyDown = (e) => {
        switch (e.key) {
            case 'Backspace':
                setValue((value) => value?.toString().slice(0, -1))
                break;
            case 'Delete':
                setValue((value) => value?.toString().slice(1))
                break;
            default:
        }
    };

    let { spinButtonProps } = useSpinButton({
        value,
        onIncrement: () => setValue((value: number | string | undefined | null) => parseInt(`${value}`) + 1),
        onDecrement: () => setValue((value: number | string | undefined | null) => parseInt(`${value}`) - 1)
    });
    

    if(isIOS()) {
        spinButtonProps.role = "textbox";
        spinButtonProps["aria-roledescription"] = "date segment";
    }

    const colors = useGloballyConsistentColors()

    return (
        <>
        <span
            tabIndex={0}
            {...mergeProps(focusProps, spinButtonProps, { onKeyDown })}
            contentEditable
            suppressContentEditableWarning={true}
            inputMode='numeric'
            ref={ref}
            aria-label={ariaLabel}
            style={{
                backgroundColor: isFocused ? colors.accent : colors.panel,
                color: isFocused ? colors.accentContrast : colors.text,
                padding: '1px 2px',
                cursor: 'default',
                caretColor: "transparent",
                outline: 'none',
                display: 'inline-flex',
                textAlign: 'right',
                fontFamily: '-apple-system',
                fontVariantNumeric: "tabular-nums",
                width: String(max).length + "ch"
            }}
        >
            {value}
        </span>
        </>
    ); 
}


export const CustomDateInput = () => {
    
    let {isFocusVisible} = useFocusVisible({isTextInput: true});

    return (
        <DateInputContainer 
            role='group' 
            aria-label='Date'
        >
        
            <h1> hi </h1> 
            <div>Focus visible: {String(isFocusVisible)}</div>
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

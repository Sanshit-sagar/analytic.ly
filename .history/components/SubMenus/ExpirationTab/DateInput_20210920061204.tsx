import React, { useMemo, useRef, useState, useLayoutEffect } from 'react'
import { styled } from '../../../stitches.config'

import { useFocusRing, FocusScope, FocusManager } from '@react-aria/focus'
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
        <DateInputContainer role='group' aria-label='Date'>
            <FocusScope>
                
            </FocusScope>

        </DateInputContainer>
    )
}


import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { DatePickerWrapper } from '../../primitives/Shared'

import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai'

import { DateUtils } from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DayModifiers } from 'react-day-picker/types/Modifiers'
import 'react-day-picker/lib/style.css'

const NO_INPUT_ERR = 'NO DAY SPECIFIED'
const INVALID_DAY_ERR = 'INVALID DAY SPECIFIED'
const DISABLED_DAY_ERR = 'INVALID DAY SPECIFIED'

interface ISlugLifetimeProps {
    start: Date | null | undefined; 
    end: Date | null | undefined;
    hideOnDayClick: boolean;
    enteredTo: // tracking last day of mouseenter
}


const slugLifetimeAtom: PrimitiveAtom<ISlugLifetimeProps> = atom({ start: null, end: null, hideOnDayClick: false, enteredTo: null })
const slugLifetimeStartAtom = atom((get) => get(slugLifetimeAtom).start)
const slugLifetimeEndAtom = get((get) => get(slugLifetimeAtom).end)

const isLifetimeStartSelectedAtom = atom((get) => typeof get(slugLifetimeStartAtom) === 'Date')
const isLifetimeEndSelectedAtom = atom((get) => typeof get(slugLifetimeEndAtom) === 'Date')
const isSelectionBeforeStartAtom = atom((get) => get(isLifetimeStartSelectedAtom) && get(isLifetimeEndSelectedAtom))




















































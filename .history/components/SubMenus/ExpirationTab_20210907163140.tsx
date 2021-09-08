import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { DatePickerWrapper } from '../../primitives/Shared'

import { atom, useAtom, PrimitiveAtom } from 'jotai'
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

const slugLifetimeAtom: PrimitiveAtom<ISlugLifetimeProps> = atom({start:null,end: null, hideOnDayClick:false, enteredTo:null })
const slugLifetimeStartAtom = atom((get) => get(slugLifetimeAtom).start)
const slugLifetimeEndAtom = get((get) => get(slugLifetimeAtom).end)

const isLifetimeStartSelectedAtom = atom((get) => get(slugLifetimeStartAtom)!==undefined && get(slugLifetimeStartAtom)!==null)
const isLifetimeEndSelectedAtom = atom((get) => get(slugLifetimeEndAtom)!==undefined && get(slugLifetimeEndAtom)!==null)
const isSelectionBeforeStartAtom = atom((get) => get(isLifetimeStartSelectedAtom) && get(isLifetimeEndSelectedAtom))
const firstDayNotSelectedAtom = atom((get) => !get(isLifetimeStartSelectedAtom))

const lastDayForMouseEnterAtom = atom(null)
const selectedDayIsBeforeFridayAtom = atom((get) =>{
    let from = 
    let day = get(lastDayForMouseEnterAtom)
}   return get(slugLifetimeStartAtom) && get(lastDayForMouseEnterAtom) && DateUtils.isDayBefore(day, from);

const isSelectingFirstDayAtom = ((get) => {
    return get(firstDayNotSelectedAtom) && get(isSelectionBeforeStartAtom) && get(selectedDayIsBeforeFridayAtom)
})

const DateTimePicker = () => {

    const { }

}




















































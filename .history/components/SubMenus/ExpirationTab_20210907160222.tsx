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



const slugLifetimeAtom = atom({ start: undefined, end: undefined, to: })





















































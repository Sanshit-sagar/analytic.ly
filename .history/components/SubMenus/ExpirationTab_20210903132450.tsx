import React from 'react'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'

import { atom, useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import DayPickerInput from 'react-day-picker/DayPickerInput';

const getMillisInXMins = (x: number): number => 1000*60*x;  
const getTMinus1Min = new Date().getTime() - getMillisInXMins(1)
const getTPlus1Min = new Date().getTime() + getMillisInXMins(1)
const getDateAtTminus1min: Date = new Date(getTMinus1Min)
const getDateAtTplus1min: Date = new Date(getTPlus1Min)

export const newSlugTimeframeStartAtom = atom<Date>(getDateAtTminus1min)
export const newSlugTimeframeEndAtom = atom<Date>(getDateAtTplus1min)
export const newSlugTimeframeStartInMsAtom = atom<number>((get) => get(newSlugTimeframeStartAtom).getTime())
export const newSlugTimeframeEndInMsAtom = atom<number>((get) => get(newSlugTimeframeEndAtom).getTime())
export const newSlugTimeRange = atom<number>((get) =>get(newSlugTimeframeEndInMsAtom) - get(newSlugTimeframeStartInMsAtom))

export const ExpirationTabContent = () => {
    const [start, setStart] = useAtom(newSlugTimeframeStartAtom)
    const [end, setEnd] = useAtom(newSlugTimeframeEndAtom)

    return (
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$3'}}>
            <Text>{start.toLocaleDateString()}</Text> 
            <Text>{end.toLocaleDateString()}</Text> 
        </Flex>
    )
}

const StartInput = () => {

    return (
        <DayPickerInput
          overlayComponent={CustomOverlay}
          dayPickerProps={{
            todayButton: 'Today',
          }}
          keepFocus={false}
        />
    )
}

interface ICustomOverlayProps {
    classNames: string[];
    selectedDay: any;
    children: React.ReactNode | Element | any;
}

function CustomOverlay({ classNames, selectedDay, children, ...props }: ICustomOverlayProps) {
    return (
      <div
        className={classNames.overlayWrapper}
        style={{ marginLeft: -100 }}
        {...props}
      >
        <div className={classNames.overlay}>
          <h3>Hello day picker!</h3>
          <p>
            <input />
            <button onClick={() => console.log('clicked!')}>button</button>
          </p>
          <p>
            {selectedDay
              ? `You picked: ${selectedDay.toLocaleDateString()}`
              : 'Please pick a day'}
          </p>
          {children}
        </div>
      </div>
    );
  }
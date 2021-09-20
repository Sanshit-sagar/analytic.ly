import React, { useState } from 'react'

import { fromMonth, hoveredStartDateAtom } from '../../../atoms/expiration'

import { Calendar } from './Calendar'
import { useAtom } from 'jotai'

export const ExpirationTabContent = () => {
    const [to, setTo] = useState<Date | undefined | null>(null)
    const [from, setFrom] = useState<Date | undefined | null>(null)
    const [month, setMonth] = useState<Date | undefined | null>(fromMonth)
    const [enteredTo, setEnteredTo] = useState<Date | undefined | null>(null)
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)

    const handleToChange = (updatedTo: Date) => setTo(updatedTo)
    const handleFromChange = (updatedFrom: Date) => setFrom(updatedFrom)

    const handleEnteredToChange = (updatedEnteredTo: Date) => setEnteredTo(updatedEnteredTo)
    const handleHoveredStartDateChange = (updatedStartDate: Date) => setHoveredStartDate(updatedStartDate)
    const handleYearMonthChange = (updatedMonth: Date) => setMonth(updatedMonth) 

    return (
        <Calendar
            to={to}
            from={from}
            month={month}
            enteredTo={enteredTo}
            hoveredStartDate={hoveredStartDate}
            handleYearMonthChange={handleYearMonthChange}
            handleHoveredStartDateChange={handleHoveredStartDateChange}
            handleEnteredToChange={handleEnteredToChange}
            handleToChange={handleToChange}
            handleFromChange={handleFromChange}
        />
    )
}


import React, { useState } from 'react'

import { fromMonth, hoveredStartDateAtom } from '../../../atoms/expiration'

import { Calendar } from './Calendar'
import { useAtom } from 'jotai'

export const ExpirationTabContent = () => {
    const [to, setTo] = useState<Date | undefined | null>(null)
    const [from, setFrom] = useState<Date | undefined | null>(null)
    const [month, setMonth] = useState<Date | undefined | null>(fromMonth)
    const [enteredTo, setEnteredTo] = useState<Date | undefined | null>(null)
    const [hoveredStartDate, setHoveredStartDate] = useAtom<Date | undefined>(hoveredStartDateAtom)

    const handleToChange = (updatedTo: Date) => setTo(updatedTo)
    const handleFromChange = (updatedFrom: Date) => setFrom(updatedFrom)

    const handleEnteredToChange = (updatedEnteredTo) => setEnteredTo(updatedEnteredTo)
    const handleHoveredStartDateChange = (updatedStartDate) => setHoveredStartDate(updatedStartDate)
    const handleYearMonthChange = (updatedMonth) => setMonth(updatedMonth) 

    return (
        <Calendar
            month={month}
            from={from}
            to={to}
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


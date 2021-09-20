import React, { useState } from 'react'

import { fromMonth, hoveredStartDateAtom } from '../../../atoms/expiration'

import { Calendar } from './Calendar'
import { useAtom } from 'jotai'

export const ExpirationTabContent = () => {
    const [to, setTo] = useState<Date | undefined | null>(null)
    const [from, setFrom] = useState<Date | undefined | null>(null)
    const [month, setMonth] = useState(fromMonth)
    const [enteredTo, setEnteredTo] = useState(null)
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)

    const handleToChange = (updatedTo) => setTo(updatedTo)
    const handleFromChange = (updatedFrom) => setFrom(updatedFrom)

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


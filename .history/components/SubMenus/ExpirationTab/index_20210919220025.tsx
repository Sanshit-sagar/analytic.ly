import React, { useState } from 'react'

import { Calendar } from './Calendar'
import { useAtom } from 'jotai'

export const ExpirationTabContent = () => {
    const [month, setMonth] = useState(fromMonth)
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [enteredTo, setEnteredTo] = useState(null)
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)

    const handleToChange = (updatedTo) => setTo(updatedTo)
    const handleFromChange = (updatedFrom) => setFrom(updatedFrom)

    const handleEnteredToChange = (updatedEnteredTo) => setEnteredTo(updatedEnteredTo)
    const handleHoveredStartDateChange = (updatedStartDate) => setStartDate(updatedStartDate)
    const handleYearMonthChange = (updatedMonth) => setMonth(updatedMonth) 

    return (
        <Calendar
            month={month}
            from={from}
            to={to}
            enteredTo={enteredTo}
            hoveredStartDate={hoveredStartDate}
            updateMonth={()}
    )
}


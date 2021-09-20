import React, { useState } from 'react'

import { Calendar } from './Calendar'
import { useAtom } from 'jotai'

export const ExpirationTabContent = () => {
    const [month, setMonth] = useState(fromMonth)
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [enteredTo, setEnteredTo] = useState(null)
    const [hoveredStartDate, setHoveredStartDate] = useAtom(hoveredStartDateAtom)

    const 
    const handleYearMonthChange = (updatedMonth) => setMonth(updatedMonth) 

    return (
        <Calendar
            month={month}
            updateMonth={()}
    )
}


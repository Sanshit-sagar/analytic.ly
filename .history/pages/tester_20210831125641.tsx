import React from 'react'
import { Text } from '../primitives/Text'
import StatisticsFallback from '../components/Skeletons/Statistics'

const Tester = () => {

    return (
        <div style={{ border: 'thin solid black', borderRadius: '5px', margin: '10px'}}>
            <Text size='5' as='h1'> yyoyoy </Text>
            <StatisticsFallback /> 
        </div>
    )
}

export default Tester 
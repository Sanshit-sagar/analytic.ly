import React from "react"


const ExirationTab = () => {

    return (
        <StyledExpirationTab>
        <Flex css={{ height: '100%', width: '100%', fd: 'row', jc: 'space-around', ai: 'center', gap: '$4' }}>
            <FmtDate date={new Date(hoveredStartDate)} fallback={new Date(from)}/> 
            <FmtDate date={new Date(enteredTo)} fallback={new Date(to)} /> 
        </Flex>
        
        </StyledExpirationTab>
    )
}
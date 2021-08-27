import React from 'react';

import { useAtom } from 'jotai'

import { Box } from '../../primitives/Box'

interface NumberInputProps {
    inputAtom: any;
    inputNumberAtom: any; 
}

const NumberInput = ({ inputAtom, inputNumberAtom }: NumberInputProps) => {
    const [input, setInput] = useAtom(inputAtom); 
    const [inputNumber] = useAtom(inputNumberAtom);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(event.currentTarget.value); 
    }

    return (
        <Box css={{ width: '100%' }}>
            <Flex css={{ width: '100%', fd: 'column', jc: 'space-between', ai: 'stretch', gap: '$1' }}>
                <Text size='1'> Amount: {`${inputNumber}`} </Text>
                <input 
                    id='amount'
                    type='number'
                    value={input || 0}
                    onChange={handleInputChange}
                />
            </Flex>
        </Box>
    )
} 

export default NumberInput
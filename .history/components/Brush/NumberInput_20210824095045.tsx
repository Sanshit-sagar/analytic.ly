import SelectMenu from './Select'

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
        <>
            <label> Amount: {`${inputNumber}`} </label>
            <input 
                id='amount'
                type='number'
                value={input || 0}
                onChange={handleInputChange}
            />
        </>
    )
} 

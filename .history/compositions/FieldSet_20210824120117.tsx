import { atom, useAtom } from 'jotai'
import { Text } from '../../primitives/Text'
import { Input, Label, Fieldset } from '../primitives/TextInput'

const inputAtom = atom('')
const inputAtomLen = atom((get) => get(inputAtom).length) 

const FieldSet = ({ label }) => {
    const [input, setInput] = useAtom(inputAtom)
    const [inputLen] = useAtom(inputAtomLen)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }

    return (

        <Fieldset>
            <Label 
                htmlFor={`htmlFor-${label}`} 
                css={{ marginRight: 15 }}
            >
              <Text size='1'>{label}: {inputLen} </Text>
            </Label>
             <Input 
                type="text" 
                id="inputValue" 
                value={input}
                onChange={handleInputChange}
            />
        </Fieldset>
    )
}

export default FieldSet 

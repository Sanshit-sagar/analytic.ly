import { atom, useAtom } from 'jotai'
import { Text } from '../primitives/Text'
import { Input, Label, Fieldset } from '../primitives/TextInput'

const inputAtom = atom('')
const inputAtomLen = atom((get) => get(inputAtom).length) 

interface FieldSetProps {
    label: string;
}

const FieldSet = ({ label }: FieldSetProps) => {
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
              <Text size='1'>{label} </Text>
            </Label>
             <Input 
                type="number" 
                id="inputValue" 
                value={input}
                onChange={handleInputChange}
            />
        </Fieldset>
    )
}

const FieldSetWithLength = ({ label }: FieldSetProps)

export default FieldSet 

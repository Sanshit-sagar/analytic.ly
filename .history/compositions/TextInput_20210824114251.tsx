import { atom, useAtom } from 'jotai'
import { Input, Label, Fieldset } from '../primitives/TextInput'

const inputAtom = atom('')

export const FieldSet = ({ label, inputValue }) => {
    const [input, setInput] = useAtom(inputValueAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }

    return (
        <Fieldset>
            <Label 
                htmlFor="inputLabel" 
                css={{ lineHeight: '35px', marginRight: 15 }}
            >
              {label}
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

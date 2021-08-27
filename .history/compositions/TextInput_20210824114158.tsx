import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Input, Label, Fieldset } from '../primitives/TextInput'


const FieldSet = ({ label, inputValueAtom }) => {
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

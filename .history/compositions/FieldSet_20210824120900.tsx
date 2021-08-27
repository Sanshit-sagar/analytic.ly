import { atom, useAtom } from 'jotai'
import { Text } from '../primitives/Text'
import { Input, Label, Fieldset } from '../primitives/TextInput'

const inputAtom = atom('')
const inputAtomLen = atom((get) => get(inputAtom).length) 

interface FieldSetProps {
    label: string;
}

export const FieldSet = ({ label }: FieldSetProps) => {
    const [input, setInput] = useAtom(inputAtom)

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

export const FieldSetWithLength = ({ label }: FieldSetProps) => {
    const [inputLen] = useAtom(inputAtomLen)

    return (
        <Box css={{ }}> 
        <Flex css={{ fd: 'row', jc: 'flex-start', ai: 'stretch' }}> 
            <FieldSet label={label} /> 
            <Text> {inputLen} </Text> 
        </Flex>
        </Box>
    )
}


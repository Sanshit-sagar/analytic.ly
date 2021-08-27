import { atom, useAtom } from 'jotai'

import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'
import { 
    Input, 
    Label, 
    Fieldset as FieldsetPrimitive 
} from '../primitives/TextInput'

const inputAtom = atom('')
const inputAtomLen = atom((get) => get(inputAtom).length) 

type InputType = 'number' | 'text'

interface FieldSetProps {
    label: string;
    inputType: InputType;
}

export const FieldSet = ({ label, inputType = 'text', inputAtom }: FieldSetProps) => {
    const [input, setInput] = useAtom(inputAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
    }

    return (
        <FieldsetPrimitive>
            <Label 
                htmlFor={`htmlFor-${label}`} 
                css={{ marginRight: 15 }}
            >
              <Text size='1'>{label} </Text>
            </Label>
             <Input 
                type={inputType}
                id="inputValue" 
                value={input}
                onChange={handleInputChange}
            />
        </FieldsetPrimitive>
    )
}

export const FieldSetWithLength = ({ label, inputType }: FieldSetProps) => {
    const [inputLen] = useAtom(inputAtomLen)

    return (
        <Flex css={{ height: '100%', fd: 'row', jc: 'flex-start', ai: 'center' }}> 
            <FieldSet 
                inputType={inputType}
                label={label} 
            /> 
            <Text> {inputLen} </Text> 
        </Flex>
    )
}


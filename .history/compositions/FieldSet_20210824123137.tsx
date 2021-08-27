import { atom, useAtom } from 'jotai'

import { Text } from '../primitives/Text'
import { 
    Input, 
    Label, 
    FieldSet as FieldsetPrimitive 
} from '../primitives/FieldSet'

type InputType = 'number' | 'text'

interface FieldSetProps {
    label: string;
    inputType: InputType;
    inputAtom: any; 
}

export const FieldSet = ({ label, inputType, inputAtom }: FieldSetProps) => {
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

{/* export const FieldSetWithLength = ({ label, inputType = 'text', inputAtom }: FieldSetProps) => {
    const [inputLen] = useAtom(getInputAtomLen(inputAtom))

    return (
        <Flex css={{ height: '100%', fd: 'row', jc: 'flex-start', ai: 'center' }}> 
            <FieldSet 
                inputType={inputType}
                label={label} 
                inputAtom={inputAtom} 
            /> 
            <Text> {inputLen} </Text> 
        </Flex>
    )
} */}


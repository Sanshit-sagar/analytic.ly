import { useAtom } from 'jotai'

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
        if(`${event.currentTarget.value===) {
            setInput(1)
    }

    return (
        <FieldsetPrimitive>
             <Input 
                type={inputType}
                id="inputValue" 
                value={input}
                onChange={handleInputChange}
            />
        </FieldsetPrimitive>
    )
}















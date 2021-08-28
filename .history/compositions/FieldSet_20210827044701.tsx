import { useAtom } from 'jotai'

import { 
    Input, 
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
        if(`${event.currentTarget.value}`==='0') {
            setInput(1);
        } else {
            setInput(event.currentTarget.value);
        }
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















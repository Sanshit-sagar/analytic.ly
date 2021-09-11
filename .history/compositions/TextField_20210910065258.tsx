import React from 'react'
import { useKeyboard } from '@react-aria/interactions'

import { 
    CentralControlGroup as ControlGroup, 
    Label
} from '../primitives/FieldSet'
import { TextField } from '../primitives/TextField'
import { Text } from '../primitives/Text'
import { Flex } from '../primitives/Flex'

import { 
    InfoCircledIcon,
    CheckCircledIcon,
    CrossCircledIcon,
    GearIcon
} from '@radix-ui/react-icons'

import { Atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

interface IValidationProps {
    isDestinationInputValidAtom: Atom<boolean>
}

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

const ValidationIcon = ({ isDestinationInputValidAtom }: IValidationProps) => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)
    return isDestValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}


const Validator = ({ isDestinationInputValidAtom }: IValidationProps) => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)

    const validationColor = isDestValid ? 'green' : 'red'
    const validationResult = isDestValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>  
                <ValidationIcon isDestinationInputValidAtom={isDestinationInputValidAtom} />
                <> {validationResult} </>
            </Flex>
        </Text>
    );
}

interface ITextFieldProps {
    label: string; 
    value: string; 
    onChange: (updatedText: string) => void; 
}

export const TextField = ({ label, value, onChange  }: ITextFieldProps) => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <ControlGroup>
            <Label css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$1' }}> 
                <> Destination URL </>
                <InfoCircledIcon />
            </Label>
            <TextField 
                size='1' 
                type='url'
                value={destinationInput} 
                onChange={handleInputChange} 
                placeholder='www.example.com'
                css={{
                    backgroundColor: '$accentDulled',
                    border: 'thin solid $border',
                    padding: '$2',
                    mt: '$2',
                    '&:hover': {
                        borderColor: '$neutral'
                    }
                }}
            /> 
            <Validator 
                isDestinationInputValidAtom={isDestinationInputValidAtom}
            />
        </ControlGroup>
    );
}


// const IsTypingDisplay = () => {
    // const [isTyping, setIsTyping]  = useAtom(isTypingDestinationAtom)
//  
    // const [lastTypedAt, setLastTypedAt] = useState<number | undefined>(new Date(1970,1,1).getTime());
    // let {keyboardProps} = useKeyboard({
        // onKeyDown: (e: KeyboardEvent) => {
            // setLastTypedAt(new Date().getTime())
            // setIsTyping(true)
        // },
        // onKeyUp: (e: KeyboardEvent) => {
            // setLastTypedAt(new Date().getTime())
        // }
    // });
    // useEffect(() => {
        // if(isTyping && lastTypedAt - new Date().getTime() > 1000) {
            // setIsTyping(false); 
        // }
    // }, [lastTypedAt]);
    // 
    // const isTyping = useAtomValue(isTypingDestinationAtom)

    // return <Text css={{ marginLeft: 'auto' }}>{isTyping ? '...' : '' }</Text> 
// }



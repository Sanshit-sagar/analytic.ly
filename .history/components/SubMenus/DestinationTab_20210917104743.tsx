import React from 'react'

import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { TextField } from '../../primitives/TextField'
import { CentralControlGroup, Label } from '../../primitives/FieldSet' 

import { useAtom, atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { 
    CheckCircledIcon, 
    CrossCircledIcon, 
    InfoCircledIcon 
} from '@radix-ui/react-icons'

import { OpenGraphResults } from './DestinationTab/OpenGraph'
import { 
    isDestinationInputValidAtom, 
    destinationInputAtom, 
    destinatioParamsAtom 
} from '../../atoms/destination'

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

const ValidationIcon = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)
    return isDestValid ? <CheckCircledIcon /> : <CrossCircledIcon /> 
}

const Validator = () => {
    const isDestValid = useAtomValue(isDestinationInputValidAtom)

    const validationColor = isDestValid ? 'green' : 'red'
    const validationResult = isDestValid ? VALID_RESULT : INVALID_RESULT

    return (
        <Text css={{ color: validationColor, mt: '$1', mb: '$1' }}>
            <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'center', gap: '$2' }}>  
                <ValidationIcon />
                <> {validationResult} </>
            </Flex>
        </Text>
    );
}

const UrlParamKey = ({ value }: { value: string }) => {

    return (
        <Text 
            css={{ 
                width: '100px', 
                textDecoration: 'underline', 
                textDecorationColor: '$accent',
                color: '$accent'
            }}
        > 
            {value}: 
        </Text>
    )
}

const UrlBreakdown = () => {
    const destinationParameters: { [key: string]: string }} = useAtomValue(destinatioParamsAtom)

    let keys = destinationParameters ? Object.keys(destinationParameters) : []
    if(!keys?.length || !destinationParameters) return null;
    
    return (
        <Box 
            css={{ 
                height: '100%', 
                width: '350px',
                padding: '$1',
                pt: '$3', 
                margin: '$1', 
                bc: 'transparent', 
                border: '1px solid $border', 
                '&:hover': {
                    borderColor: '$border3' 
                }
            }}
        >
            {destinationParameters && keys.map((key: string, idx: number) => {
                if(destinationParameters===null || !destinationParameters[key]) return null;

                if(key==='search') {
                    let searchParamEntries: string[] = destinationParameters['search'].substring(1).split('&')
                    if(!searchParamEntries?.length) return <Text> '-' </Text>

                    return (
                        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2',  mt: '$1'}}>
                            <UrlParamKey value={'Search Params'} />
                            <Flex css={{ fd: 'column', jc: 'space-between', ai: 'flex-start', margin: '$1', ml: '$3' }}> 
                                {searchParamEntries.map((entry: string, i: number) => (
                                    <Text key={i} css={{ color: '$text'}}> 
                                        {JSON.stringify(entry)} 
                                    </Text>
                                ))}
                            </Flex>
                        </Flex>
                    );
                }

                return (
                <Flex key={idx} css={{ width: '300px', fd: 'row', jc: 'space-between', ai: 'flex-start', gap: '$2', mt: '$1' }}>
                        <UrlParamKey value={key} />
                        <Text css={{ width: '100%', float: 'right', color: '$accent' }}> 
                            {destinationParameters[key]} 
                        </Text>
                    </Flex>
                );
            })}
        </Box>
    );
}

export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <>
        <CentralControlGroup>
            <Label> 
                <Text css={{ color: '$text', fd: 'row', jc: 'flex-start', ai: 'center', gap: '$3' }}>
                    <> Destination URL </>
                    <InfoCircledIcon />
                </Text>
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
            <Validator />
        </CentralControlGroup>
        <OpenGraphResults />
         {/* <UrlBreakdown /> */}
        </>
    );
}




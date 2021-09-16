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

 
export const destinationInputAtom = atom('')
export const isTypingDestinationAtom = atom(false)
export const isDestinationInputValidAtom = atom((get) => isValidUrl(get(destinationInputAtom)))
export const destinatioParamsAtom = atom((get) => {
    try {
        const isValid = get(isDestinationInputValidAtom)
        const urlStr = get(destinationInputAtom)

        if(urlStr && isValid) {
            let urlObj = new URL(urlStr);
            return {
                hostname: urlObj.host,
                hash: urlObj.hash,
                origin: urlObj.origin,
                password: urlObj.password,
                protocol: urlObj.protocol,
                port: urlObj.port,
                search: urlObj.search,
                username: urlObj.username,
                pathname: urlObj.pathname
            };
        }
        return null
    } catch(error) {
        return null; 
    }
});

const VALID_RESULT = 'Sweet, that works!'
const INVALID_RESULT = 'Hmm, not quite right just yet'

// TODO: autoinsert https://
// TODO: trim whitespaces 
// function isValidURL(unverifiedInput: string) {
    // const VALID_PROTOCOL = unverifiedInput.startsWith('http') || unverifiedInput.startsWith('https')
    // const VALID_DOMAIN = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
    // const VALID_IP = RegExp('^((\\d{1,3}\\.){3}\\d{1,3})$')
    // const VALID_PORT = RegExp('(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*')
    // const VALID_QUERY = RegExp('(\\?[;&a-z\\d%_.~+=-]*)?')
    // const VALID_FRAGMENT = RegExp('(\\#[-a-z\\d_]*)?$','i')

    // let isProtocolValid = VALID_DOMAIN.test(unverifiedInput)
    // let isDomainValid = !!VALID_DOMAIN.test(unverifiedInput)
    // let isIpValid = !!VALID_IP.test(unverifiedInput)
    // let isPortValid = !!VALID_PORT.test(unverifiedInput) 
    // let isQueryValid = !!VALID_QUERY.test(unverifiedInput)
    // let isFragmentValid = !!VALID_FRAGMENT.test(unverifiedInput)

    // return isProtocolValid 
    // && isDomainValid && isIpValid && isPortValid  && isQueryValid && isFragmentValid
// }

function isValidUrl(unverifiedInput: string) {
    var VALID_URL_REGEX = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return VALID_URL_REGEX.test(unverifiedInput)
}

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
    const destinationParameters = useAtomValue(destinatioParamsAtom)

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




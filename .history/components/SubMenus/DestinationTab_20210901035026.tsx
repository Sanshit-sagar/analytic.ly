import React from 'react'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Separator } from '../../primitives/Separator'
import { UrlFieldSet, Label  } from '../../primitives/FieldSet' 
import { TextField } from '../../primitives/TextField'

import useSWR from 'swr'
import { fetcher } from '../../lib/utils/fetcher'
import { useAtom, atom } from 'jotai'

interface IOpenGraphPreviewProps {
    destinationInput: string; 
    isDestValid: boolean; 
}


const VALID_URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const destinationInputAtom = atom('')
const isDestinationInputValidAtom = atom((get) => isValidURL(get(destinationInputAtom)))


function isValidURL(urlInput: string) {
    var res = urlInput.match(VALID_URL_REGEX);
    return (res !== null);
}
 
const OpenGraphSummary = ({ destinationInput, isDestValid }: IOpenGraphPreviewProps) => {
    const { metadata, loading, error } = useOpenGraph(isDestValid, destinationInput)
 
    if(loading) return <Text>loading...</Text> 
    if(error) return <Text>Error: {error.message} </Text> 
    if(!metadata) return <Text> No data to show</Text>
 
    return <Text> {JSON.stringify(metadata)} </Text>
}

const OpenGraphPreview = ({ destinationInput, isDestValidd }: IOpenGraphPreviewProps) => {

    return (
        <OpengraphReactComponent  
          site={'site that you want to load (url encoding is done for you)'}  
          appId={Your opengraph.io api key goes here}  
          loader={A component to display while results are being fetched}  
          size={'small'}    
        />
    )
}

export const DestinationTabContent = () => {
    const [destinationInput, setDestinationInput] = useAtom(destinationInputAtom)
    const [isDestValid] = useAtom(isDestinationInputValidAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(event.currentTarget.value);
    }

    return (
        <Flex css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1'}}>
            <Text size='2'>
                Paste or Type the URL that you'd like to slugify   
            </Text>
            <Separator css={{ color: '$accent', bc: '$accentContrast', width: '100%'}} /> 
            <UrlFieldSet css={{ width: '100%', fd: 'column', jc: 'flex-start', ai: 'stretch'}}>
                <Label> 
                    Destination URL -- VALIDITY: {isDestValid.toString()} 
                </Label>
                <TextField 
                    size='1' 
                    type='url'
                    value={destinationInput} 
                    onChange={handleInputChange} 
                    placeholder='www.example.com'
                    css={{ width: '100%' }}
                />
                <OpenGraphSummary
                    destinationInput={destinationInput} 
                    isDestValid={isDestValid}
                />
            </UrlFieldSet>
        </Flex>
    );
}




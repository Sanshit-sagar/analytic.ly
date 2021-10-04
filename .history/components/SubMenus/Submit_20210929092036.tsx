import { useAtomValue } from 'jotai/utils'

import { Text } from '../../primitives/Text'
import { Flex } from '../../primitives/Flex'
import { Alert } from '../../compositions/Alert'

import toast from 'react-hot-toast'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

import { 
    FullUrl, 
    suggestion,
    password,
    expiration,
    destination,
    publish,
    ApiResponse,
    fullUrlAtom
} from './data'


interface ISubmissionField {
    id: string;
    value: string; 
    name: string; 
}

export const Submit = () => {
    const fullUrl = useAtomValue(fullUrlAtom)
   

    const submissionFields: ISubmissionField[] = [
        { id: 'fullUrl', value: fullUrl, name: 'Encoded URL' },
        { id: 'suggestion', value: suggestion(), name: 'Suggested Slug' },
        { id: 'password', value: password(), name: 'Password' },
        { id: 'expiration', value: expiration(), name: 'Expiration' },
        { id: 'destination', value: destination(), name: 'Destination' }
    ];

    function handleConfirm() {
        const doPublish: Promise<ApiResponse> = publish({
            url: submissionFields[0].value, 
            slug: submissionFields[1].value, 
            password: submissionFields[2].value, 
            expiration: submissionFields[3].value, 
            destination: submissionFields[4].value
        })

        toast.promise(doPublish, { 
            loading: 'Doing the deed...',
            success: ({ data }) => `Successfully saved configuration for the slug ${data?.name ?? ''}`,
            error: ({ error }) => `Encountered an error. ${error?.message ?? ''} Try Again?`
        })
    }

    function handleCancel() {
        toast.success('Canceling...')
    }
   
    return (
        <Alert
            trigger={<PaperPlaneIcon /> }
            title={'Submit'}
            description={''}
            content={
                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$1' }}>
                    <FullUrl size='small' />
                    {submissionFields.map((field: ISubmissionField, i: number) => (
                        <Text 
                            key={`field-no-${i}`} 
                            size='2'
                            css={{ maxWidth: 200 }}
                        > 
                            <Text css={{ fontWeight: 500, textDecoration: 'underline', textDecorationColor: '$funky' }}>
                                {field.name}
                            </Text> 
                            {field.value.split('&').map((fieldValue: string, idx: number) => {
                                let pair = fieldValue.split('=')
                                return (
                                    <Flex key={idx} css={{ fd: 'row', jc: 'flex-start'}}> 
                                        <Text> {pair[0]} </Text> 
                                        <Text> :{pair[1]} </Text> 
                                    </Flex>
                                ); 
                            })}
                        </Text>
                    ))}
                </Flex>
            }
            confirmText={'Save'}
            cancelText={'Back'}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
        />
    )
}
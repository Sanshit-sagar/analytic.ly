import React from 'react'
// import { useAtomValue } from 'jotai/utils'

import { Dialog } from '../../Dialog'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

import { InputUrlWithInputUtmTags } from './Summary'

export const MainMenuDialog = () => {

    return (
        <Flex css={{  display: 'flex', fd: 'column', jc: 'flex-end', ai: 'flex-end' }}>
            <Dialog>
                <Text size='2'> Summary </Text>
            </Dialog>
        </Flex>
    )
}
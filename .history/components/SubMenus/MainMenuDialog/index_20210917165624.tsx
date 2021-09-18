import React from 'react'
// import { useAtomValue } from 'jotai/utils'

import { Dialog } from '../../Dialog'
import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'

export const MainMenuDialog = () => {

    return (
        <Flex css={{ height: '100%', width: '100%', display: 'flex', fd: 'column', jc: 'flex-end', ai: 'flex-end' }}>
            <Dialog>
                <Text size='2'> Summary </Text>
            </Dialog>
        </Flex>
    )
}
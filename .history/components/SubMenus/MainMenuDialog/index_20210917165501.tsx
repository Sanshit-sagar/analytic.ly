import React from 'react'
// import { useAtomValue } from 'jotai/utils'

import { Dialog } from '../../Dialog'
import { InputUrlWithInputUtmTags } from './Summary'
import { Text } from '../../../primitives/Text'

export const MainMenuDialog = () => {

    return (
        <Flex css={{ height: '100%', width: '100%',}}
        <Dialog>
            <Text size='2'> HELLO </Text>
        </Dialog>
    )
}
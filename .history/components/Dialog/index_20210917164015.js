import React from 'react' 

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from '../../primitives/Dialog'
import { Separator } from '../../primitives/Separator'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'

export const CustomDialog = ({
    dialogTrigger,
    dialogHeading,

}) => {

    return (
        <Dialog>
            <DialogTrigger as={Button}>
                Dialog
            </DialogTrigger>

            <DialogContent>
                <Text size="5" as="h6" css={{ fontWeight: 500, mb: '$3' }}>
                  Dialog Heading
                </Text>
                <Text size="3" as="p" css={{ lineHeight: '25px' }}>
                   There are 5 variants to choose from. Use is for positive states
                </Text>

                <Separator size='2' /> 

                <Dialog
                {dialogContent}

                <PopoverClose as={Button} ghost>
                    Close
                </PopoverClose>
            </DialogContent>
        </Dialog>
    );
}
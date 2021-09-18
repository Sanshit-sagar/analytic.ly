import React, { ReactNode } from 'react' 

import {
    Dialog as DialogRoot,
    DialogContent,
    DialogTrigger,
    DialogBody,
} from '../../primitives/Dialog'
import { Separator } from '../../primitives/Separator'
import { Button } from '../../primitives/Button'
import { Text } from '../../primitives/Text'

interface IDialogProps {
    dialogTrigger: ReactNode | Element | string;
    dialogHeading: ReactNode | Element | string;
    dialogContent: ReactNode;
}

export const Dialog = () => {

    return (
        <DialogRoot>
            <DialogTrigger as={Button}>
               <Text css={{ color: '$funky'}}> HELLLLO </Text> 
            </DialogTrigger>

            <DialogContent>
                <Text size="5" as="h6" css={{ fontWeight: 500, mb: '$3' }}>
                  Dialog Heading
                </Text>
                <Text size="3" as="p" css={{ lineHeight: '25px' }}>
                   There are 5 variants to choose from. Use is for positive states
                </Text>

                <Separator size='2' /> 

                <DialogBody>
                    <Text> yayayaya dialog body here </Text> 
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
}
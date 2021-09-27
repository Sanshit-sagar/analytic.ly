import React, { ReactNode } from 'react' 

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogActions,
    DialogClose,
    DialogTriggerButton
} from '../../primitives/Dialog'

import { Separator } from '../../primitives/Separator'
import { Heading } from '../../primitives/Heading'
import { Text } from '../../primitives/Text'


interface IDialogProps {
    dialogTrigger: ReactNode | Element | string;
    dialogHeading: ReactNode | Element | string;
    dialogContent: ReactNode;
}

export const Dialog = () => {

    return (
        <Dialog>
            <Flex css={{ zIndex: 10 }}>
                <DialogTrigger>
                    Open Dialog
                </DialogTrigger>
            </Flex>

            <DialogContent>
                <DialogTitle> HEADING </DialogTitle> 
                <DialogDescription> 
                    DESCRIPTION 
                </DialogDescription>

                <Text> CONTENT </Text>

                <DialogActions> 
                    <DialogClose>
                        <DialogTriggerButton> 
                            Save 
                        </DialogTriggerButton>
                    </DialogClose>
                </DialogActions> 

            </DialogContent>
        </Dialog>
    );
}
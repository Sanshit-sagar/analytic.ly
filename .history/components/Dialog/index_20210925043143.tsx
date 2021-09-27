import React, { ReactNode } from 'react' 

import {
    Dialog as DialogRoot,
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
                <DialogTitle> Input Summary </DialogTitle> 
                <DialogDescription> 
                    Create a new link with these details? 
                </DialogDescription>

                <ScrollArea> <InputSummary /> </ScrollArea>

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
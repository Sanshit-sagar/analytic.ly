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
import { Flex } from '../../primitives/Flex'

interface IDialogProps {
    dialogTrigger: ReactNode | Element | string;
    dialogHeading: ReactNode | Element | string;
    dialogContent: ReactNode;
}

export const ModalDialog = () => {

    return (
        <Dialog>
            <Flex css={{ zIndex: 10 }}>
                <DialogTrigger>
                    Open Dialog
                </DialogTrigger>
            </Flex>

            <DialogContent>
                <DialogTitle> 
                    <Heading size='1'>
                        HEADING
                    </Heading>
                </DialogTitle> 
                
                <Separator orientation={'horizontal'} /> 
                
                <DialogDescription> 
                    DESCRIPTION 
                </DialogDescription>

                <Text> CONTENT </Text>

                <DialogActions> 
                    <DialogClose>
                        CLOSE
                    </DialogClose>
                </DialogActions> 
            </DialogContent>
        </Dialog>
    );
}
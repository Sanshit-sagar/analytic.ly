import React from 'react';

import {
    AlertDialog as AlertDialogRoot,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogButton
} from '../primitives/AlertDialog'
import { Flex } from '../primitives/Flex'

export const AlertDialog = () => (
    <AlertDialogRoot>
        <AlertDialogTrigger asChild>
            <AlertDialogButton>
                Delete account
            </AlertDialogButton>
        </AlertDialogTrigger>

        <AlertDialogContent >
            <AlertDialogTitle>
                Are you absolutely sure?
            </AlertDialogTitle>

            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data
                from our servers.
            </AlertDialogDescription>

            <Flex css={{ jc: 'flex-end' }}>
                <AlertDialogCancel asChild>
                    <AlertDialogButton 
                        variant="accent" 
                        css={{ marginRight: 25 }}
                    >
                      Cancel
                    </AlertDialogButton>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                    <AlertDialogButton variant="accent">
                        Yes, delete account
                    </AlertDialogButton>
                </AlertDialogAction>
            </Flex>
        </AlertDialogContent>
    </AlertDialogRoot>
)
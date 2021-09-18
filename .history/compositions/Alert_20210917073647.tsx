import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA, red, mauve } from '@radix-ui/colors';

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
} from '../primitives/AlertDialog'
import { Flex } from '../primitives/Flex'
import { Button } from '../primitives/Button'

const AlertDialogDemo = () => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button>
                Delete account
            </Button>
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
                    <Button 
                        variant="accent" 
                        css={{ marginRight: 25 }}
                    >
                      Cancel
                    </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button variant="accent">
                        Yes, delete account
                    </Button>
                </AlertDialogAction>
            </Flex>
        </AlertDialogContent>
    </AlertDialog>
);

export default AlertDialogDemo;
